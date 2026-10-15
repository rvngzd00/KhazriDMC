import nodemailer from 'nodemailer';
import type Database from 'better-sqlite3';
import { config, smtpConfigured } from './config.js';
import { markNotification, pendingLeads, type LeadRecord } from './db/database.js';

let processing = false;
const safeLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());

async function deliver(lead: LeadRecord) {
  const transport = nodemailer.createTransport({ host: config.smtp.host, port: config.smtp.port, secure: config.smtp.secure, auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined });
  const data = JSON.parse(lead.payload) as Record<string, unknown>;
  const text = Object.entries(data).filter(([key]) => key !== 'website_confirm' && key !== 'privacyAccepted').map(([key,value]) => `${safeLabel(key)}: ${Array.isArray(value) ? value.join(', ') : value}`).join('\n');
  await transport.sendMail({ from: config.smtp.from, to: config.smtp.to, replyTo: typeof data.email === 'string' ? data.email : undefined, subject: `[KHAZRI DMC] New ${lead.type} inquiry`, text: `Lead ID: ${lead.id}\nReceived: ${lead.created_at}\n\n${text}` });
}

export async function processNotifications(db: Database.Database) {
  if (!smtpConfigured() || processing) return;
  processing = true;
  try {
    for (const lead of pendingLeads(db)) {
      try { await deliver(lead); markNotification(db, lead.id, true); console.log(JSON.stringify({ level: 'info', event: 'notification_sent', leadId: lead.id, type: lead.type })); }
      catch (error) { markNotification(db, lead.id, false, error instanceof Error ? error.message : 'Unknown SMTP error'); console.error(JSON.stringify({ level: 'warn', event: 'notification_failed', leadId: lead.id, type: lead.type })); }
    }
  } finally { processing = false; }
}
