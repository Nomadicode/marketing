# CI/CD and production deployment

`Validate` runs on every pull request and every push to `main`. It installs
from the lockfile, checks formatting, lint, types, tests, and creates a
production build. Pull requests do not receive production secrets and never
deploy.

`Deploy production` runs after a push to `main`, or manually from the Actions
tab. It repeats validation, verifies all required production configuration,
applies unapplied Supabase migrations, then deploys to the existing Netlify
site. The job uses the protected GitHub `production` Environment and a single
concurrency group, so an older run cannot finish over a newer one.

## Connect the production services

Create a `production` Environment in GitHub, protect it with the approval
rules you want, then add these Environment secrets. Keep their values out of
the repository, issue tracker, and workflow logs.

| Secret                          | Purpose                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `NETLIFY_AUTH_TOKEN`            | A Netlify personal access token allowed to deploy the existing production site. |
| `NETLIFY_SITE_ID`               | The existing Netlify site ID that currently serves the production domain.       |
| `NEXT_PUBLIC_SITE_URL`          | Canonical public origin, for example `https://nomadicode.com`.                  |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public URL for the production Supabase project.                                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key for that Supabase project.                                 |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-only Supabase key for the contact route. Never expose it to a browser.   |
| `SUPABASE_ACCESS_TOKEN`         | Supabase personal access token used by the migration job.                       |
| `SUPABASE_DB_PASSWORD`          | Production project database password. This is not the service-role key.         |
| `SUPABASE_PROJECT_ID`           | Production Supabase project reference from its dashboard URL.                   |

The contact notification settings are optional. If you want notification
emails, add `BREVO_API_KEY`, `BREVO_FROM_EMAIL`, and
`CONTACT_NOTIFICATION_EMAIL`; `BREVO_FROM_NAME` is optional. The sender must
be verified in Brevo. A missing Brevo configuration still stores form
submissions in Supabase, but sends no email.

The migration job links the CLI to `SUPABASE_PROJECT_ID` and runs
`supabase db push`. Supabase uses its migration history to apply only the
unapplied files in `supabase/migrations/`. A migration failure stops the
workflow before Netlify receives a new build.

## One-time cutover

1. Push this repository to the GitHub repository that should own the site.
2. Add the `production` Environment secrets above, pointing `NETLIFY_SITE_ID`
   at the current production site. Do not create a second Netlify site if the
   domain is meant to move cleanly.
3. Run `Deploy production` manually and confirm the migration and deployment
   both succeed. Check the live contact form and the catalog afterward.
4. Disable Netlify's built-in Git production deploy for that site after the
   first successful Actions deployment. Otherwise Netlify and GitHub Actions
   can race to deploy the same push, which is a silly way to make a release
   feel exciting.

After this cutover, a successful push to `main` applies any new Supabase
migrations before it publishes the matching application revision. Use a
separate Supabase and Netlify configuration for previews or staging; never
give pull requests the production secrets.
