# KHAZRI DMC website

Production-oriented React/Vite frontend and Node/Express API for KHAZRI DMC. Inquiry records are saved to SQLite before any notification attempt, so SMTP outages do not lose leads.

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` to the server on port `8787`.

## Verify and run production

```bash
npm test
npm run typecheck
npm run build
npm start
```

Production runs on `http://localhost:8787` and serves both the SPA and API. `GET /api/health` is the health check.

## Configuration

- `DATABASE_PATH`: persistent SQLite file. Back up this file and its directory.
- `PUBLIC_ORIGIN`: final HTTPS website origin.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`: optional SMTP transport.
- `SMTP_FROM`, `LEADS_TO_EMAIL`: required to enable notifications.
- `LEAD_EXPORT_TOKEN`: long admin secret required in the environment for CLI export.
- `DATA_RETENTION_DAYS`: records older than this configured period are automatically purged daily; confirm the final period with the client before launch.

If SMTP is absent, leads remain safely stored with `not_configured` status. If delivery fails, records stay in the queue and are retried up to six times. No public endpoint exposes lead data.

Export from a trusted server shell only:

```bash
LEAD_EXPORT_TOKEN='your-configured-secret' npm run leads:export -- --json > leads.json
LEAD_EXPORT_TOKEN='your-configured-secret' npm run leads:export > leads.csv
```

Treat exports as personal data and store them securely.

## Docker deployment

Create `.env` from `.env.example`, set secrets and the public origin, then run:

```bash
docker compose up -d --build
```

The named `khazri_leads` volume persists SQLite data across container replacements. Put the service behind an HTTPS reverse proxy and back up the volume.

## Before public launch

The logo component uses the supplied artwork’s gold emblem in a horizontal lockup. SVG and ICO favicons use a matching gold K and versioned URLs to refresh browser caches. Confirm the production domain in `index.html`, `robots.txt`, and `sitemap.xml`. Add verified business email, telephone, and domain in `src/content/site.ts`. Have counsel confirm the draft Privacy Policy, Cookie Policy, and Terms, including entity details, jurisdiction, and retention schedule. Configure SMTP and keep all credentials server-side.

Review [`public/images/ASSET_LICENSES.md`](public/images/ASSET_LICENSES.md) before launch. It records every local photograph, attribution, licence, and two rights-clearance items that should be resolved or replaced with client-owned photography before commercial publication.
