import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_children_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_header_nav_items_children_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TYPE "public"."enum_header_nav_items_item_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_header_nav_items_overview_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"icon_source" "enum_header_nav_items_children_icon_source" DEFAULT 'image',
  	"icon_image_id" integer,
  	"icon_font_awesome" varchar,
  	"icon_image_color" "enum_header_nav_items_children_icon_image_color" DEFAULT 'original',
  	"icon_scale" numeric DEFAULT 100
  );
  
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "item_type" "enum_header_nav_items_item_type" DEFAULT 'link' NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "label" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "show_overview_link" boolean DEFAULT false;
  ALTER TABLE "header_nav_items" ADD COLUMN "overview_link_type" "enum_header_nav_items_overview_link_type" DEFAULT 'reference';
  ALTER TABLE "header_nav_items" ADD COLUMN "overview_link_new_tab" boolean;
  ALTER TABLE "header_nav_items" ADD COLUMN "overview_link_url" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "overview_link_label" varchar;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_locale_idx" ON "header_nav_items_children" USING btree ("_locale");
  CREATE INDEX "header_nav_items_children_icon_icon_image_idx" ON "header_nav_items_children" USING btree ("icon_image_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "header_nav_items_children" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_nav_items_children" CASCADE;
  UPDATE "header_nav_items" SET "link_label" = COALESCE("link_label", "label", '');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "header_nav_items" DROP COLUMN "item_type";
  ALTER TABLE "header_nav_items" DROP COLUMN "label";
  ALTER TABLE "header_nav_items" DROP COLUMN "show_overview_link";
  ALTER TABLE "header_nav_items" DROP COLUMN "overview_link_type";
  ALTER TABLE "header_nav_items" DROP COLUMN "overview_link_new_tab";
  ALTER TABLE "header_nav_items" DROP COLUMN "overview_link_url";
  ALTER TABLE "header_nav_items" DROP COLUMN "overview_link_label";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_header_nav_items_children_icon_source";
  DROP TYPE "public"."enum_header_nav_items_children_icon_image_color";
  DROP TYPE "public"."enum_header_nav_items_item_type";
  DROP TYPE "public"."enum_header_nav_items_overview_link_type";`);
}
