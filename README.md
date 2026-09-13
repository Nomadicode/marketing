# Nomadicode marketing site

Next.js 14 (App Router) marketing site for Nomadicode, with English/Spanish
locale routing and a Supabase backed contact form. Supabase (Postgres) is the
only persistence layer. It matches the architecture
of the sibling `~nomadicode` project.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Brevo values
npm run dev
```

Runs at http://localhost:3000. The default locale (`en`) is served at `/`;
Spanish is served at `/es`.

## Environment variables

See `.env.example`. `NEXT_PUBLIC_SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` are required for the contact form to store
submissions. `BREVO_API_KEY`, `BREVO_FROM_EMAIL`, and
`CONTACT_NOTIFICATION_EMAIL` are optional. Without them, submissions are
still stored in Supabase but no notification email is sent.

## Database

Apply the migrations in `supabase/migrations/` to your Supabase project, in
timestamp order, through the Supabase CLI or dashboard SQL editor.

`20260913000000_contact_messages.sql` creates `contact_messages` with Row
Level Security enabled and no anon/authenticated policies. The table is
writable only through the server side `/api/contact` route using the service
role key, so direct browser writes are blocked.

`20260913010000_public_catalog.sql` creates the public `products` and
`clients` catalog. Published records can be read through the anonymous key;
all writes remain restricted to trusted Supabase users and server-side tools.
The migration seeds FlowDek and EasyGiftLists as products. Add future entries
in Supabase, set `is_published` to `true`, and they will appear on the home
page within five minutes. Product links can target an internal route or an
external HTTPS URL. Clients support an optional website URL and either an
icon key or icon URL.

## Contact form data flow

The form submits to the same-origin `POST /api/contact` route. The route
validates required fields and the email address, then writes to Supabase
with the service-role key (RLS blocks direct browser writes). If Brevo
environment variables are set, it also sends a notification email.

## Scripts

- `npm run dev`: start the dev server
- `npm run build` / `npm run start`: production build and serve
- `npm run lint`: ESLint
- `npm run typecheck`: TypeScript, no emit
- `npm run format:check`: Prettier check
- `npm test`: Node's built in test runner

## Project structure

- `app/[locale]/`: routed pages (`en` default at `/`, `es` under `/es`)
- `app/components/layout/`: header, footer, nav, section chrome
- `app/components/sections/`: page level section blocks (hero/intro, CTA banner)
- `app/components/cards/`: reusable content cards
- `app/components/forms/`: the contact form
- `app/lib/`: site config, i18n message loader, metadata helper
- `messages/en.json`, `messages/es.json`: all page copy
- `supabase/migrations/`: database schema

## Deployment

Production deployment uses Netlify and GitHub Actions, matching the sibling
`~nomadicode` project. The deploy workflow validates the revision, applies
pending Supabase migrations, and only then publishes the site. See
[`docs/deployment.md`](docs/deployment.md) for the required GitHub Environment
secrets and the one-time cutover from the old site.
