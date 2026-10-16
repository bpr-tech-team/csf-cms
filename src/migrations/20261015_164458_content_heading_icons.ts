import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_split_content_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_pages_blocks_split_content_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum_flex_heading_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_flex_heading_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum__flex_heading_v_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum__flex_heading_v_icon_image_color" AS ENUM('original', 'monochrome');
  ALTER TABLE "pages_blocks_split_content" ADD COLUMN "icon_source" "enum_pages_blocks_split_content_icon_source" DEFAULT 'fontawesome';
  ALTER TABLE "pages_blocks_split_content" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "pages_blocks_split_content" ADD COLUMN "icon_font_awesome" varchar DEFAULT 'solid/circle-plus';
  ALTER TABLE "pages_blocks_split_content" ADD COLUMN "icon_image_color" "enum_pages_blocks_split_content_icon_image_color" DEFAULT 'original';
  ALTER TABLE "pages_blocks_split_content" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "flex_heading" ADD COLUMN "icon_source" "enum_flex_heading_icon_source" DEFAULT 'fontawesome';
  ALTER TABLE "flex_heading" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "flex_heading" ADD COLUMN "icon_font_awesome" varchar DEFAULT 'solid/circle-plus';
  ALTER TABLE "flex_heading" ADD COLUMN "icon_image_color" "enum_flex_heading_icon_image_color" DEFAULT 'original';
  ALTER TABLE "flex_heading" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "_pages_v_blocks_split_content" ADD COLUMN "icon_source" "enum__pages_v_blocks_split_content_icon_source" DEFAULT 'fontawesome';
  ALTER TABLE "_pages_v_blocks_split_content" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "_pages_v_blocks_split_content" ADD COLUMN "icon_font_awesome" varchar DEFAULT 'solid/circle-plus';
  ALTER TABLE "_pages_v_blocks_split_content" ADD COLUMN "icon_image_color" "enum__pages_v_blocks_split_content_icon_image_color" DEFAULT 'original';
  ALTER TABLE "_pages_v_blocks_split_content" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "_flex_heading_v" ADD COLUMN "icon_source" "enum__flex_heading_v_icon_source" DEFAULT 'fontawesome';
  ALTER TABLE "_flex_heading_v" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "_flex_heading_v" ADD COLUMN "icon_font_awesome" varchar DEFAULT 'solid/circle-plus';
  ALTER TABLE "_flex_heading_v" ADD COLUMN "icon_image_color" "enum__flex_heading_v_icon_image_color" DEFAULT 'original';
  ALTER TABLE "_flex_heading_v" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "flex_heading" ADD CONSTRAINT "flex_heading_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_flex_heading_v" ADD CONSTRAINT "_flex_heading_v_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_split_content_icon_icon_image_idx" ON "pages_blocks_split_content" USING btree ("icon_image_id");
  CREATE INDEX "flex_heading_icon_icon_image_idx" ON "flex_heading" USING btree ("icon_image_id");
  CREATE INDEX "_pages_v_blocks_split_content_icon_icon_image_idx" ON "_pages_v_blocks_split_content" USING btree ("icon_image_id");
  CREATE INDEX "_flex_heading_v_icon_icon_image_idx" ON "_flex_heading_v" USING btree ("icon_image_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_split_content" DROP CONSTRAINT "pages_blocks_split_content_icon_image_id_media_id_fk";
  
  ALTER TABLE "flex_heading" DROP CONSTRAINT "flex_heading_icon_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_split_content" DROP CONSTRAINT "_pages_v_blocks_split_content_icon_image_id_media_id_fk";
  
  ALTER TABLE "_flex_heading_v" DROP CONSTRAINT "_flex_heading_v_icon_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_split_content_icon_icon_image_idx";
  DROP INDEX "flex_heading_icon_icon_image_idx";
  DROP INDEX "_pages_v_blocks_split_content_icon_icon_image_idx";
  DROP INDEX "_flex_heading_v_icon_icon_image_idx";
  ALTER TABLE "pages_blocks_split_content" DROP COLUMN "icon_source";
  ALTER TABLE "pages_blocks_split_content" DROP COLUMN "icon_image_id";
  ALTER TABLE "pages_blocks_split_content" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "pages_blocks_split_content" DROP COLUMN "icon_image_color";
  ALTER TABLE "pages_blocks_split_content" DROP COLUMN "icon_scale";
  ALTER TABLE "flex_heading" DROP COLUMN "icon_source";
  ALTER TABLE "flex_heading" DROP COLUMN "icon_image_id";
  ALTER TABLE "flex_heading" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "flex_heading" DROP COLUMN "icon_image_color";
  ALTER TABLE "flex_heading" DROP COLUMN "icon_scale";
  ALTER TABLE "_pages_v_blocks_split_content" DROP COLUMN "icon_source";
  ALTER TABLE "_pages_v_blocks_split_content" DROP COLUMN "icon_image_id";
  ALTER TABLE "_pages_v_blocks_split_content" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "_pages_v_blocks_split_content" DROP COLUMN "icon_image_color";
  ALTER TABLE "_pages_v_blocks_split_content" DROP COLUMN "icon_scale";
  ALTER TABLE "_flex_heading_v" DROP COLUMN "icon_source";
  ALTER TABLE "_flex_heading_v" DROP COLUMN "icon_image_id";
  ALTER TABLE "_flex_heading_v" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "_flex_heading_v" DROP COLUMN "icon_image_color";
  ALTER TABLE "_flex_heading_v" DROP COLUMN "icon_scale";
  DROP TYPE "public"."enum_pages_blocks_split_content_icon_source";
  DROP TYPE "public"."enum_pages_blocks_split_content_icon_image_color";
  DROP TYPE "public"."enum_flex_heading_icon_source";
  DROP TYPE "public"."enum_flex_heading_icon_image_color";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_icon_image_color";
  DROP TYPE "public"."enum__flex_heading_v_icon_source";
  DROP TYPE "public"."enum__flex_heading_v_icon_image_color";`);
}
