import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_flex_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_flex_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_flex_media_aspect_ratio" AS ENUM('original', 'square', 'landscape', 'wide');
  CREATE TYPE "public"."enum_flex_media_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_flex_media_position" AS ENUM('topLeft', 'top', 'topRight', 'left', 'center', 'right', 'bottomLeft', 'bottom', 'bottomRight');
  CREATE TYPE "public"."enum_cols_horizontal_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_cols_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__flex_button_v_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__flex_button_v_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__flex_media_v_aspect_ratio" AS ENUM('original', 'square', 'landscape', 'wide');
  CREATE TYPE "public"."enum__flex_media_v_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum__flex_media_v_position" AS ENUM('topLeft', 'top', 'topRight', 'left', 'center', 'right', 'bottomLeft', 'bottom', 'bottomRight');
  CREATE TYPE "public"."enum__cols_v_horizontal_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__cols_v_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TABLE "flex_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "flex_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "flex_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_flex_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_flex_button_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "flex_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"aspect_ratio" "enum_flex_media_aspect_ratio" DEFAULT 'original',
  	"fit" "enum_flex_media_fit" DEFAULT 'cover',
  	"position" "enum_flex_media_position" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "flex_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"horizontal_align" "enum_cols_horizontal_align" DEFAULT 'left',
  	"vertical_align" "enum_cols_vertical_align" DEFAULT 'top'
  );
  
  CREATE TABLE "flex" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"intro" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_flex_heading_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_flex_text_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_flex_button_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__flex_button_v_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__flex_button_v_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_flex_media_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"aspect_ratio" "enum__flex_media_v_aspect_ratio" DEFAULT 'original',
  	"fit" "enum__flex_media_v_fit" DEFAULT 'cover',
  	"position" "enum__flex_media_v_position" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_flex_html_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cols_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"horizontal_align" "enum__cols_v_horizontal_align" DEFAULT 'left',
  	"vertical_align" "enum__cols_v_vertical_align" DEFAULT 'top',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_flex_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"intro" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_feature_rows_items" CASCADE;
  DROP TABLE "pages_blocks_feature_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_rows" CASCADE;
  ALTER TABLE "flex_heading" ADD CONSTRAINT "flex_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flex_text" ADD CONSTRAINT "flex_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flex_button" ADD CONSTRAINT "flex_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flex_media" ADD CONSTRAINT "flex_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "flex_media" ADD CONSTRAINT "flex_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flex_html" ADD CONSTRAINT "flex_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cols" ADD CONSTRAINT "cols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."flex"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flex" ADD CONSTRAINT "flex_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_heading_v" ADD CONSTRAINT "_flex_heading_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_text_v" ADD CONSTRAINT "_flex_text_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_button_v" ADD CONSTRAINT "_flex_button_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_media_v" ADD CONSTRAINT "_flex_media_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_flex_media_v" ADD CONSTRAINT "_flex_media_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_html_v" ADD CONSTRAINT "_flex_html_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cols_v" ADD CONSTRAINT "_cols_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_flex_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_v" ADD CONSTRAINT "_flex_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "flex_heading_order_idx" ON "flex_heading" USING btree ("_order");
  CREATE INDEX "flex_heading_parent_id_idx" ON "flex_heading" USING btree ("_parent_id");
  CREATE INDEX "flex_heading_path_idx" ON "flex_heading" USING btree ("_path");
  CREATE INDEX "flex_heading_locale_idx" ON "flex_heading" USING btree ("_locale");
  CREATE INDEX "flex_text_order_idx" ON "flex_text" USING btree ("_order");
  CREATE INDEX "flex_text_parent_id_idx" ON "flex_text" USING btree ("_parent_id");
  CREATE INDEX "flex_text_path_idx" ON "flex_text" USING btree ("_path");
  CREATE INDEX "flex_text_locale_idx" ON "flex_text" USING btree ("_locale");
  CREATE INDEX "flex_button_order_idx" ON "flex_button" USING btree ("_order");
  CREATE INDEX "flex_button_parent_id_idx" ON "flex_button" USING btree ("_parent_id");
  CREATE INDEX "flex_button_path_idx" ON "flex_button" USING btree ("_path");
  CREATE INDEX "flex_button_locale_idx" ON "flex_button" USING btree ("_locale");
  CREATE INDEX "flex_media_order_idx" ON "flex_media" USING btree ("_order");
  CREATE INDEX "flex_media_parent_id_idx" ON "flex_media" USING btree ("_parent_id");
  CREATE INDEX "flex_media_path_idx" ON "flex_media" USING btree ("_path");
  CREATE INDEX "flex_media_locale_idx" ON "flex_media" USING btree ("_locale");
  CREATE INDEX "flex_media_media_idx" ON "flex_media" USING btree ("media_id");
  CREATE INDEX "flex_html_order_idx" ON "flex_html" USING btree ("_order");
  CREATE INDEX "flex_html_parent_id_idx" ON "flex_html" USING btree ("_parent_id");
  CREATE INDEX "flex_html_path_idx" ON "flex_html" USING btree ("_path");
  CREATE INDEX "flex_html_locale_idx" ON "flex_html" USING btree ("_locale");
  CREATE INDEX "cols_order_idx" ON "cols" USING btree ("_order");
  CREATE INDEX "cols_parent_id_idx" ON "cols" USING btree ("_parent_id");
  CREATE INDEX "cols_locale_idx" ON "cols" USING btree ("_locale");
  CREATE INDEX "flex_order_idx" ON "flex" USING btree ("_order");
  CREATE INDEX "flex_parent_id_idx" ON "flex" USING btree ("_parent_id");
  CREATE INDEX "flex_path_idx" ON "flex" USING btree ("_path");
  CREATE INDEX "flex_locale_idx" ON "flex" USING btree ("_locale");
  CREATE INDEX "_flex_heading_v_order_idx" ON "_flex_heading_v" USING btree ("_order");
  CREATE INDEX "_flex_heading_v_parent_id_idx" ON "_flex_heading_v" USING btree ("_parent_id");
  CREATE INDEX "_flex_heading_v_path_idx" ON "_flex_heading_v" USING btree ("_path");
  CREATE INDEX "_flex_heading_v_locale_idx" ON "_flex_heading_v" USING btree ("_locale");
  CREATE INDEX "_flex_text_v_order_idx" ON "_flex_text_v" USING btree ("_order");
  CREATE INDEX "_flex_text_v_parent_id_idx" ON "_flex_text_v" USING btree ("_parent_id");
  CREATE INDEX "_flex_text_v_path_idx" ON "_flex_text_v" USING btree ("_path");
  CREATE INDEX "_flex_text_v_locale_idx" ON "_flex_text_v" USING btree ("_locale");
  CREATE INDEX "_flex_button_v_order_idx" ON "_flex_button_v" USING btree ("_order");
  CREATE INDEX "_flex_button_v_parent_id_idx" ON "_flex_button_v" USING btree ("_parent_id");
  CREATE INDEX "_flex_button_v_path_idx" ON "_flex_button_v" USING btree ("_path");
  CREATE INDEX "_flex_button_v_locale_idx" ON "_flex_button_v" USING btree ("_locale");
  CREATE INDEX "_flex_media_v_order_idx" ON "_flex_media_v" USING btree ("_order");
  CREATE INDEX "_flex_media_v_parent_id_idx" ON "_flex_media_v" USING btree ("_parent_id");
  CREATE INDEX "_flex_media_v_path_idx" ON "_flex_media_v" USING btree ("_path");
  CREATE INDEX "_flex_media_v_locale_idx" ON "_flex_media_v" USING btree ("_locale");
  CREATE INDEX "_flex_media_v_media_idx" ON "_flex_media_v" USING btree ("media_id");
  CREATE INDEX "_flex_html_v_order_idx" ON "_flex_html_v" USING btree ("_order");
  CREATE INDEX "_flex_html_v_parent_id_idx" ON "_flex_html_v" USING btree ("_parent_id");
  CREATE INDEX "_flex_html_v_path_idx" ON "_flex_html_v" USING btree ("_path");
  CREATE INDEX "_flex_html_v_locale_idx" ON "_flex_html_v" USING btree ("_locale");
  CREATE INDEX "_cols_v_order_idx" ON "_cols_v" USING btree ("_order");
  CREATE INDEX "_cols_v_parent_id_idx" ON "_cols_v" USING btree ("_parent_id");
  CREATE INDEX "_cols_v_locale_idx" ON "_cols_v" USING btree ("_locale");
  CREATE INDEX "_flex_v_order_idx" ON "_flex_v" USING btree ("_order");
  CREATE INDEX "_flex_v_parent_id_idx" ON "_flex_v" USING btree ("_parent_id");
  CREATE INDEX "_flex_v_path_idx" ON "_flex_v" USING btree ("_path");
  CREATE INDEX "_flex_v_locale_idx" ON "_flex_v" USING btree ("_locale");
  DROP TYPE "public"."enum_pages_blocks_feature_rows_items_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_feature_rows_items_media_position";`);
}

// Restores the schema only; removed content requires a database backup.
export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_feature_rows_items_media_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_rows_items_media_position" AS ENUM('left', 'right');
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
  
  DROP TABLE "flex_heading" CASCADE;
  DROP TABLE "flex_text" CASCADE;
  DROP TABLE "flex_button" CASCADE;
  DROP TABLE "flex_media" CASCADE;
  DROP TABLE "flex_html" CASCADE;
  DROP TABLE "cols" CASCADE;
  DROP TABLE "flex" CASCADE;
  DROP TABLE "_flex_heading_v" CASCADE;
  DROP TABLE "_flex_text_v" CASCADE;
  DROP TABLE "_flex_button_v" CASCADE;
  DROP TABLE "_flex_media_v" CASCADE;
  DROP TABLE "_flex_html_v" CASCADE;
  DROP TABLE "_cols_v" CASCADE;
  DROP TABLE "_flex_v" CASCADE;
  ALTER TABLE "pages_blocks_feature_rows_items" ADD CONSTRAINT "pages_blocks_feature_rows_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_rows_items" ADD CONSTRAINT "pages_blocks_feature_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_rows" ADD CONSTRAINT "pages_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows_items" ADD CONSTRAINT "_pages_v_blocks_feature_rows_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows_items" ADD CONSTRAINT "_pages_v_blocks_feature_rows_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_rows" ADD CONSTRAINT "_pages_v_blocks_feature_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_feature_rows_items_order_idx" ON "pages_blocks_feature_rows_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_rows_items_parent_id_idx" ON "pages_blocks_feature_rows_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_rows_items_locale_idx" ON "pages_blocks_feature_rows_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_rows_items_media_idx" ON "pages_blocks_feature_rows_items" USING btree ("media_id");
  CREATE INDEX "pages_blocks_feature_rows_order_idx" ON "pages_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_rows_parent_id_idx" ON "pages_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_rows_path_idx" ON "pages_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_rows_locale_idx" ON "pages_blocks_feature_rows" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_order_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_parent_id_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_locale_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_rows_items_media_idx" ON "_pages_v_blocks_feature_rows_items" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_order_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_rows_parent_id_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_rows_path_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_rows_locale_idx" ON "_pages_v_blocks_feature_rows" USING btree ("_locale");
  DROP TYPE "public"."enum_flex_button_link_type";
  DROP TYPE "public"."enum_flex_button_link_appearance";
  DROP TYPE "public"."enum_flex_media_aspect_ratio";
  DROP TYPE "public"."enum_flex_media_fit";
  DROP TYPE "public"."enum_flex_media_position";
  DROP TYPE "public"."enum_cols_horizontal_align";
  DROP TYPE "public"."enum_cols_vertical_align";
  DROP TYPE "public"."enum__flex_button_v_link_type";
  DROP TYPE "public"."enum__flex_button_v_link_appearance";
  DROP TYPE "public"."enum__flex_media_v_aspect_ratio";
  DROP TYPE "public"."enum__flex_media_v_fit";
  DROP TYPE "public"."enum__flex_media_v_position";
  DROP TYPE "public"."enum__cols_v_horizontal_align";
  DROP TYPE "public"."enum__cols_v_vertical_align";`);
}
