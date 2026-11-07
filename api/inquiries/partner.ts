import type { IncomingMessage, ServerResponse } from 'node:http';
import { emailConfigured, sendInquiryEmail } from '../_email.js';
import { issueMap, partnerSchema } from '../_validation.js';

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

function requestBody(request: VercelRequest) {
  if (typeof request.body !== 'string') return request.body;
  try { return JSON.parse(request.body); } catch { return {}; }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ message: 'Method not allowed.' });
  }

  const result = partnerSchema.safeParse(requestBody(request));
  if (!result.success) return response.status(422).json({ message: 'Please check the highlighted fields.', errors: issueMap(result.error) });
  if (result.data.website_confirm) return response.status(202).json({ message: 'Thank you. Your inquiry has been received.' });
  if (!emailConfigured()) return response.status(503).json({ message: 'The inquiry email service is not configured. Please contact us directly.' });

  const { website_confirm: _discard, ...inquiry } = result.data;
  try {
    await sendInquiryEmail(inquiry);
    console.log(JSON.stringify({ level: 'info', event: 'inquiry_email_sent', type: 'partner' }));
    return response.status(201).json({ message: 'Thank you. Your inquiry has been sent successfully.' });
  } catch {
    console.error(JSON.stringify({ level: 'error', event: 'inquiry_email_failed', type: 'partner' }));
    return response.status(502).json({ message: 'We could not send your inquiry. Please try again or contact us directly.' });
  }
}
