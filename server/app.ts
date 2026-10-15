import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import type Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { config, smtpConfigured } from './config.js';
import { insertLead, openDatabase, type LeadType } from './db/database.js';
import { processNotifications } from './notifications.js';
import { contactSchema, issueMap, partnerSchema } from './validation.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp(options: { databasePath?: string } = {}) {
  const app = express();
  const db: Database.Database = openDatabase(options.databasePath || config.databasePath);
  app.set('trust proxy', config.trustProxy);
  app.disable('x-powered-by');
  app.use(helmet({
    contentSecurityPolicy: { directives: {
      defaultSrc: ["'self'"], baseUri: ["'self'"], objectSrc: ["'none'"], frameAncestors: ["'none'"],
      scriptSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'], imgSrc: ["'self'", 'data:'], connectSrc: ["'self'"], formAction: ["'self'"],
    } },
    crossOriginEmbedderPolicy: false,
  }));
  app.use(express.json({ limit: '32kb', strict: true }));

  const formLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 8, standardHeaders: 'draft-8', legacyHeaders: false, message: { message: 'Too many submissions. Please wait a little and try again.' } });
  app.get('/api/health', (_req, res) => res.json({ status: 'ok', notifications: smtpConfigured() ? 'configured' : 'not_configured' }));

  const handler = (type: LeadType) => (req: express.Request, res: express.Response) => {
    const schema = type === 'partner' ? partnerSchema : contactSchema;
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(422).json({ message: 'Please check the highlighted fields.', errors: issueMap(result.error) });
    if (result.data.website_confirm) return res.status(202).json({ message: 'Thank you. Your inquiry has been received.' });
    const { website_confirm: _discard, ...safeData } = result.data;
    try {
      const lead = insertLead(db, type, safeData, smtpConfigured());
      setImmediate(() => void processNotifications(db));
      console.log(JSON.stringify({ level: 'info', event: 'lead_saved', leadId: lead.id, type, notifications: smtpConfigured() ? 'pending' : 'not_configured' }));
      return res.status(201).json({ id: lead.id, message: 'Thank you. Your inquiry has been safely received.' });
    } catch {
      console.error(JSON.stringify({ level: 'error', event: 'lead_save_failed', type }));
      return res.status(500).json({ message: 'We could not save your inquiry. Please try again.' });
    }
  };
  app.post('/api/inquiries/partner', formLimiter, handler('partner'));
  app.post('/api/inquiries/contact', formLimiter, handler('contact'));
  app.use('/api', (_req, res) => res.status(404).json({ message: 'Not found.' }));

  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath, { maxAge: config.nodeEnv === 'production' ? '7d' : 0, index: false }));
  app.use((req, res, next) => {
    if (!['GET','HEAD'].includes(req.method) || req.path.startsWith('/api/')) return next();
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(distPath, 'index.html'));
  });
  return { app, db };
}
