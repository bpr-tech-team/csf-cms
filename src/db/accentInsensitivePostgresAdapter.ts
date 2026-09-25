import {
    postgresAdapter,
    type PostgresAdapter,
    type PostgresAdapterArgs,
} from "@payloadcms/db-postgres";
import { ilike, is, notIlike, sql } from "@payloadcms/db-postgres/drizzle";
import { PgText, PgVarchar } from "@payloadcms/db-postgres/drizzle/pg-core";

type Operator = PostgresAdapter["operators"]["like"];

function withoutAccents(original: Operator, compare: typeof ilike): Operator {
    return (column, value) => {
        if (
            typeof value !== "string" ||
            !(is(column, PgText) || is(column, PgVarchar)) ||
            column.primary
        ) {
            return original(column, value);
        }

        return compare(sql`unaccent(${column})`, sql`unaccent(${value})`);
    };
}

/** Compatibility layer for Payload 3.90.2, which has no query.operatorHandlers API. */
export function accentInsensitivePostgresAdapter(args: PostgresAdapterArgs) {
    const base = postgresAdapter({
        ...args,
        extensions: [...new Set([...(args.extensions ?? []), "unaccent"])],
    });

    return {
        ...base,
        init: (options: Parameters<typeof base.init>[0]) => {
            const adapter = base.init(options);
            // Payload shares operatorMap between instances; never mutate it in place.
            adapter.operators = {
                ...adapter.operators,
                contains: withoutAccents(adapter.operators.contains, ilike),
                like: withoutAccents(adapter.operators.like, ilike),
                not_like: withoutAccents(adapter.operators.not_like, notIlike),
            };
            return adapter;
        },
    };
}
