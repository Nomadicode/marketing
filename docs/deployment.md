# CI/CD and deployment

`Validate` runs on every pull request and on `main`: lockfile-based install, formatting, lint, TypeScript checking, tests, and a production build. Pull requests have no deployment step and receive no production environment secrets.

`Deploy production` runs on `main` and on manual dispatch. It repeats all validation before a Netlify production deployment and uses a single concurrency group, so an older deploy cannot overwrite a newer revision. It uses the protected GitHub `production` Environment. The workflow fails visibly at the configuration gate if the target has not been connected.

The production domain is currently served by Netlify. Automatic production deployment cannot be verified until the repository owner supplies these GitHub `production` Environment secrets:

- `NETLIFY_AUTH_TOKEN` — a Netlify personal access token with access only to this production project.
- `NETLIFY_SITE_ID` — the existing Netlify Project ID for `nomadicode.com`.
- `NEXT_PUBLIC_SITE_URL` — production canonical origin (`https://nomadicode.com`).
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public Supabase project configuration. These must be present for the quote form to submit to the existing `quotes` table.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only key for the quote API route. This allows the route to insert after RLS blocks direct browser writes.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `QUOTE_NOTIFICATION_EMAIL` — required together for email notifications.
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SMS_FROM`, and `TWILIO_SMS_TO` — required together for SMS notifications.
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM`, and `TWILIO_WHATSAPP_TO` — required together for WhatsApp notifications. Twilio's sender and destination must be WhatsApp-enabled and use its required format (`whatsapp:+...`).

No secret values are committed or logged. Once those values are configured, merging a successful `main` revision automatically deploys to Netlify. To verify, run the manual workflow against the production Environment and check its deployment URL. Use separate preview-only configuration for deploy previews and never expose production-only secrets to pull requests.

Because `nomadicode.com` is already connected to Netlify, disable Netlify's built-in Git production deploy after this GitHub Actions workflow has successfully performed its first deployment. Otherwise both Netlify Git integration and GitHub Actions can deploy the same push independently.

## Quote form data flow

The form submits to the same-origin `POST /api/quote` route. The route validates all required fields and the email address, then writes to the existing Supabase `quotes` table with the project's public Supabase URL and anonymous key. The company name is stored with the submitted project details and the selected solution is stored as `category` for compatibility with the existing schema. Supabase Row Level Security must permit anonymous `insert` on that table; no Supabase service-role key is used or exposed.
