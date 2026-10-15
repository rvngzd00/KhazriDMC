import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export type LeadType = 'partner' | 'contact';
export type LeadRecord = { id: string; type: LeadType; payload: string; created_at: string; notification_status: string; notification_attempts: number; last_notification_error: string | null; notified_at: string | null };

export function openDatabase(databasePath: string) {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new Database(databasePath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL CHECK(type IN ('partner','contact')),
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL,
      notification_status TEXT NOT NULL DEFAULT 'pending' CHECK(notification_status IN ('pending','sent','failed','not_configured')),
      notification_attempts INTEGER NOT NULL DEFAULT 0,
      last_notification_error TEXT,
      notified_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_leads_notification ON leads(notification_status, notification_attempts);
  `);
  return db;
}

export function insertLead(db: Database.Database, type: LeadType, data: Record<string, unknown>, notificationsConfigured: boolean) {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(`INSERT INTO leads (id,type,payload,created_at,notification_status) VALUES (?,?,?,?,?)`)
    .run(id, type, JSON.stringify(data), createdAt, notificationsConfigured ? 'pending' : 'not_configured');
  return { id, createdAt };
}

export function pendingLeads(db: Database.Database): LeadRecord[] {
  return db.prepare(`SELECT * FROM leads WHERE notification_status IN ('pending','failed') AND notification_attempts < 6 ORDER BY created_at ASC LIMIT 20`).all() as LeadRecord[];
}

export function markNotification(db: Database.Database, id: string, success: boolean, error?: string) {
  if (success) db.prepare(`UPDATE leads SET notification_status='sent', notification_attempts=notification_attempts+1, last_notification_error=NULL, notified_at=? WHERE id=?`).run(new Date().toISOString(), id);
  else db.prepare(`UPDATE leads SET notification_status='failed', notification_attempts=notification_attempts+1, last_notification_error=? WHERE id=?`).run((error || 'Delivery failed').slice(0, 300), id);
}

export function purgeExpiredLeads(db: Database.Database, retentionDays: number) {
  if (!Number.isFinite(retentionDays) || retentionDays < 1) return 0;
  const cutoff = new Date(Date.now() - retentionDays * 86_400_000).toISOString();
  return db.prepare('DELETE FROM leads WHERE created_at < ?').run(cutoff).changes;
}
