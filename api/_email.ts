import nodemailer from 'nodemailer';

const safeLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, value => value.toUpperCase());

const config = () => ({
  host: process.env.SMTP_HOST || '',
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASS || '',
  from: process.env.SMTP_FROM || '',
  to: process.env.LEADS_TO_EMAIL || 'info@khazridmc.com',
});

export const emailConfigured = () => {
  const smtp = config();
  return Boolean(smtp.host && smtp.from && smtp.to);
};

export async function sendInquiryEmail(data: Record<string, unknown>) {
  const smtp = config();
  if (!emailConfigured()) throw new Error('SMTP is not configured');
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
  });
  const text = Object.entries(data)
    .filter(([key]) => key !== 'website_confirm' && key !== 'privacyAccepted')
    .map(([key, value]) => `${safeLabel(key)}: ${Array.isArray(value) ? value.join(', ') : value}`)
    .join('\n');

  await transport.sendMail({
    from: smtp.from,
    to: smtp.to,
    replyTo: typeof data.email === 'string' ? data.email : undefined,
    subject: '[KHAZRI DMC] New proposal inquiry',
    text: `Received: ${new Date().toISOString()}\n\n${text}`,
  });
}
