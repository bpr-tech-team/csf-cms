// @vitest-environment node

import { postgresAdapter } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres/drizzle";
import {
    alias,
    integer,
    jsonb,
    PgDialect,
    pgEnum,
    pgTable,
    text,
    uuid,
    varchar,
} from "@payloadcms/db-postgres/drizzle/pg-core";
import type { Payload } from "payload";
import { describe, expect, it } from "vitest";

import { accentInsensitivePostgresAdapter } from "./accentInsensitivePostgresAdapter";

const status = pgEnum("search_test_status", ["draft", "published"]);
const table = pgTable("search_test", {
    id: varchar("id").primaryKey(),
    title: varchar("title"),
    description: text("description"),
    number: integer("number"),
    uuid: uuid("uuid"),
    status: status("status"),
    content: jsonb("content"),
});
const options = { payload: {} as Payload };
const args = { pool: {}, push: false };
const dialect = new PgDialect();

describe("accent-insensitive Postgres adapter", () => {
    const adapter = accentInsensitivePostgresAdapter(args).init(options);
    const original = postgresAdapter(args).init(options);

    it.each(["like", "contains", "not_like"] as const)(
        "normalizes both sides of %s and binds the pattern safely",
        (operator) => {
            const pattern = "%Počítač ' OR 1=1 --%";
            const query = dialect.sqlToQuery(
                adapter.operators[operator](table.title, pattern),
            );

            expect(query.sql).toBe(
                `unaccent("search_test"."title") ${operator === "not_like" ? "not ilike" : "ilike"} unaccent($1)`,
            );
            expect(query.params).toEqual([pattern]);
        },
    );

    it("handles text and aliased localized columns", () => {
        const localized = alias(table, "pages_locales");
        const query = dialect.sqlToQuery(
            adapter.operators.like(localized.description, "%Zlín%"),
        );

        expect(query.sql).toBe(
            'unaccent("pages_locales"."description") ilike unaccent($1)',
        );
    });

    it.each(["id", "number", "uuid", "status", "content"] as const)(
        "preserves the original behavior for %s",
        (field) => {
            for (const operator of ["like", "contains", "not_like"] as const) {
                expect(
                    dialect.sqlToQuery(
                        adapter.operators[operator](table[field], "value"),
                    ),
                ).toEqual(
                    dialect.sqlToQuery(
                        original.operators[operator](table[field], "value"),
                    ),
                );
            }
        },
    );

    it("preserves raw SQL operands", () => {
        const value = sql`current_user`;
        expect(
            dialect.sqlToQuery(adapter.operators.like(table.title, value)),
        ).toEqual(
            dialect.sqlToQuery(original.operators.like(table.title, value)),
        );
    });

    it("leaves exact matches and every other operator unchanged", () => {
        for (const [name, operator] of Object.entries(original.operators)) {
            if (["like", "contains", "not_like"].includes(name)) continue;
            expect(
                adapter.operators[name as keyof typeof adapter.operators],
            ).toBe(operator);
        }
    });

    it("does not change the shared operator map or wrap another instance twice", () => {
        const second = accentInsensitivePostgresAdapter(args).init(options);
        expect(adapter.operators).not.toBe(original.operators);
        expect(
            dialect.sqlToQuery(original.operators.like(table.title, "%Zlin%"))
                .sql,
        ).toBe('"search_test"."title" ilike $1');
        expect(
            dialect.sqlToQuery(second.operators.like(table.title, "%Zlin%")),
        ).toEqual(
            dialect.sqlToQuery(adapter.operators.like(table.title, "%Zlin%")),
        );
    });

    it("retains configured extensions and enables unaccent", () => {
        const configured = accentInsensitivePostgresAdapter({
            ...args,
            extensions: ["pg_trgm", "unaccent"],
        }).init(options);
        expect(configured.extensions).toEqual({
            pg_trgm: true,
            unaccent: true,
        });
    });
});
