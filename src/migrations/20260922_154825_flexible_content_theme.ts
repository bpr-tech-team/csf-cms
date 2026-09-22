import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_flex_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__flex_v_theme" AS ENUM('light', 'dark');
  ALTER TABLE "flex" ADD COLUMN "theme" "enum_flex_theme" DEFAULT 'light';
  ALTER TABLE "_flex_v" ADD COLUMN "theme" "enum__flex_v_theme" DEFAULT 'light';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "flex" DROP COLUMN "theme";
  ALTER TABLE "_flex_v" DROP COLUMN "theme";
  DROP TYPE "public"."enum_flex_theme";
  DROP TYPE "public"."enum__flex_v_theme";`);
}
