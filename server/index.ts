import { config } from './config.js';
import { createApp } from './app.js';
import { processNotifications } from './notifications.js';
import { purgeExpiredLeads } from './db/database.js';

const { app, db } = createApp();
const server = app.listen(config.port, () => {
  console.log(JSON.stringify({ level: 'info', event: 'server_started', port: config.port, environment: config.nodeEnv }));
  const purged = purgeExpiredLeads(db, config.retentionDays);
  if (purged) console.log(JSON.stringify({ level: 'info', event: 'expired_leads_purged', count: purged }));
  void processNotifications(db);
});
const retryTimer = setInterval(() => void processNotifications(db), Math.max(1, config.notificationRetryMinutes) * 60_000);
retryTimer.unref();
const retentionTimer = setInterval(() => {
  const purged = purgeExpiredLeads(db, config.retentionDays);
  if (purged) console.log(JSON.stringify({ level: 'info', event: 'expired_leads_purged', count: purged }));
}, 86_400_000);
retentionTimer.unref();

function shutdown(signal: string) {
  console.log(JSON.stringify({ level: 'info', event: 'shutdown_started', signal }));
  clearInterval(retryTimer);
  clearInterval(retentionTimer);
  server.close(() => { db.close(); process.exit(0); });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
