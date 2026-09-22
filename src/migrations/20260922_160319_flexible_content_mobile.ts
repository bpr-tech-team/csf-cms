import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_cols_mobile_horizontal_align" AS ENUM('inherit', 'left', 'center', 'right');
  CREATE TYPE "public"."enum_flex_mobile_column_order" AS ENUM('default', 'reverse');
  CREATE TYPE "public"."enum__cols_v_mobile_horizontal_align" AS ENUM('inherit', 'left', 'center', 'right');
  CREATE TYPE "public"."enum__flex_v_mobile_column_order" AS ENUM('default', 'reverse');
  ALTER TABLE "cols" ADD COLUMN "mobile_horizontal_align" "enum_cols_mobile_horizontal_align" DEFAULT 'inherit';
  ALTER TABLE "flex" ADD COLUMN "mobile_column_order" "enum_flex_mobile_column_order" DEFAULT 'default';
  ALTER TABLE "_cols_v" ADD COLUMN "mobile_horizontal_align" "enum__cols_v_mobile_horizontal_align" DEFAULT 'inherit';
  ALTER TABLE "_flex_v" ADD COLUMN "mobile_column_order" "enum__flex_v_mobile_column_order" DEFAULT 'default';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "cols" DROP COLUMN "mobile_horizontal_align";
  ALTER TABLE "flex" DROP COLUMN "mobile_column_order";
  ALTER TABLE "_cols_v" DROP COLUMN "mobile_horizontal_align";
  ALTER TABLE "_flex_v" DROP COLUMN "mobile_column_order";
  DROP TYPE "public"."enum_cols_mobile_horizontal_align";
  DROP TYPE "public"."enum_flex_mobile_column_order";
  DROP TYPE "public"."enum__cols_v_mobile_horizontal_align";
  DROP TYPE "public"."enum__flex_v_mobile_column_order";`);
}
