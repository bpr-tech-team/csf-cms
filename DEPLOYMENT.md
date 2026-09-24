# Vercel deployment

Project: https://vercel.com/bpr-tech/csf-cms

| Git branch                   | Vercel environment | Database            | Uploads             |
| ---------------------------- | ------------------ | ------------------- | ------------------- |
| `main`                       | Production         | `csf-cms-prod-neon` | `csf-cms-prod-blob` |
| `develop` and other branches | Preview            | `csf-cms-dev-neon`  | `csf-cms-dev-blob`  |

Both Neon projects use the Free plan with scale-to-zero after five minutes of inactivity. Database projects, Blob stores, and functions use Frankfurt. Preview deployments share the dev database and Blob store.

Vercel uses Node.js 22 and pnpm 10.32.1. The build command in `vercel.json` runs pending Payload migrations before building Next.js. Commit deployment configuration, generated migration files, and the lockfile together before pushing changes to GitHub.

The Neon and Blob integrations manage `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN`. Each environment also has its own `PAYLOAD_SECRET`, `PREVIEW_SECRET`, and `BLOB_PUBLIC_URL`. Manage their values in Vercel; do not commit them. `NEXT_PUBLIC_SERVER_URL` is optional and overrides the automatically detected deployment origin when a custom domain is configured.

Cloud databases start without local content or users. Open `/admin` on the protected deployment to create its first administrator. Configure SMTP separately if email delivery is required. Moving existing local content and uploads requires a separate migration.

Locally, keep using `.env` and the local database. Without `BLOB_READ_WRITE_TOKEN`, uploads remain in `public/media`. Apply pending migrations with `pnpm payload migrate` before using the updated schema.

Vercel CLI uploads exclude local secrets, temporary files, and local media through `.vercelignore`. Bundled assets in `public/media/block` remain included.

Speed Insights Free runs on the public frontend in both Preview and Production. Web Analytics runs only in Production, outside Payload draft mode. Neither script runs in the admin panel or local development. Both language versions use the shared `FrontendShell`. Keep Speed Insights Plus and Web Analytics Plus disabled; the free Speed Insights allowance is shared across the team, while standard Web Analytics is billed by usage.
