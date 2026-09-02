import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_metrics_strip" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_metrics_strip" ADD COLUMN "heading" varchar;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_metrics_strip" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_metrics_strip" DROP COLUMN "heading";`);
}
