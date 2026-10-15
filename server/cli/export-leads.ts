import { config } from '../config.js';
import { openDatabase } from '../db/database.js';

if (!process.env.LEAD_EXPORT_TOKEN || process.env.LEAD_EXPORT_TOKEN.length < 20) {
  console.error('Set LEAD_EXPORT_TOKEN to the configured admin secret before exporting.');
  process.exit(1);
}
const format = process.argv.includes('--json') ? 'json' : 'csv';
const db = openDatabase(config.databasePath);
const rows = db.prepare(`SELECT id,type,payload,created_at,notification_status,notification_attempts,notified_at FROM leads ORDER BY created_at DESC`).all() as Array<Record<string, unknown>>;
db.close();
const expanded = rows.map(row => ({ ...row, ...JSON.parse(String(row.payload)), payload: undefined }));
if (format === 'json') process.stdout.write(JSON.stringify(expanded, null, 2));
else {
  const keys = [...new Set(expanded.flatMap(row => Object.keys(row).filter(key => row[key] !== undefined)))];
  const escape = (value: unknown) => `"${String(value ?? '').replaceAll('"','""')}"`;
  process.stdout.write(`${keys.map(escape).join(',')}\n${expanded.map(row => keys.map(key => escape(row[key])).join(',')).join('\n')}\n`);
}
