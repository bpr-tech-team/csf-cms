import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_computer_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_computer_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_computer_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_computer_hero_links_link_appearance" AS ENUM('default', 'outline');
  ALTER TYPE "public"."enum_pages_page_type" ADD VALUE 'computer';
  ALTER TYPE "public"."enum__pages_v_version_page_type" ADD VALUE 'computer';
  CREATE TABLE "pages_blocks_computer_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_computer_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_computer_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_computer_hero" (
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
  
  CREATE TABLE "pages_blocks_computer_audience_items_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_computer_audience_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_computer_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_computer_product_catalog_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_computer_catalog_category_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_computer_catalog_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_computer_catalog_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"summary" varchar
  );
  
  CREATE TABLE "pages_computer_catalog_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar
  );
  
  CREATE TABLE "pages_blocks_computer_product_catalog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"navigation_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_feature_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_media_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_media_feature_grid" (
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
  
  CREATE TABLE "pages_blocks_technology_spotlight_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_technology_spotlight_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar
  );
  
  CREATE TABLE "pages_blocks_technology_spotlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"supporting_media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_editorial_columns_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_editorial_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb
  );
  
  CREATE TABLE "pages_blocks_editorial_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_computer_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_computer_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_computer_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_computer_hero" (
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
  
  CREATE TABLE "_pages_v_blocks_computer_audience_items_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_computer_audience_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_computer_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_computer_product_catalog_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_computer_catalog_category_highlights_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_computer_catalog_specs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_computer_catalog_products_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"summary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_computer_catalog_categories_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_computer_product_catalog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"navigation_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_feature_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_feature_grid" (
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
  
  CREATE TABLE "_pages_v_blocks_technology_spotlight_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technology_spotlight_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_technology_spotlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"supporting_media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_editorial_columns_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_editorial_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_editorial_columns" (
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
  
  ALTER TABLE "pages_blocks_computer_hero_links" ADD CONSTRAINT "pages_blocks_computer_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_computer_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_hero" ADD CONSTRAINT "pages_blocks_computer_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_hero" ADD CONSTRAINT "pages_blocks_computer_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_audience_items_highlighted_texts" ADD CONSTRAINT "pages_blocks_computer_audience_items_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_computer_audience_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_audience_items" ADD CONSTRAINT "pages_blocks_computer_audience_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_computer_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_audience" ADD CONSTRAINT "pages_blocks_computer_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_product_catalog_highlighted_texts" ADD CONSTRAINT "pages_blocks_computer_product_catalog_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_computer_product_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_computer_catalog_category_highlights" ADD CONSTRAINT "pages_computer_catalog_category_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_computer_catalog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_computer_catalog_specs" ADD CONSTRAINT "pages_computer_catalog_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_computer_catalog_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_computer_catalog_products" ADD CONSTRAINT "pages_computer_catalog_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_computer_catalog_products" ADD CONSTRAINT "pages_computer_catalog_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_computer_catalog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_computer_catalog_categories" ADD CONSTRAINT "pages_computer_catalog_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_computer_product_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_product_catalog" ADD CONSTRAINT "pages_blocks_computer_product_catalog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_feature_grid_highlighted_texts" ADD CONSTRAINT "pages_blocks_media_feature_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_feature_grid_items" ADD CONSTRAINT "pages_blocks_media_feature_grid_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_feature_grid_items" ADD CONSTRAINT "pages_blocks_media_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_feature_grid" ADD CONSTRAINT "pages_blocks_media_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technology_spotlight_highlighted_texts" ADD CONSTRAINT "pages_blocks_technology_spotlight_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_technology_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technology_spotlight_logos" ADD CONSTRAINT "pages_blocks_technology_spotlight_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_technology_spotlight_logos" ADD CONSTRAINT "pages_blocks_technology_spotlight_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_technology_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_technology_spotlight" ADD CONSTRAINT "pages_blocks_technology_spotlight_supporting_media_id_media_id_fk" FOREIGN KEY ("supporting_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_technology_spotlight" ADD CONSTRAINT "pages_blocks_technology_spotlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_columns_highlighted_texts" ADD CONSTRAINT "pages_blocks_editorial_columns_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_editorial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_columns_columns" ADD CONSTRAINT "pages_blocks_editorial_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_editorial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_columns" ADD CONSTRAINT "pages_blocks_editorial_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_hero_links" ADD CONSTRAINT "_pages_v_blocks_computer_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_computer_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_hero" ADD CONSTRAINT "_pages_v_blocks_computer_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_hero" ADD CONSTRAINT "_pages_v_blocks_computer_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_audience_items_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_computer_audience_items_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_computer_audience_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_audience_items" ADD CONSTRAINT "_pages_v_blocks_computer_audience_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_computer_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_audience" ADD CONSTRAINT "_pages_v_blocks_computer_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_product_catalog_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_computer_product_catalog_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_computer_product_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_computer_catalog_category_highlights_v" ADD CONSTRAINT "_pages_computer_catalog_category_highlights_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_computer_catalog_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_computer_catalog_specs_v" ADD CONSTRAINT "_pages_computer_catalog_specs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_computer_catalog_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_computer_catalog_products_v" ADD CONSTRAINT "_pages_computer_catalog_products_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_computer_catalog_products_v" ADD CONSTRAINT "_pages_computer_catalog_products_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_computer_catalog_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_computer_catalog_categories_v" ADD CONSTRAINT "_pages_computer_catalog_categories_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_computer_product_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_product_catalog" ADD CONSTRAINT "_pages_v_blocks_computer_product_catalog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_feature_grid_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_media_feature_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_media_feature_grid_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_media_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_feature_grid" ADD CONSTRAINT "_pages_v_blocks_media_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technology_spotlight_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_technology_spotlight_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_technology_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technology_spotlight_logos" ADD CONSTRAINT "_pages_v_blocks_technology_spotlight_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technology_spotlight_logos" ADD CONSTRAINT "_pages_v_blocks_technology_spotlight_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_technology_spotlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technology_spotlight" ADD CONSTRAINT "_pages_v_blocks_technology_spotlight_supporting_media_id_media_id_fk" FOREIGN KEY ("supporting_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_technology_spotlight" ADD CONSTRAINT "_pages_v_blocks_technology_spotlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_columns_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_editorial_columns_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_editorial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_columns_columns" ADD CONSTRAINT "_pages_v_blocks_editorial_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_editorial_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_editorial_columns" ADD CONSTRAINT "_pages_v_blocks_editorial_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_computer_hero_links_order_idx" ON "pages_blocks_computer_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_hero_links_parent_id_idx" ON "pages_blocks_computer_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_hero_links_locale_idx" ON "pages_blocks_computer_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_computer_hero_order_idx" ON "pages_blocks_computer_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_hero_parent_id_idx" ON "pages_blocks_computer_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_hero_path_idx" ON "pages_blocks_computer_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_computer_hero_locale_idx" ON "pages_blocks_computer_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_computer_hero_background_media_idx" ON "pages_blocks_computer_hero" USING btree ("background_media_id");
  CREATE INDEX "pages_blocks_computer_audience_items_highlighted_texts_order_idx" ON "pages_blocks_computer_audience_items_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_audience_items_highlighted_texts_parent_id_idx" ON "pages_blocks_computer_audience_items_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_audience_items_highlighted_texts_locale_idx" ON "pages_blocks_computer_audience_items_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_computer_audience_items_order_idx" ON "pages_blocks_computer_audience_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_audience_items_parent_id_idx" ON "pages_blocks_computer_audience_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_audience_items_locale_idx" ON "pages_blocks_computer_audience_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_computer_audience_order_idx" ON "pages_blocks_computer_audience" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_audience_parent_id_idx" ON "pages_blocks_computer_audience" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_audience_path_idx" ON "pages_blocks_computer_audience" USING btree ("_path");
  CREATE INDEX "pages_blocks_computer_audience_locale_idx" ON "pages_blocks_computer_audience" USING btree ("_locale");
  CREATE INDEX "pages_blocks_computer_product_catalog_highlighted_texts_order_idx" ON "pages_blocks_computer_product_catalog_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_product_catalog_highlighted_texts_parent_id_idx" ON "pages_blocks_computer_product_catalog_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_product_catalog_highlighted_texts_locale_idx" ON "pages_blocks_computer_product_catalog_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_computer_catalog_category_highlights_order_idx" ON "pages_computer_catalog_category_highlights" USING btree ("_order");
  CREATE INDEX "pages_computer_catalog_category_highlights_parent_id_idx" ON "pages_computer_catalog_category_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_computer_catalog_category_highlights_locale_idx" ON "pages_computer_catalog_category_highlights" USING btree ("_locale");
  CREATE INDEX "pages_computer_catalog_specs_order_idx" ON "pages_computer_catalog_specs" USING btree ("_order");
  CREATE INDEX "pages_computer_catalog_specs_parent_id_idx" ON "pages_computer_catalog_specs" USING btree ("_parent_id");
  CREATE INDEX "pages_computer_catalog_specs_locale_idx" ON "pages_computer_catalog_specs" USING btree ("_locale");
  CREATE INDEX "pages_computer_catalog_products_order_idx" ON "pages_computer_catalog_products" USING btree ("_order");
  CREATE INDEX "pages_computer_catalog_products_parent_id_idx" ON "pages_computer_catalog_products" USING btree ("_parent_id");
  CREATE INDEX "pages_computer_catalog_products_locale_idx" ON "pages_computer_catalog_products" USING btree ("_locale");
  CREATE INDEX "pages_computer_catalog_products_image_idx" ON "pages_computer_catalog_products" USING btree ("image_id");
  CREATE INDEX "pages_computer_catalog_categories_order_idx" ON "pages_computer_catalog_categories" USING btree ("_order");
  CREATE INDEX "pages_computer_catalog_categories_parent_id_idx" ON "pages_computer_catalog_categories" USING btree ("_parent_id");
  CREATE INDEX "pages_computer_catalog_categories_locale_idx" ON "pages_computer_catalog_categories" USING btree ("_locale");
  CREATE INDEX "pages_blocks_computer_product_catalog_order_idx" ON "pages_blocks_computer_product_catalog" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_product_catalog_parent_id_idx" ON "pages_blocks_computer_product_catalog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_product_catalog_path_idx" ON "pages_blocks_computer_product_catalog" USING btree ("_path");
  CREATE INDEX "pages_blocks_computer_product_catalog_locale_idx" ON "pages_blocks_computer_product_catalog" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_feature_grid_highlighted_texts_order_idx" ON "pages_blocks_media_feature_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_feature_grid_highlighted_texts_parent_id_idx" ON "pages_blocks_media_feature_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_feature_grid_highlighted_texts_locale_idx" ON "pages_blocks_media_feature_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_feature_grid_items_order_idx" ON "pages_blocks_media_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_feature_grid_items_parent_id_idx" ON "pages_blocks_media_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_feature_grid_items_locale_idx" ON "pages_blocks_media_feature_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_feature_grid_items_media_idx" ON "pages_blocks_media_feature_grid_items" USING btree ("media_id");
  CREATE INDEX "pages_blocks_media_feature_grid_order_idx" ON "pages_blocks_media_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_feature_grid_parent_id_idx" ON "pages_blocks_media_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_feature_grid_path_idx" ON "pages_blocks_media_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_feature_grid_locale_idx" ON "pages_blocks_media_feature_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technology_spotlight_highlighted_texts_order_idx" ON "pages_blocks_technology_spotlight_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_technology_spotlight_highlighted_texts_parent_id_idx" ON "pages_blocks_technology_spotlight_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technology_spotlight_highlighted_texts_locale_idx" ON "pages_blocks_technology_spotlight_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technology_spotlight_logos_order_idx" ON "pages_blocks_technology_spotlight_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_technology_spotlight_logos_parent_id_idx" ON "pages_blocks_technology_spotlight_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technology_spotlight_logos_locale_idx" ON "pages_blocks_technology_spotlight_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technology_spotlight_logos_logo_idx" ON "pages_blocks_technology_spotlight_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_technology_spotlight_order_idx" ON "pages_blocks_technology_spotlight" USING btree ("_order");
  CREATE INDEX "pages_blocks_technology_spotlight_parent_id_idx" ON "pages_blocks_technology_spotlight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_technology_spotlight_path_idx" ON "pages_blocks_technology_spotlight" USING btree ("_path");
  CREATE INDEX "pages_blocks_technology_spotlight_locale_idx" ON "pages_blocks_technology_spotlight" USING btree ("_locale");
  CREATE INDEX "pages_blocks_technology_spotlight_supporting_media_idx" ON "pages_blocks_technology_spotlight" USING btree ("supporting_media_id");
  CREATE INDEX "pages_blocks_editorial_columns_highlighted_texts_order_idx" ON "pages_blocks_editorial_columns_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_editorial_columns_highlighted_texts_parent_id_idx" ON "pages_blocks_editorial_columns_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_editorial_columns_highlighted_texts_locale_idx" ON "pages_blocks_editorial_columns_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_editorial_columns_columns_order_idx" ON "pages_blocks_editorial_columns_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_editorial_columns_columns_parent_id_idx" ON "pages_blocks_editorial_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_editorial_columns_columns_locale_idx" ON "pages_blocks_editorial_columns_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_editorial_columns_order_idx" ON "pages_blocks_editorial_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_editorial_columns_parent_id_idx" ON "pages_blocks_editorial_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_editorial_columns_path_idx" ON "pages_blocks_editorial_columns" USING btree ("_path");
  CREATE INDEX "pages_blocks_editorial_columns_locale_idx" ON "pages_blocks_editorial_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_hero_links_order_idx" ON "_pages_v_blocks_computer_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_hero_links_parent_id_idx" ON "_pages_v_blocks_computer_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_hero_links_locale_idx" ON "_pages_v_blocks_computer_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_hero_order_idx" ON "_pages_v_blocks_computer_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_hero_parent_id_idx" ON "_pages_v_blocks_computer_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_hero_path_idx" ON "_pages_v_blocks_computer_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_computer_hero_locale_idx" ON "_pages_v_blocks_computer_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_hero_background_media_idx" ON "_pages_v_blocks_computer_hero" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_computer_audience_items_highlighted_texts_order_idx" ON "_pages_v_blocks_computer_audience_items_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_audience_items_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_computer_audience_items_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_audience_items_highlighted_texts_locale_idx" ON "_pages_v_blocks_computer_audience_items_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_audience_items_order_idx" ON "_pages_v_blocks_computer_audience_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_audience_items_parent_id_idx" ON "_pages_v_blocks_computer_audience_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_audience_items_locale_idx" ON "_pages_v_blocks_computer_audience_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_audience_order_idx" ON "_pages_v_blocks_computer_audience" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_audience_parent_id_idx" ON "_pages_v_blocks_computer_audience" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_audience_path_idx" ON "_pages_v_blocks_computer_audience" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_computer_audience_locale_idx" ON "_pages_v_blocks_computer_audience" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_product_catalog_highlighted_texts_order_idx" ON "_pages_v_blocks_computer_product_catalog_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_product_catalog_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_computer_product_catalog_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_product_catalog_highlighted_texts_locale_idx" ON "_pages_v_blocks_computer_product_catalog_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_computer_catalog_category_highlights_v_order_idx" ON "_pages_computer_catalog_category_highlights_v" USING btree ("_order");
  CREATE INDEX "_pages_computer_catalog_category_highlights_v_parent_id_idx" ON "_pages_computer_catalog_category_highlights_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_computer_catalog_category_highlights_v_locale_idx" ON "_pages_computer_catalog_category_highlights_v" USING btree ("_locale");
  CREATE INDEX "_pages_computer_catalog_specs_v_order_idx" ON "_pages_computer_catalog_specs_v" USING btree ("_order");
  CREATE INDEX "_pages_computer_catalog_specs_v_parent_id_idx" ON "_pages_computer_catalog_specs_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_computer_catalog_specs_v_locale_idx" ON "_pages_computer_catalog_specs_v" USING btree ("_locale");
  CREATE INDEX "_pages_computer_catalog_products_v_order_idx" ON "_pages_computer_catalog_products_v" USING btree ("_order");
  CREATE INDEX "_pages_computer_catalog_products_v_parent_id_idx" ON "_pages_computer_catalog_products_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_computer_catalog_products_v_locale_idx" ON "_pages_computer_catalog_products_v" USING btree ("_locale");
  CREATE INDEX "_pages_computer_catalog_products_v_image_idx" ON "_pages_computer_catalog_products_v" USING btree ("image_id");
  CREATE INDEX "_pages_computer_catalog_categories_v_order_idx" ON "_pages_computer_catalog_categories_v" USING btree ("_order");
  CREATE INDEX "_pages_computer_catalog_categories_v_parent_id_idx" ON "_pages_computer_catalog_categories_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_computer_catalog_categories_v_locale_idx" ON "_pages_computer_catalog_categories_v" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_product_catalog_order_idx" ON "_pages_v_blocks_computer_product_catalog" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_product_catalog_parent_id_idx" ON "_pages_v_blocks_computer_product_catalog" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_product_catalog_path_idx" ON "_pages_v_blocks_computer_product_catalog" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_computer_product_catalog_locale_idx" ON "_pages_v_blocks_computer_product_catalog" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_highlighted_texts_order_idx" ON "_pages_v_blocks_media_feature_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_media_feature_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_highlighted_texts_locale_idx" ON "_pages_v_blocks_media_feature_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_items_order_idx" ON "_pages_v_blocks_media_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_items_parent_id_idx" ON "_pages_v_blocks_media_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_items_locale_idx" ON "_pages_v_blocks_media_feature_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_items_media_idx" ON "_pages_v_blocks_media_feature_grid_items" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_order_idx" ON "_pages_v_blocks_media_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_parent_id_idx" ON "_pages_v_blocks_media_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_path_idx" ON "_pages_v_blocks_media_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_feature_grid_locale_idx" ON "_pages_v_blocks_media_feature_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_highlighted_texts_order_idx" ON "_pages_v_blocks_technology_spotlight_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_technology_spotlight_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_highlighted_texts_locale_idx" ON "_pages_v_blocks_technology_spotlight_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_logos_order_idx" ON "_pages_v_blocks_technology_spotlight_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_logos_parent_id_idx" ON "_pages_v_blocks_technology_spotlight_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_logos_locale_idx" ON "_pages_v_blocks_technology_spotlight_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_logos_logo_idx" ON "_pages_v_blocks_technology_spotlight_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_order_idx" ON "_pages_v_blocks_technology_spotlight" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_parent_id_idx" ON "_pages_v_blocks_technology_spotlight" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_path_idx" ON "_pages_v_blocks_technology_spotlight" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_locale_idx" ON "_pages_v_blocks_technology_spotlight" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_technology_spotlight_supporting_media_idx" ON "_pages_v_blocks_technology_spotlight" USING btree ("supporting_media_id");
  CREATE INDEX "_pages_v_blocks_editorial_columns_highlighted_texts_order_idx" ON "_pages_v_blocks_editorial_columns_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_editorial_columns_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_editorial_columns_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_editorial_columns_highlighted_texts_locale_idx" ON "_pages_v_blocks_editorial_columns_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_editorial_columns_columns_order_idx" ON "_pages_v_blocks_editorial_columns_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_editorial_columns_columns_parent_id_idx" ON "_pages_v_blocks_editorial_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_editorial_columns_columns_locale_idx" ON "_pages_v_blocks_editorial_columns_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_editorial_columns_order_idx" ON "_pages_v_blocks_editorial_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_editorial_columns_parent_id_idx" ON "_pages_v_blocks_editorial_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_editorial_columns_path_idx" ON "_pages_v_blocks_editorial_columns" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_editorial_columns_locale_idx" ON "_pages_v_blocks_editorial_columns" USING btree ("_locale");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   UPDATE "pages" SET "page_type" = 'standard' WHERE "page_type" = 'computer';
  UPDATE "_pages_v" SET "version_page_type" = 'standard' WHERE "version_page_type" = 'computer';
  DROP TABLE "pages_blocks_computer_hero_links" CASCADE;
  DROP TABLE "pages_blocks_computer_hero" CASCADE;
  DROP TABLE "pages_blocks_computer_audience_items_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_computer_audience_items" CASCADE;
  DROP TABLE "pages_blocks_computer_audience" CASCADE;
  DROP TABLE "pages_blocks_computer_product_catalog_highlighted_texts" CASCADE;
  DROP TABLE "pages_computer_catalog_category_highlights" CASCADE;
  DROP TABLE "pages_computer_catalog_specs" CASCADE;
  DROP TABLE "pages_computer_catalog_products" CASCADE;
  DROP TABLE "pages_computer_catalog_categories" CASCADE;
  DROP TABLE "pages_blocks_computer_product_catalog" CASCADE;
  DROP TABLE "pages_blocks_media_feature_grid_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_media_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_media_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_technology_spotlight_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_technology_spotlight_logos" CASCADE;
  DROP TABLE "pages_blocks_technology_spotlight" CASCADE;
  DROP TABLE "pages_blocks_editorial_columns_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_editorial_columns_columns" CASCADE;
  DROP TABLE "pages_blocks_editorial_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_audience_items_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_audience_items" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_audience" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_product_catalog_highlighted_texts" CASCADE;
  DROP TABLE "_pages_computer_catalog_category_highlights_v" CASCADE;
  DROP TABLE "_pages_computer_catalog_specs_v" CASCADE;
  DROP TABLE "_pages_computer_catalog_products_v" CASCADE;
  DROP TABLE "_pages_computer_catalog_categories_v" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_product_catalog" CASCADE;
  DROP TABLE "_pages_v_blocks_media_feature_grid_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_media_feature_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_media_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_technology_spotlight_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_technology_spotlight_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_technology_spotlight" CASCADE;
  DROP TABLE "_pages_v_blocks_editorial_columns_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_editorial_columns_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_editorial_columns" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum_pages_page_type";
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('standard', 'service');
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DEFAULT 'standard'::"public"."enum_pages_page_type";
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE "public"."enum_pages_page_type" USING "page_type"::"public"."enum_pages_page_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum__pages_v_version_page_type";
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('standard', 'service');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DEFAULT 'standard'::"public"."enum__pages_v_version_page_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE "public"."enum__pages_v_version_page_type" USING "version_page_type"::"public"."enum__pages_v_version_page_type";
  DROP TYPE "public"."enum_pages_blocks_computer_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_computer_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_computer_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_computer_hero_links_link_appearance";`);
}
