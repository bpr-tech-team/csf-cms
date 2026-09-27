import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

// Replaces legacy icon uploads without copying their selections. Media files are untouched.
export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_homepage_hero_quick_links_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_pages_blocks_homepage_hero_quick_links_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_items_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_items_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum_pages_blocks_products_grid_items_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_pages_blocks_products_grid_items_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum_pages_branch_info_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_pages_branch_info_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum__pages_v_blocks_homepage_hero_quick_links_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum__pages_v_blocks_homepage_hero_quick_links_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_items_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_items_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum__pages_v_blocks_products_grid_items_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum__pages_v_blocks_products_grid_items_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum__pages_v_version_branch_info_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum__pages_v_version_branch_info_icon_image_color" AS ENUM('original', 'monochrome');
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP CONSTRAINT "pages_blocks_homepage_hero_quick_links_icon_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_services_grid_items" DROP CONSTRAINT "pages_blocks_services_grid_items_icon_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_products_grid_items" DROP CONSTRAINT "pages_blocks_products_grid_items_icon_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_branch_info_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP CONSTRAINT "_pages_v_blocks_services_grid_items_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP CONSTRAINT "_pages_v_blocks_products_grid_items_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_branch_info_icon_id_media_id_fk";
  
  DROP INDEX "pages_blocks_homepage_hero_quick_links_icon_idx";
  DROP INDEX "pages_blocks_services_grid_items_icon_idx";
  DROP INDEX "pages_blocks_products_grid_items_icon_idx";
  DROP INDEX "pages_branch_info_branch_info_icon_idx";
  DROP INDEX "_pages_v_blocks_homepage_hero_quick_links_icon_idx";
  DROP INDEX "_pages_v_blocks_services_grid_items_icon_idx";
  DROP INDEX "_pages_v_blocks_products_grid_items_icon_idx";
  DROP INDEX "_pages_v_version_branch_info_version_branch_info_icon_idx";
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD COLUMN "icon_source" "enum_pages_blocks_homepage_hero_quick_links_icon_source" DEFAULT 'image';
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD COLUMN "icon_font_awesome" varchar;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD COLUMN "icon_image_color" "enum_pages_blocks_homepage_hero_quick_links_icon_image_color" DEFAULT 'original';
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "pages_blocks_services_grid_items" ADD COLUMN "icon_source" "enum_pages_blocks_services_grid_items_icon_source" DEFAULT 'image';
  ALTER TABLE "pages_blocks_services_grid_items" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "pages_blocks_services_grid_items" ADD COLUMN "icon_font_awesome" varchar;
  ALTER TABLE "pages_blocks_services_grid_items" ADD COLUMN "icon_image_color" "enum_pages_blocks_services_grid_items_icon_image_color" DEFAULT 'original';
  ALTER TABLE "pages_blocks_services_grid_items" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "pages_blocks_products_grid_items" ADD COLUMN "icon_source" "enum_pages_blocks_products_grid_items_icon_source" DEFAULT 'image';
  ALTER TABLE "pages_blocks_products_grid_items" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "pages_blocks_products_grid_items" ADD COLUMN "icon_font_awesome" varchar;
  ALTER TABLE "pages_blocks_products_grid_items" ADD COLUMN "icon_image_color" "enum_pages_blocks_products_grid_items_icon_image_color" DEFAULT 'original';
  ALTER TABLE "pages_blocks_products_grid_items" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "pages" ADD COLUMN "branch_info_icon_source" "enum_pages_branch_info_icon_source" DEFAULT 'image';
  ALTER TABLE "pages" ADD COLUMN "branch_info_icon_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "branch_info_icon_font_awesome" varchar;
  ALTER TABLE "pages" ADD COLUMN "branch_info_icon_image_color" "enum_pages_branch_info_icon_image_color" DEFAULT 'original';
  ALTER TABLE "pages" ADD COLUMN "branch_info_icon_scale" numeric DEFAULT 100;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD COLUMN "icon_source" "enum__pages_v_blocks_homepage_hero_quick_links_icon_source" DEFAULT 'image';
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD COLUMN "icon_font_awesome" varchar;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD COLUMN "icon_image_color" "enum__pages_v_blocks_homepage_hero_quick_links_icon_image_color" DEFAULT 'original';
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD COLUMN "icon_source" "enum__pages_v_blocks_services_grid_items_icon_source" DEFAULT 'image';
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD COLUMN "icon_font_awesome" varchar;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD COLUMN "icon_image_color" "enum__pages_v_blocks_services_grid_items_icon_image_color" DEFAULT 'original';
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD COLUMN "icon_source" "enum__pages_v_blocks_products_grid_items_icon_source" DEFAULT 'image';
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD COLUMN "icon_font_awesome" varchar;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD COLUMN "icon_image_color" "enum__pages_v_blocks_products_grid_items_icon_image_color" DEFAULT 'original';
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_icon_source" "enum__pages_v_version_branch_info_icon_source" DEFAULT 'image';
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_icon_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_icon_font_awesome" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_icon_image_color" "enum__pages_v_version_branch_info_icon_image_color" DEFAULT 'original';
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_icon_scale" numeric DEFAULT 100;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD CONSTRAINT "pages_blocks_homepage_hero_quick_links_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_items" ADD CONSTRAINT "pages_blocks_services_grid_items_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_grid_items" ADD CONSTRAINT "pages_blocks_products_grid_items_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_branch_info_icon_image_id_media_id_fk" FOREIGN KEY ("branch_info_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD CONSTRAINT "_pages_v_blocks_services_grid_items_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD CONSTRAINT "_pages_v_blocks_products_grid_items_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_branch_info_icon_image_id_media_id_fk" FOREIGN KEY ("version_branch_info_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_icon_icon_image_idx" ON "pages_blocks_homepage_hero_quick_links" USING btree ("icon_image_id");
  CREATE INDEX "pages_blocks_services_grid_items_icon_icon_image_idx" ON "pages_blocks_services_grid_items" USING btree ("icon_image_id");
  CREATE INDEX "pages_blocks_products_grid_items_icon_icon_image_idx" ON "pages_blocks_products_grid_items" USING btree ("icon_image_id");
  CREATE INDEX "pages_branch_info_icon_branch_info_icon_image_idx" ON "pages" USING btree ("branch_info_icon_image_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_icon_icon_imag_idx" ON "_pages_v_blocks_homepage_hero_quick_links" USING btree ("icon_image_id");
  CREATE INDEX "_pages_v_blocks_services_grid_items_icon_icon_image_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("icon_image_id");
  CREATE INDEX "_pages_v_blocks_products_grid_items_icon_icon_image_idx" ON "_pages_v_blocks_products_grid_items" USING btree ("icon_image_id");
  CREATE INDEX "_pages_v_version_branch_info_icon_version_branch_info_ic_idx" ON "_pages_v" USING btree ("version_branch_info_icon_image_id");
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP COLUMN "icon_id";
  ALTER TABLE "pages_blocks_services_grid_items" DROP COLUMN "icon_id";
  ALTER TABLE "pages_blocks_products_grid_items" DROP COLUMN "icon_id";
  ALTER TABLE "pages" DROP COLUMN "branch_info_icon_id";
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_icon_id";
`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP CONSTRAINT "pages_blocks_homepage_hero_quick_links_icon_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_services_grid_items" DROP CONSTRAINT "pages_blocks_services_grid_items_icon_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_products_grid_items" DROP CONSTRAINT "pages_blocks_products_grid_items_icon_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_branch_info_icon_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_icon_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP CONSTRAINT "_pages_v_blocks_services_grid_items_icon_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP CONSTRAINT "_pages_v_blocks_products_grid_items_icon_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_branch_info_icon_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_homepage_hero_quick_links_icon_icon_image_idx";
  DROP INDEX "pages_blocks_services_grid_items_icon_icon_image_idx";
  DROP INDEX "pages_blocks_products_grid_items_icon_icon_image_idx";
  DROP INDEX "pages_branch_info_icon_branch_info_icon_image_idx";
  DROP INDEX "_pages_v_blocks_homepage_hero_quick_links_icon_icon_imag_idx";
  DROP INDEX "_pages_v_blocks_services_grid_items_icon_icon_image_idx";
  DROP INDEX "_pages_v_blocks_products_grid_items_icon_icon_image_idx";
  DROP INDEX "_pages_v_version_branch_info_icon_version_branch_info_ic_idx";
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_services_grid_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_products_grid_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages" ADD COLUMN "branch_info_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_icon_id" integer;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD CONSTRAINT "pages_blocks_homepage_hero_quick_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_items" ADD CONSTRAINT "pages_blocks_services_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_grid_items" ADD CONSTRAINT "pages_blocks_products_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_branch_info_icon_id_media_id_fk" FOREIGN KEY ("branch_info_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD CONSTRAINT "_pages_v_blocks_services_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD CONSTRAINT "_pages_v_blocks_products_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_branch_info_icon_id_media_id_fk" FOREIGN KEY ("version_branch_info_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_icon_idx" ON "pages_blocks_homepage_hero_quick_links" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_services_grid_items_icon_idx" ON "pages_blocks_services_grid_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_products_grid_items_icon_idx" ON "pages_blocks_products_grid_items" USING btree ("icon_id");
  CREATE INDEX "pages_branch_info_branch_info_icon_idx" ON "pages" USING btree ("branch_info_icon_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_icon_idx" ON "_pages_v_blocks_homepage_hero_quick_links" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_services_grid_items_icon_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_products_grid_items_icon_idx" ON "_pages_v_blocks_products_grid_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_version_branch_info_version_branch_info_icon_idx" ON "_pages_v" USING btree ("version_branch_info_icon_id");
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP COLUMN "icon_source";
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP COLUMN "icon_image_id";
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP COLUMN "icon_image_color";
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" DROP COLUMN "icon_scale";
  ALTER TABLE "pages_blocks_services_grid_items" DROP COLUMN "icon_source";
  ALTER TABLE "pages_blocks_services_grid_items" DROP COLUMN "icon_image_id";
  ALTER TABLE "pages_blocks_services_grid_items" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "pages_blocks_services_grid_items" DROP COLUMN "icon_image_color";
  ALTER TABLE "pages_blocks_services_grid_items" DROP COLUMN "icon_scale";
  ALTER TABLE "pages_blocks_products_grid_items" DROP COLUMN "icon_source";
  ALTER TABLE "pages_blocks_products_grid_items" DROP COLUMN "icon_image_id";
  ALTER TABLE "pages_blocks_products_grid_items" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "pages_blocks_products_grid_items" DROP COLUMN "icon_image_color";
  ALTER TABLE "pages_blocks_products_grid_items" DROP COLUMN "icon_scale";
  ALTER TABLE "pages" DROP COLUMN "branch_info_icon_source";
  ALTER TABLE "pages" DROP COLUMN "branch_info_icon_image_id";
  ALTER TABLE "pages" DROP COLUMN "branch_info_icon_font_awesome";
  ALTER TABLE "pages" DROP COLUMN "branch_info_icon_image_color";
  ALTER TABLE "pages" DROP COLUMN "branch_info_icon_scale";
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP COLUMN "icon_source";
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP COLUMN "icon_image_id";
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP COLUMN "icon_image_color";
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" DROP COLUMN "icon_scale";
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP COLUMN "icon_source";
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP COLUMN "icon_image_id";
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP COLUMN "icon_image_color";
  ALTER TABLE "_pages_v_blocks_services_grid_items" DROP COLUMN "icon_scale";
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP COLUMN "icon_source";
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP COLUMN "icon_image_id";
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP COLUMN "icon_image_color";
  ALTER TABLE "_pages_v_blocks_products_grid_items" DROP COLUMN "icon_scale";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_icon_source";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_icon_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_icon_font_awesome";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_icon_image_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_icon_scale";
  DROP TYPE "public"."enum_pages_blocks_homepage_hero_quick_links_icon_source";
  DROP TYPE "public"."enum_pages_blocks_homepage_hero_quick_links_icon_image_color";
  DROP TYPE "public"."enum_pages_blocks_services_grid_items_icon_source";
  DROP TYPE "public"."enum_pages_blocks_services_grid_items_icon_image_color";
  DROP TYPE "public"."enum_pages_blocks_products_grid_items_icon_source";
  DROP TYPE "public"."enum_pages_blocks_products_grid_items_icon_image_color";
  DROP TYPE "public"."enum_pages_branch_info_icon_source";
  DROP TYPE "public"."enum_pages_branch_info_icon_image_color";
  DROP TYPE "public"."enum__pages_v_blocks_homepage_hero_quick_links_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_homepage_hero_quick_links_icon_image_color";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_items_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_items_icon_image_color";
  DROP TYPE "public"."enum__pages_v_blocks_products_grid_items_icon_source";
  DROP TYPE "public"."enum__pages_v_blocks_products_grid_items_icon_image_color";
  DROP TYPE "public"."enum__pages_v_version_branch_info_icon_source";
  DROP TYPE "public"."enum__pages_v_version_branch_info_icon_image_color";`);
}
