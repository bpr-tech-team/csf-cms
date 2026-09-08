import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_service_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_split_content_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_split_content_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feature_rows_items_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('standard', 'service');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_split_content_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_rows_items_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('standard', 'service');
  CREATE TABLE "pages_blocks_service_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_service_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_service_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background_media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"theme" "enum_pages_blocks_split_content_theme" DEFAULT 'light',
  	"section_heading" varchar,
  	"highlighted_text" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum_pages_blocks_split_content_media_position" DEFAULT 'right',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_rows_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum_pages_blocks_feature_rows_items_media_position" DEFAULT 'right'
  );
  
  CREATE TABLE "pages_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_service_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_service_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background_media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"theme" "enum__pages_v_blocks_split_content_theme" DEFAULT 'light',
  	"section_heading" varchar,
  	"highlighted_text" varchar,
  	"heading" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum__pages_v_blocks_split_content_media_position" DEFAULT 'right',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_rows_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"media_position" "enum__pages_v_blocks_feature_rows_items_media_position" DEFAULT 'right',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "page_type" "enum_pages_page_type" DEFAULT 'standard';
  ALTER TABLE "_pages_v" ADD COLUMN "version_page_type" "enum__pages_v_version_page_type" DEFAULT 'standard';
  ALTER TABLE "pages_blocks_service_hero_links" ADD CONSTRAINT "pages_blocks_service_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero" ADD CONSTRAINT "pages_blocks_service_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero" ADD CONSTRAINT "pages_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_section_intro" ADD CONSTRAINT "pages_blocks_service_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content" ADD CONSTRAINT "pages_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_rows_items" ADD CONSTRAINT "pages_blocks_feature_rows_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_rows_items" ADD CONSTRAINT "pages_blocks_feature_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_rows" ADD CONSTRAINT "pages_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_links" ADD CONSTRAINT "_pages_v_blocks_service_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero" ADD CONSTRAINT "_pages_v_blocks_service_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero" ADD CONSTRAINT "_pages_v_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_section_intro" ADD CONSTRAINT "_pages_v_blocks_service_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content" ADD CONSTRAINT "_pages_v_blocks_split_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows_items" ADD CONSTRAINT "_pages_v_blocks_feature_rows_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows_items" ADD CONSTRAINT "_pages_v_blocks_feature_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows" ADD CONSTRAINT "_pages_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_service_hero_links_order_idx" ON "pages_blocks_service_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_links_parent_id_idx" ON "pages_blocks_service_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_links_locale_idx" ON "pages_blocks_service_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_service_hero_order_idx" ON "pages_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_parent_id_idx" ON "pages_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_path_idx" ON "pages_blocks_service_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_hero_locale_idx" ON "pages_blocks_service_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_service_hero_background_media_idx" ON "pages_blocks_service_hero" USING btree ("background_media_id");
  CREATE INDEX "pages_blocks_service_section_intro_order_idx" ON "pages_blocks_service_section_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_section_intro_parent_id_idx" ON "pages_blocks_service_section_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_section_intro_path_idx" ON "pages_blocks_service_section_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_section_intro_locale_idx" ON "pages_blocks_service_section_intro" USING btree ("_locale");
  CREATE INDEX "pages_blocks_split_content_order_idx" ON "pages_blocks_split_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_parent_id_idx" ON "pages_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_path_idx" ON "pages_blocks_split_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_content_locale_idx" ON "pages_blocks_split_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_split_content_media_idx" ON "pages_blocks_split_content" USING btree ("media_id");
  CREATE INDEX "pages_blocks_feature_rows_items_order_idx" ON "pages_blocks_feature_rows_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_rows_items_parent_id_idx" ON "pages_blocks_feature_rows_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_rows_items_locale_idx" ON "pages_blocks_feature_rows_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_rows_items_media_idx" ON "pages_blocks_feature_rows_items" USING btree ("media_id");
  CREATE INDEX "pages_blocks_feature_rows_order_idx" ON "pages_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_rows_parent_id_idx" ON "pages_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_rows_path_idx" ON "pages_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_rows_locale_idx" ON "pages_blocks_feature_rows" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_service_hero_links_order_idx" ON "_pages_v_blocks_service_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_links_parent_id_idx" ON "_pages_v_blocks_service_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_links_locale_idx" ON "_pages_v_blocks_service_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_service_hero_order_idx" ON "_pages_v_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_parent_id_idx" ON "_pages_v_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_path_idx" ON "_pages_v_blocks_service_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_hero_locale_idx" ON "_pages_v_blocks_service_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_service_hero_background_media_idx" ON "_pages_v_blocks_service_hero" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_service_section_intro_order_idx" ON "_pages_v_blocks_service_section_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_section_intro_parent_id_idx" ON "_pages_v_blocks_service_section_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_section_intro_path_idx" ON "_pages_v_blocks_service_section_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_section_intro_locale_idx" ON "_pages_v_blocks_service_section_intro" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_split_content_order_idx" ON "_pages_v_blocks_split_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_parent_id_idx" ON "_pages_v_blocks_split_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_path_idx" ON "_pages_v_blocks_split_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_content_locale_idx" ON "_pages_v_blocks_split_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_split_content_media_idx" ON "_pages_v_blocks_split_content" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_order_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_parent_id_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_locale_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_media_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_order_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_rows_parent_id_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_path_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_rows_locale_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_locale");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "pages_blocks_service_hero_links" CASCADE;
  DROP TABLE "pages_blocks_service_hero" CASCADE;
  DROP TABLE "pages_blocks_service_section_intro" CASCADE;
  DROP TABLE "pages_blocks_split_content" CASCADE;
  DROP TABLE "pages_blocks_feature_rows_items" CASCADE;
  DROP TABLE "pages_blocks_feature_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_service_section_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "page_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_page_type";
  DROP TYPE "public"."enum_pages_blocks_service_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_service_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_split_content_theme";
  DROP TYPE "public"."enum_pages_blocks_split_content_media_position";
  DROP TYPE "public"."enum_pages_blocks_feature_rows_items_media_position";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_theme";
  DROP TYPE "public"."enum__pages_v_blocks_split_content_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_rows_items_media_position";
  DROP TYPE "public"."enum__pages_v_version_page_type";`);
}
