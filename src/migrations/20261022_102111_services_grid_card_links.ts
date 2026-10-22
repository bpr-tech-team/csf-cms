import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "pages_blocks_services_grid_items" DROP COLUMN "link_label";
        ALTER TABLE "_pages_v_blocks_services_grid_items" DROP COLUMN "link_label";
    `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "pages_blocks_services_grid_items" ADD COLUMN "link_label" varchar;
        ALTER TABLE "_pages_v_blocks_services_grid_items" ADD COLUMN "link_label" varchar;
    `);
}
