# AbateIQ Marketing + Frontend Gateway

This repository now runs as a Cloudflare Worker + Static Assets app:

- Marketing frontend (Vite + React) is served from `dist`
- Worker API routes (`/api/*`) proxy to AbateIQ backend
- Contact submissions can be delivered upstream and by email
- Auth flows (sign in, forgot password, trial) are wired from the UI

## Project Structure

- `src/` - frontend app
- `worker/index.ts` - Cloudflare Worker API + asset gateway
- `worker/sql/001_init.sql` - D1 schema for auth + contact fallback
- `wrangler.jsonc` - Worker + assets + bindings config
- `.env.example` - frontend env defaults
- `.dev.vars.example` - local Worker runtime vars/secrets template
- `app/` - legacy design export (not used by the deployed app)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start frontend dev server:

```bash
npm run dev
```

3. Start Worker + assets locally (recommended integration path):

```bash
cp .dev.vars.example .dev.vars
npm run build
npm run cf:dev
```

4. Optional (when running only `npm run dev`):

- Set `VITE_API_BASE` in `.env.local` to your deployed Worker URL (or local Worker URL)
- Example: `VITE_API_BASE=https://abateiq-marketing.<your-subdomain>.workers.dev`

## Cloudflare Configuration

### 1. Configure non-secret vars in `wrangler.jsonc`

- `API_ORIGIN`
- `AUTH_LOGIN_PATH`
- `AUTH_FORGOT_PATH`
- `AUTH_TRIAL_PATH`
- `CONTACT_UPSTREAM_PATH`
- `WAITLIST_UPSTREAM_PATH`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

`API_ORIGIN`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are intentionally blank by default. Set them before production deploy.

If `API_ORIGIN` is blank, auth and contact can run against D1 fallback tables.

### 2. Configure secrets

If your upstream API requires a service token:

```bash
npx wrangler secret put UPSTREAM_API_TOKEN
```

### 3. Configure Email sending

This project uses Cloudflare `send_email` binding (`EMAIL`) for contact form delivery.

Required setup:

1. Enable Email Routing for your domain in Cloudflare.
2. Verify destination addresses (`CONTACT_TO_EMAIL`).
3. Ensure sender domain (`CONTACT_FROM_EMAIL`) is configured for DMARC/SPF/DKIM.

## Deploy

```bash
npm run build
npm run cf:deploy
```

## API Routes Provided by Worker

- `GET /api/health`
- `POST /api/auth/login` (proxied to upstream)
- `POST /api/auth/forgot-password` (proxied to upstream)
- `POST /api/auth/trial` (proxied to upstream)
- `POST /api/contact`
- `POST /api/waitlist`

`/api/contact` behavior:

- Validates payload
- Sends to upstream `CONTACT_UPSTREAM_PATH` when `API_ORIGIN` is configured
- Sends email when `EMAIL` binding and contact addresses are configured
- Succeeds if at least one delivery path succeeds

`/api/waitlist` behavior:

- Validates payload (`name`, `organization`, `email` required)
- Sends to upstream `WAITLIST_UPSTREAM_PATH` when `API_ORIGIN` is configured
- Sends email when `EMAIL` binding and contact addresses are configured
- Stores in D1 `waitlist_submissions` when `DB` binding exists
- Succeeds if at least one delivery path succeeds

Auth behavior:

- If `API_ORIGIN` is set: auth routes proxy upstream
- If `API_ORIGIN` is blank and `DB` binding exists: auth routes use D1 (`auth_users` / `auth_sessions`)

## Frontend Wiring Added

- Auth dialog now calls real API routes
- Trial/signup now calls API and stores session
- Protected shell route at `/app` checks local session
- Contact form now submits to `/api/contact` with error/success states
- iOS waitlist button opens modal and submits to `/api/waitlist`
- Primary CTA buttons and nav/footer links are wired

## Contact Form Troubleshooting

If contact submissions fail:

1. Confirm frontend is calling the correct API host (`VITE_API_BASE` if using Vite dev server).
2. Ensure at least one delivery path is configured:
   - Upstream: `API_ORIGIN` (+ optional `UPSTREAM_API_TOKEN`)
   - Email: `EMAIL` binding + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`
   - D1 fallback: `DB` binding + schema applied
3. Check Worker logs:

```bash
npx wrangler tail
```

## D1 Setup

Apply schema:

```bash
npx wrangler d1 execute abateiq --file=./worker/sql/001_init.sql --remote
npx wrangler d1 execute abateiq --file=./worker/sql/002_waitlist.sql --remote
```
