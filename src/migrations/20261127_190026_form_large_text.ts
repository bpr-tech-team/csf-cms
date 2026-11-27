import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "large_text" boolean;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "large_text" boolean;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "large_text";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "large_text";`);
}
