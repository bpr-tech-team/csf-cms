# Accent-insensitive search

`accentInsensitivePostgresAdapter` wraps Payload 3.90.2's SQL operators. Text
`like`, `contains`, and `not_like` compare `unaccent(column)` with
`unaccent(pattern)`. PostgreSQL's `ILIKE` still handles case, and Payload still
handles word splitting and wildcards. Parameters remain bound SQL parameters.

This covers collection list search and relationship/upload selectors, including
localized text columns, drafts, and text in relational arrays/blocks. The same
operators in REST, GraphQL, and Local API queries have the same behavior.

Stored content, `equals`, `not_equals`, IDs, numbers, enums, and JSON/rich-text
queries retain their existing behavior. Primary keys are excluded even if they
are text. Client-side filtering of static options is outside this SQL layer.

The adapter enables PostgreSQL's `unaccent` extension. The migration verifies
that it is available; it must run before deployment. No content backfill or
schema snapshot is needed because no tables change. Rollback intentionally
retains the extension, which may be shared with other consumers.

Restart the dev server after changing the adapter factory: Payload 3.90.2's hot
reload reuses the existing database adapter instance.

This is a version-specific compatibility layer, not a public Payload query-hook
API. When upgrading Payload, run the adapter tests and check whether the stable
release provides `postgresUnaccent` / `query.operatorHandlers`; prefer that
official API once available. Do not add an index on `unaccent(column)` directly:
PostgreSQL marks the function STABLE, not IMMUTABLE. Revisit indexing only if
query measurements show it is necessary.

References:

- <https://www.postgresql.org/docs/current/unaccent.html>
- <https://github.com/payloadcms/payload/blob/v3.90.2/packages/drizzle/src/queries/operatorMap.ts>
