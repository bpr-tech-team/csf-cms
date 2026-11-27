import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
  CREATE TYPE "public"."enum_pages_blocks_centered_cta_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_cta_theme" AS ENUM('light', 'dark');
  ALTER TABLE "pages_blocks_centered_cta" ADD COLUMN "theme" "enum_pages_blocks_centered_cta_theme" DEFAULT 'dark';
  ALTER TABLE "_pages_v_blocks_centered_cta" ADD COLUMN "theme" "enum__pages_v_blocks_centered_cta_theme" DEFAULT 'dark';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
  ALTER TABLE "pages_blocks_centered_cta" DROP COLUMN "theme";
  ALTER TABLE "_pages_v_blocks_centered_cta" DROP COLUMN "theme";
  DROP TYPE "public"."enum_pages_blocks_centered_cta_theme";
  DROP TYPE "public"."enum__pages_v_blocks_centered_cta_theme";`);
}
