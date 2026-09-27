# Dependency maintenance

Use the pnpm version declared in `packageManager` and commit `package.json` and
`pnpm-lock.yaml` together. CI and deployments should install with
`pnpm install --frozen-lockfile`.

Prefer stable releases within supported dependency and peer dependency ranges.
Update the parent package when it pins a vulnerable child. Do not force an
unsupported child version or suppress an advisory just to make audit pass.
Keep all `payload` and `@payloadcms/*` packages on the same release.

## Security updates verified on 2026-09-25

- `sharp`: 0.35.4, including updated native image libraries.
- `diff`: 8.0.3, retaining the existing `diffArrays` integration.
- `vitest`: 4.1.11, including the matching `@vitest/mocker` release.
- `js-yaml`: 4.3.2, resolved in the lockfile within its parents' existing ranges.
- `monaco-editor`: 0.57.0, which depends on DOMPurify 3.4.15.

Monaco is explicitly supplied by this application as the peer dependency of
`@monaco-editor/react` 4.7.0 (used by Payload). Its supported range is
`>=0.25.0 <1`. This selects a supported editor release and its own sanitizer;
it does not override Monaco's internal dependency on DOMPurify. Keep this direct
peer dependency when updating the lockfile.

These updates add no overrides, patches, or audit exclusions. The existing
Payload locale-copy patch is unrelated; its maintenance is described in
[patches/README.md](patches/README.md).

## Remaining upstream advisory

Both `pnpm audit` and `pnpm audit --prod` report one moderate advisory:
[GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99).
There are no critical, high, or low findings in these reports as of the date above.

Dependency path:

```text
@payloadcms/db-postgres 3.90.2
  -> drizzle-kit 0.31.7
    -> @esbuild-kit/esm-loader 2.6.5
      -> @esbuild-kit/core-utils 3.3.2
        -> esbuild 0.18.20
```

The advisory concerns esbuild's own development server and cross-origin access
to its responses. It is not evidence that the Next.js server exposes that API.
The project does not intentionally start an esbuild serve server.

Payload 3.90.2 is the latest stable release checked and pins Drizzle Kit 0.31.7.
Even Drizzle Kit 0.31.11, the latest stable release checked, still depends on the
legacy loader. Adding a newer direct esbuild dependency does not replace this
nested copy. Fixing the chain without overrides requires an upstream release
that removes or updates the loader, followed by a compatible Payload release.
Recheck these manifests on the next Payload upgrade. Do not switch the CMS to a
canary release solely to clear this finding.

The finding remains visible: both audit commands currently exit with status 1.

## Validation

After dependency updates, run lint, type checking, the existing integration
suite, and the production build. For image-library updates, verify upload,
all configured Payload image sizes, and Next.js image optimization. For admin
changes, check authenticated collection views and document editing in a browser.
Regenerate Payload types and the import map when relevant.

Run both audit variants and inspect dependency paths, not only severity counts.
Audit covers installed packages; externally loaded CDN scripts require separate
runtime verification. In particular, Payload's code editor uses the Monaco
loader, whose CDN defaults are separate from the installed Monaco peer version.
Updating the npm peer alone does not establish which CDN version a browser loads.
