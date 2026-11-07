# KHAZRI DMC website

React/Vite site for KHAZRI DMC. The proposal form is handled by one Vercel Function, which sends each completed inquiry directly to the configured business email address through SMTP.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The proposal form is handled by Vercel in deployed environments.

## Build

```bash
npm run typecheck
npm run build
```

Vercel detects `api/inquiries/partner.ts` and deploys it as a serverless function alongside the Vite site.

## Configuration

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`: SMTP transport for the business mailbox.
- `SMTP_FROM`: verified sender address for the mailbox.
- `LEADS_TO_EMAIL`: recipient address. It defaults to `info@khazridmc.com`.

Add these values in the Vercel project’s Environment Variables settings, then redeploy. The form returns a clear error when SMTP is unavailable or delivery fails, so the visitor knows their request was not sent.

## Before public launch

The logo component uses the supplied artwork’s gold emblem in a horizontal lockup. SVG and ICO favicons use a matching gold K and versioned URLs to refresh browser caches. Confirm the production domain in `index.html`, `robots.txt`, and `sitemap.xml`. Add verified business email, telephone, and domain in `src/content/site.ts`. Have counsel confirm the draft Privacy Policy, Cookie Policy, and Terms, including entity details and jurisdiction. Configure SMTP in Vercel and keep all credentials server-side.

Review [`public/images/ASSET_LICENSES.md`](public/images/ASSET_LICENSES.md) before launch. It records every local photograph, attribution, licence, and two rights-clearance items that should be resolved or replaced with client-owned photography before commercial publication.
