import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_service_section_intro_divider" AS ENUM('none', 'line');
  CREATE TYPE "public"."enum_pages_blocks_split_content_divider" AS ENUM('none', 'line');
  CREATE TYPE "public"."enum_flex_divider" AS ENUM('none', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_service_section_intro_divider" AS ENUM('none', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_divider" AS ENUM('none', 'line');
  CREATE TYPE "public"."enum__flex_v_divider" AS ENUM('none', 'line');
  ALTER TABLE "pages_blocks_service_section_intro" ADD COLUMN "divider" "enum_pages_blocks_service_section_intro_divider" DEFAULT 'line';
  ALTER TABLE "pages_blocks_split_content" ADD COLUMN "divider" "enum_pages_blocks_split_content_divider" DEFAULT 'line';
  ALTER TABLE "flex" ADD COLUMN "divider" "enum_flex_divider" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_service_section_intro" ADD COLUMN "divider" "enum__pages_v_blocks_service_section_intro_divider" DEFAULT 'line';
  ALTER TABLE "_pages_v_blocks_split_content" ADD COLUMN "divider" "enum__pages_v_blocks_split_content_divider" DEFAULT 'line';
  ALTER TABLE "_flex_v" ADD COLUMN "divider" "enum__flex_v_divider" DEFAULT 'none';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
  ALTER TABLE "pages_blocks_service_section_intro" DROP COLUMN "divider";
  ALTER TABLE "pages_blocks_split_content" DROP COLUMN "divider";
  ALTER TABLE "flex" DROP COLUMN "divider";
  ALTER TABLE "_pages_v_blocks_service_section_intro" DROP COLUMN "divider";
  ALTER TABLE "_pages_v_blocks_split_content" DROP COLUMN "divider";
  ALTER TABLE "_flex_v" DROP COLUMN "divider";
  DROP TYPE "public"."enum_pages_blocks_service_section_intro_divider";
  DROP TYPE "public"."enum_pages_blocks_split_content_divider";
  DROP TYPE "public"."enum_flex_divider";
  DROP TYPE "public"."enum__pages_v_blocks_service_section_intro_divider";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_divider";
  DROP TYPE "public"."enum__flex_v_divider";`);
}
