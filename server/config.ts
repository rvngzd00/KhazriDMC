import path from 'node:path';

const bool = (value: string | undefined, fallback = false) => value === undefined ? fallback : value === 'true';

export const config = {
  port: Number(process.env.PORT || 8787),
  nodeEnv: process.env.NODE_ENV || 'development',
  databasePath: path.resolve(process.env.DATABASE_PATH || './data/khazri-leads.sqlite'),
  publicOrigin: process.env.PUBLIC_ORIGIN || 'http://localhost:5173',
  trustProxy: Number(process.env.TRUST_PROXY || 0),
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    secure: bool(process.env.SMTP_SECURE),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '',
    to: process.env.LEADS_TO_EMAIL || '',
  },
  notificationRetryMinutes: Number(process.env.NOTIFICATION_RETRY_MINUTES || 15),
  retentionDays: Number(process.env.DATA_RETENTION_DAYS || 730),
};

export const smtpConfigured = () => Boolean(config.smtp.host && config.smtp.from && config.smtp.to);
