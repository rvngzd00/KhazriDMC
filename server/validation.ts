import { z } from 'zod';

const clean = (max: number) => z.string().trim().min(1, 'This field is required.').max(max, `Please keep this under ${max} characters.`);
const optional = (max: number) => z.string().trim().max(max).optional().default('');
const email = z.string().trim().email('Enter a valid email address.').max(254);
const privacy = z.union([z.literal(true), z.literal('true')], { error: 'Please acknowledge the privacy notice.' }).transform(() => true);
const honeypot = z.string().max(200).optional().default('');

const optionalDate = z.union([z.literal(''), z.string().date('Enter a valid date.')]).optional().default('');
const optionalPositiveInteger = z.union([
  z.literal(''),
  z.string().regex(/^\d+$/, 'Enter a positive whole number.').refine(value => Number(value) > 0, 'Enter a positive whole number.'),
  z.number().int('Enter a positive whole number.').positive('Enter a positive whole number.'),
]).optional().default('');

export const partnerSchema = z.object({
  companyName: clean(120),
  contactPerson: clean(120),
  email,
  country: clean(100),
  phone: z.union([z.literal(''), z.string().trim().min(5, 'Enter a valid phone number.').max(50).regex(/^[+\d\s().-]+$/, 'Enter a valid phone number.')]).optional().default(''),
  companyWebsite: z.union([z.literal(''), z.string().trim().url('Enter a complete website URL.').max(300)]).optional().default(''),
  inquiryType: z.enum(['FIT & Tailor-Made Travel','Group Tours','Hotels & Accommodation','Transportation','Guided Tours & Excursions','MICE & Corporate Travel','Customized Itinerary','Other'], { error: 'Select an inquiry type.' }),
  arrivalDate: optionalDate,
  departureDate: optionalDate,
  numberOfTravelers: optionalPositiveInteger,
  numberOfRooms: optionalPositiveInteger,
  preferredDestinations: optional(500),
  hotelPreferences: optional(500),
  estimatedBudget: optional(200),
  additionalRequirements: clean(4000),
  context: optional(300),
  privacyAccepted: privacy,
  website_confirm: honeypot,
}).strict().superRefine((data, ctx) => {
  if (data.arrivalDate && data.departureDate && data.departureDate < data.arrivalDate) {
    ctx.addIssue({ code: 'custom', path: ['departureDate'], message: 'Departure date cannot be before arrival date.' });
  }
});

export const contactSchema = z.object({
  fullName: clean(120),
  companyName: optional(120),
  email,
  inquiryType: z.enum(['Destination services','Active travel request','MICE & corporate travel','Supplier collaboration','General inquiry'], { error: 'Select an inquiry type.' }),
  message: clean(3000),
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
