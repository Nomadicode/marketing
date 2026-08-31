# Public-site architecture migration

## Audit decision

The former public site was a Vite single-page application. Its title, marketing copy, navigation, language selection, and portfolio data were created in the browser, so its initial HTML was an empty application shell. Vite does not provide a production SSR/SSG route model for this project. There was no checked-in hosting configuration or GitHub Actions workflow.

## Focused migration plan

1. Retain the existing visual assets, Tailwind approach, contact endpoints, quote table schema, and English/Spanish content as source material.
2. Replace the Vite entry point with the Next.js App Router. The public pages are server components and are statically generated for published locales; only the quote form is a client component.
3. Move marketing copy into locale message modules and use `[locale]` routes. English is the default locale at `/`; published Spanish lives at `/es`. Middleware redirects unsupported locales to the English default.
4. Keep the Supabase quote submission behind a same-origin route handler. Public environment variables are only the Supabase URL and anonymous key; no service key is exposed.
5. Add server-generated metadata, canonical URLs, robots, sitemap, 404 handling, and conservative Organization schema based only on existing verified contact information.
6. Add GitHub Actions validation for pull requests and a Vercel production workflow for `main`. The provider token, organization, and project ID remain repository secrets because the repository contains no existing target configuration.

## Rendering model

| Route                       | Mode                                             | Reason                                                  |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `/`, `/es`                  | Static server-rendered                           | Stable marketing content and translation messages.      |
| `/services`, `/es/services` | Static server-rendered                           | Stable service descriptions.                            |
| `/contact`, `/es/contact`   | Static server-rendered plus isolated client form | Crawlable contact copy; form state requires JavaScript. |
| `/api/quote`                | Request-time route handler                       | Validates and sends an individual quote to Supabase.    |

The deployment target must support Next.js server routes. Vercel does; the supplied workflow is intentionally gated on repository secrets until an existing Vercel project is connected.
