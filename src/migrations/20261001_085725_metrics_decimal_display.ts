import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "pages_blocks_metrics_strip_items" ADD COLUMN "show_decimals" boolean DEFAULT false;
        ALTER TABLE "_pages_v_blocks_metrics_strip_items" ADD COLUMN "show_decimals" boolean DEFAULT false;
    `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "pages_blocks_metrics_strip_items" DROP COLUMN "show_decimals";
        ALTER TABLE "_pages_v_blocks_metrics_strip_items" DROP COLUMN "show_decimals";
    `);
}
