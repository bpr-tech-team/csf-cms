# Deploying to Netlify

Project: https://app.netlify.com/projects/csf-cms

Production: https://csf-cms.netlify.app

The `bpr-tech-team/csf-cms` repository is connected through the Netlify GitHub App.
The production branch is `main`. Every push triggers a Netlify build.
Deploy keys are not used.

## Build

Settings are defined in `netlify.toml`: Node.js 24, pnpm 10.32.1,
build command `pnpm run build:netlify`, and publish directory `.next`.
Netlify installs the Next.js runtime automatically.

The `scripts/netlify-build.mjs` script runs `payload migrate` first,
then `pnpm run build`. A migration failure stops the build.
Payload migrations live in `src/migrations`; there is no need to duplicate them
in `netlify/database/migrations`. Schema changes must remain compatible with
the previous deployment, which continues serving requests during the build.
Rolling back a deployment does not roll back the database.

## Database and environment variables

Netlify Database provides managed PostgreSQL. The `@netlify/database` package
gets the connection from the platform-provided `NETLIFY_DB_URL`.
Local development continues to use `DATABASE_URL` from `.env`.
Automatic schema updates (`push`) are disabled both locally and in production.
Schema changes are applied through migrations. The `payload` command and generators
use `scripts/payload-cli.mjs`: TypeScript is loaded through `--import tsx`,
and CLI execution is explicitly awaited to prevent a silent exit without running migrations.

The following production variables are configured in the Netlify UI → Environment variables:

- `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `CRON_SECRET` — secret values;
- `NEXT_PUBLIC_SERVER_URL=https://csf-cms.netlify.app`;
- `NETLIFY_STORAGE_CONTEXT=production`.

Variables must be available to both builds and server functions. Values in
`netlify.toml` alone do not replace runtime variables configured in the UI.
When connecting a custom domain, update `NEXT_PUBLIC_SERVER_URL` and
set the domain as the primary domain in Netlify.

SMTP has not been configured separately for the new project. To enable email
and password recovery, configure the production `SMTP_*` variables listed in `.env.example`.

## Media

On Netlify, uploaded files are saved in the persistent Netlify Blobs store
`payload-media`. Payload serves them through `/api/media/file/...`,
preserves their MIME types, and checks access using the standard CMS mechanism.
Local development continues to use the `public/media` directory.

Production secrets are configured only for production. Before enabling
Deploy Previews, configure separate secrets for that context.
Previews use an isolated Netlify database branch and media storage tied to
the individual deployment; production media is not copied there.

## Initial setup

The database starts empty, without importing local data. After a successful deployment,
open `/admin` and create the first administrator. If Netlify SSO protection is enabled,
sign in to Netlify first. Then add content through the CMS.

Until the CMS contains a published page with the slug `home`, the homepage returns
404 (or a redirect configured in the CMS). Demo content, navigation, and images
are not supplied automatically. Configure Header and Footer under Globals;
select block images from Media. Seeders run only when explicitly invoked.

## Moving Homepage hero into blocks

The `20260907_163636_homepage_hero_block` migration moves the previous hero of type
`homepage` into the first `layout` block and sets `hero.type = none`.
Localizations, versions, media, links, and the order of the remaining blocks are preserved.
There is no need to rerun the seeder. In the admin panel, the block is available through
`Obsah → Přidat blok → Homepage hero` on any page.

Locally, apply migrations **before running `pnpm dev`** so the server uses
the updated schema and migrated content:

```sh
NODE_ENV=production pnpm payload migrate
```

The migration will run during the next Netlify build. Back up the database before
the first deployment containing this change. Legacy tables and columns are retained
to support SQL queries from the previous deployment; the updated application no longer
uses them. The schema snapshot used by the generator describes the new model.
During the deployment transition, the previous deployment no longer displays the migrated hero.
The down migration is intentionally disabled: multiple arbitrary blocks cannot be converted
back into a single hero without losing data. A rollback requires restoring a database
backup together with the previous application version.

Test the migration against an **empty temporary database**:

```sh
NODE_ENV=production DATABASE_URL='postgresql://…/temporary_test_db' \
  NETLIFY_DB_URL= PAYLOAD_SECRET='temporary-test-secret' \
  pnpm exec tsx tests/migrations/homepage-hero.mjs
```
