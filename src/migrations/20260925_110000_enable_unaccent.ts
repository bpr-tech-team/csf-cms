import { type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS unaccent;`);
    // Fail the migration if the extension is not available on the search path.
    await db.execute(sql`SELECT unaccent('Příliš žluťoučký kůň');`);
}

export async function down(): Promise<void> {
    // Keep the shared extension: other queries or applications may depend on it.
    // Reverting the adapter restores the original search behavior.
}
