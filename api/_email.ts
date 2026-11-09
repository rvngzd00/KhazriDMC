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
  return Boolean(smtp.host && smtp.user && smtp.pass && smtp.from && smtp.to && Number.isInteger(smtp.port) && smtp.port > 0);
};

export function emailDiagnostics() {
  const smtp = config();
  return {
    host: smtp.host || '[missing]',
    port: smtp.port,
    secure: smtp.secure,
    from: smtp.from || '[missing]',
    to: smtp.to || '[missing]',
    usernameConfigured: Boolean(smtp.user),
    passwordConfigured: Boolean(smtp.pass),
  };
}

export async function sendInquiryEmail(data: Record<string, unknown>) {
  const smtp = config();
  if (!emailConfigured()) throw new Error('SMTP is not configured');
  const text = Object.entries(data)
    .filter(([key]) => key !== 'website_confirm' && key !== 'privacyAccepted')
    .map(([key, value]) => `${safeLabel(key)}: ${Array.isArray(value) ? value.join(', ') : value}`)
    .join('\n');

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
      connectionTimeout: 12_000,
      greetingTimeout: 12_000,
      socketTimeout: 20_000,
      tls: { minVersion: 'TLSv1.2' },
    });
    try {
      const result = await transport.sendMail({
        from: smtp.from,
        to: smtp.to,
        replyTo: typeof data.email === 'string' ? data.email : undefined,
        subject: '[KHAZRI DMC] New proposal inquiry',
        text: `Received: ${new Date().toISOString()}\n\n${text}`,
      });
      return { messageId: result.messageId, accepted: result.accepted.length, rejected: result.rejected.length, attempt };
    } catch (error) {
      const code = (error as { code?: string; command?: string }).code;
      const command = (error as { command?: string }).command;
      const canRetry = attempt === 1 && ['ECONNECTION', 'ECONNRESET', 'EDNS', 'ESOCKET', 'ETIMEDOUT'].includes(code || '') && command === 'CONN';
      if (!canRetry) throw error;
      console.warn(JSON.stringify({ level: 'warn', event: 'inquiry_email_retry', attempt: attempt + 1, code }));
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      transport.close();
    }
  }
  throw new Error('SMTP delivery failed');
}
