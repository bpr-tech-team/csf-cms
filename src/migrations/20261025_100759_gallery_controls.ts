import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "pages_blocks_branch_details" ADD COLUMN "show_controls" boolean DEFAULT true;
        ALTER TABLE "flex_gallery" ADD COLUMN "show_controls" boolean DEFAULT true;
        ALTER TABLE "gallery" ADD COLUMN "show_controls" boolean DEFAULT true;
        ALTER TABLE "_pages_v_blocks_branch_details" ADD COLUMN "show_controls" boolean DEFAULT true;
        ALTER TABLE "_flex_gallery_v" ADD COLUMN "show_controls" boolean DEFAULT true;
        ALTER TABLE "_gallery_v" ADD COLUMN "show_controls" boolean DEFAULT true;
    `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "pages_blocks_branch_details" DROP COLUMN "show_controls";
        ALTER TABLE "flex_gallery" DROP COLUMN "show_controls";
        ALTER TABLE "gallery" DROP COLUMN "show_controls";
        ALTER TABLE "_pages_v_blocks_branch_details" DROP COLUMN "show_controls";
        ALTER TABLE "_flex_gallery_v" DROP COLUMN "show_controls";
        ALTER TABLE "_gallery_v" DROP COLUMN "show_controls";
    `);
}
