import { z } from 'zod';

const clean = (max: number) => z.string().trim().min(1, 'This field is required.').max(max, `Please keep this under ${max} characters.`);
const optional = (max: number) => z.string().trim().max(max).optional().default('');
const email = z.string().trim().email('Enter a valid email address.').max(254);
const privacy = z.union([z.literal(true), z.literal('true')], { error: 'Please acknowledge the privacy notice.' }).transform(() => true);
const honeypot = z.string().max(200).optional().default('');

export const partnerSchema = z.object({
  companyName: clean(120),
  contactPerson: clean(120),
  email,
  country: clean(100),
  phone: z.union([z.literal(''), z.string().trim().min(5, 'Enter a valid phone number.').max(50).regex(/^[+\d\s().-]+$/, 'Enter a valid phone number.')]).optional().default(''),
  companyWebsite: z.union([z.literal(''), z.string().trim().url('Enter a complete website URL.').max(300)]).optional().default(''),
  inquiryType: z.enum(['FIT & Tailor-Made Travel','Group Tours','Hotels & Accommodation','Transportation','Guided Tours & Excursions','MICE & Corporate Travel','Customized Itinerary','Other'], { error: 'Select an inquiry type.' }),
  additionalRequirements: clean(4000),
  context: optional(300),
  privacyAccepted: privacy,
  website_confirm: honeypot,
}).strict();

export function issueMap(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] || 'form');
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
