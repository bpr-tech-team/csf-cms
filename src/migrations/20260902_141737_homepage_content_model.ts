import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_slides_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_slides_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_hero_quick_links_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_form_block_appearance" AS ENUM('default', 'homepageDark');
  CREATE TYPE "public"."enum_pages_blocks_services_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_products_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_centered_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_centered_cta_link_appearance" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_slides_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_quick_links_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_appearance" AS ENUM('default', 'homepageDark');
  CREATE TYPE "public"."enum__pages_v_blocks_services_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_products_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_cta_link_appearance" AS ENUM('default');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'homepage';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'homepage';
  CREATE TABLE "pages_hero_slides_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_slides_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_slides_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_hero_quick_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_quick_links_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_hero_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum_pages_blocks_services_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_products_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum_pages_blocks_products_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_products_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"duration" numeric DEFAULT 40,
  	"pause_on_hover" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_centered_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"link_type" "enum_pages_blocks_centered_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_centered_cta_link_appearance" DEFAULT 'default',
  	"background_media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_slides_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_slides_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_slides_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_quick_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_quick_links_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum__pages_v_blocks_services_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_strip_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"value" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_products_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_type" "enum__pages_v_blocks_products_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_products_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"name" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"duration" numeric DEFAULT 40,
  	"pause_on_hover" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_centered_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"link_type" "enum__pages_v_blocks_centered_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_centered_cta_link_appearance" DEFAULT 'default',
  	"background_media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"highlighted_text" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "appearance" "enum_pages_blocks_form_block_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_autoplay" boolean DEFAULT true;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_autoplay_interval" numeric DEFAULT 7000;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_intro_eyebrow" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_intro_heading" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_intro_highlighted_text" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_intro_description" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "appearance" "enum__pages_v_blocks_form_block_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_autoplay" boolean DEFAULT true;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_autoplay_interval" numeric DEFAULT 7000;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_intro_eyebrow" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_intro_heading" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_intro_highlighted_text" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_intro_description" varchar;
  ALTER TABLE "pages_hero_slides_links" ADD CONSTRAINT "pages_hero_slides_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_slides" ADD CONSTRAINT "pages_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_quick_links_links" ADD CONSTRAINT "pages_hero_quick_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_quick_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_quick_links" ADD CONSTRAINT "pages_hero_quick_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_quick_links" ADD CONSTRAINT "pages_hero_quick_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_quick_links" ADD CONSTRAINT "pages_hero_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_items" ADD CONSTRAINT "pages_blocks_services_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_items" ADD CONSTRAINT "pages_blocks_services_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_strip_items" ADD CONSTRAINT "pages_blocks_metrics_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metrics_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_strip" ADD CONSTRAINT "pages_blocks_metrics_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_grid_items" ADD CONSTRAINT "pages_blocks_products_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_grid_items" ADD CONSTRAINT "pages_blocks_products_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_grid_items" ADD CONSTRAINT "pages_blocks_products_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_grid" ADD CONSTRAINT "pages_blocks_products_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_marquee_items" ADD CONSTRAINT "pages_blocks_logo_marquee_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_marquee_items" ADD CONSTRAINT "pages_blocks_logo_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_marquee" ADD CONSTRAINT "pages_blocks_logo_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_centered_cta" ADD CONSTRAINT "pages_blocks_centered_cta_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_centered_cta" ADD CONSTRAINT "pages_blocks_centered_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_items" ADD CONSTRAINT "pages_blocks_process_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides_links" ADD CONSTRAINT "_pages_v_version_hero_slides_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_slides" ADD CONSTRAINT "_pages_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_quick_links_links" ADD CONSTRAINT "_pages_v_version_hero_quick_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_quick_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_quick_links" ADD CONSTRAINT "_pages_v_version_hero_quick_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_quick_links" ADD CONSTRAINT "_pages_v_version_hero_quick_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_quick_links" ADD CONSTRAINT "_pages_v_version_hero_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD CONSTRAINT "_pages_v_blocks_services_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD CONSTRAINT "_pages_v_blocks_services_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_strip_items" ADD CONSTRAINT "_pages_v_blocks_metrics_strip_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_metrics_strip"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_strip" ADD CONSTRAINT "_pages_v_blocks_metrics_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD CONSTRAINT "_pages_v_blocks_products_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD CONSTRAINT "_pages_v_blocks_products_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_grid_items" ADD CONSTRAINT "_pages_v_blocks_products_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_grid" ADD CONSTRAINT "_pages_v_blocks_products_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_marquee_items" ADD CONSTRAINT "_pages_v_blocks_logo_marquee_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_marquee_items" ADD CONSTRAINT "_pages_v_blocks_logo_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_marquee" ADD CONSTRAINT "_pages_v_blocks_logo_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_centered_cta" ADD CONSTRAINT "_pages_v_blocks_centered_cta_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_centered_cta" ADD CONSTRAINT "_pages_v_blocks_centered_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_items" ADD CONSTRAINT "_pages_v_blocks_process_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_slides_links_order_idx" ON "pages_hero_slides_links" USING btree ("_order");
  CREATE INDEX "pages_hero_slides_links_parent_id_idx" ON "pages_hero_slides_links" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_slides_links_locale_idx" ON "pages_hero_slides_links" USING btree ("_locale");
  CREATE INDEX "pages_hero_slides_order_idx" ON "pages_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_hero_slides_parent_id_idx" ON "pages_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_slides_locale_idx" ON "pages_hero_slides" USING btree ("_locale");
  CREATE INDEX "pages_hero_quick_links_links_order_idx" ON "pages_hero_quick_links_links" USING btree ("_order");
  CREATE INDEX "pages_hero_quick_links_links_parent_id_idx" ON "pages_hero_quick_links_links" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_quick_links_links_locale_idx" ON "pages_hero_quick_links_links" USING btree ("_locale");
  CREATE INDEX "pages_hero_quick_links_order_idx" ON "pages_hero_quick_links" USING btree ("_order");
  CREATE INDEX "pages_hero_quick_links_parent_id_idx" ON "pages_hero_quick_links" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_quick_links_locale_idx" ON "pages_hero_quick_links" USING btree ("_locale");
  CREATE INDEX "pages_hero_quick_links_image_idx" ON "pages_hero_quick_links" USING btree ("image_id");
  CREATE INDEX "pages_hero_quick_links_icon_idx" ON "pages_hero_quick_links" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_services_grid_items_order_idx" ON "pages_blocks_services_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_items_parent_id_idx" ON "pages_blocks_services_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_items_locale_idx" ON "pages_blocks_services_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_grid_items_icon_idx" ON "pages_blocks_services_grid_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_grid_locale_idx" ON "pages_blocks_services_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_metrics_strip_items_order_idx" ON "pages_blocks_metrics_strip_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_strip_items_parent_id_idx" ON "pages_blocks_metrics_strip_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_strip_items_locale_idx" ON "pages_blocks_metrics_strip_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_metrics_strip_order_idx" ON "pages_blocks_metrics_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_strip_parent_id_idx" ON "pages_blocks_metrics_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_strip_path_idx" ON "pages_blocks_metrics_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_metrics_strip_locale_idx" ON "pages_blocks_metrics_strip" USING btree ("_locale");
  CREATE INDEX "pages_blocks_products_grid_items_order_idx" ON "pages_blocks_products_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_products_grid_items_parent_id_idx" ON "pages_blocks_products_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_products_grid_items_locale_idx" ON "pages_blocks_products_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_products_grid_items_image_idx" ON "pages_blocks_products_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_products_grid_items_icon_idx" ON "pages_blocks_products_grid_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_products_grid_order_idx" ON "pages_blocks_products_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_products_grid_parent_id_idx" ON "pages_blocks_products_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_products_grid_path_idx" ON "pages_blocks_products_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_products_grid_locale_idx" ON "pages_blocks_products_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_marquee_items_order_idx" ON "pages_blocks_logo_marquee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_marquee_items_parent_id_idx" ON "pages_blocks_logo_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_marquee_items_locale_idx" ON "pages_blocks_logo_marquee_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_marquee_items_logo_idx" ON "pages_blocks_logo_marquee_items" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_marquee_order_idx" ON "pages_blocks_logo_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_marquee_parent_id_idx" ON "pages_blocks_logo_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_marquee_path_idx" ON "pages_blocks_logo_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_marquee_locale_idx" ON "pages_blocks_logo_marquee" USING btree ("_locale");
  CREATE INDEX "pages_blocks_centered_cta_order_idx" ON "pages_blocks_centered_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_centered_cta_parent_id_idx" ON "pages_blocks_centered_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_centered_cta_path_idx" ON "pages_blocks_centered_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_centered_cta_locale_idx" ON "pages_blocks_centered_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_centered_cta_background_media_idx" ON "pages_blocks_centered_cta" USING btree ("background_media_id");
  CREATE INDEX "pages_blocks_process_steps_items_order_idx" ON "pages_blocks_process_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_items_parent_id_idx" ON "pages_blocks_process_steps_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_items_locale_idx" ON "pages_blocks_process_steps_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_locale_idx" ON "pages_blocks_process_steps" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_hero_slides_links_order_idx" ON "_pages_v_version_hero_slides_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_slides_links_parent_id_idx" ON "_pages_v_version_hero_slides_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_slides_links_locale_idx" ON "_pages_v_version_hero_slides_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_hero_slides_order_idx" ON "_pages_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_slides_parent_id_idx" ON "_pages_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_slides_locale_idx" ON "_pages_v_version_hero_slides" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_hero_quick_links_links_order_idx" ON "_pages_v_version_hero_quick_links_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_quick_links_links_parent_id_idx" ON "_pages_v_version_hero_quick_links_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_quick_links_links_locale_idx" ON "_pages_v_version_hero_quick_links_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_hero_quick_links_order_idx" ON "_pages_v_version_hero_quick_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_quick_links_parent_id_idx" ON "_pages_v_version_hero_quick_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_quick_links_locale_idx" ON "_pages_v_version_hero_quick_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_hero_quick_links_image_idx" ON "_pages_v_version_hero_quick_links" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_hero_quick_links_icon_idx" ON "_pages_v_version_hero_quick_links" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_services_grid_items_order_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_items_parent_id_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_items_locale_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_grid_items_icon_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_grid_locale_idx" ON "_pages_v_blocks_services_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_metrics_strip_items_order_idx" ON "_pages_v_blocks_metrics_strip_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_strip_items_parent_id_idx" ON "_pages_v_blocks_metrics_strip_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_strip_items_locale_idx" ON "_pages_v_blocks_metrics_strip_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_metrics_strip_order_idx" ON "_pages_v_blocks_metrics_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_strip_parent_id_idx" ON "_pages_v_blocks_metrics_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_strip_path_idx" ON "_pages_v_blocks_metrics_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_metrics_strip_locale_idx" ON "_pages_v_blocks_metrics_strip" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_products_grid_items_order_idx" ON "_pages_v_blocks_products_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_products_grid_items_parent_id_idx" ON "_pages_v_blocks_products_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_products_grid_items_locale_idx" ON "_pages_v_blocks_products_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_products_grid_items_image_idx" ON "_pages_v_blocks_products_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_products_grid_items_icon_idx" ON "_pages_v_blocks_products_grid_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_products_grid_order_idx" ON "_pages_v_blocks_products_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_products_grid_parent_id_idx" ON "_pages_v_blocks_products_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_products_grid_path_idx" ON "_pages_v_blocks_products_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_products_grid_locale_idx" ON "_pages_v_blocks_products_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_marquee_items_order_idx" ON "_pages_v_blocks_logo_marquee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_marquee_items_parent_id_idx" ON "_pages_v_blocks_logo_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_items_locale_idx" ON "_pages_v_blocks_logo_marquee_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_marquee_items_logo_idx" ON "_pages_v_blocks_logo_marquee_items" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_order_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_marquee_parent_id_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_marquee_path_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_marquee_locale_idx" ON "_pages_v_blocks_logo_marquee" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_centered_cta_order_idx" ON "_pages_v_blocks_centered_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_centered_cta_parent_id_idx" ON "_pages_v_blocks_centered_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_centered_cta_path_idx" ON "_pages_v_blocks_centered_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_centered_cta_locale_idx" ON "_pages_v_blocks_centered_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_centered_cta_background_media_idx" ON "_pages_v_blocks_centered_cta" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_process_steps_items_order_idx" ON "_pages_v_blocks_process_steps_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_items_parent_id_idx" ON "_pages_v_blocks_process_steps_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_items_locale_idx" ON "_pages_v_blocks_process_steps_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_locale_idx" ON "_pages_v_blocks_process_steps" USING btree ("_locale");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "pages_hero_slides_links" CASCADE;
  DROP TABLE "pages_hero_slides" CASCADE;
  DROP TABLE "pages_hero_quick_links_links" CASCADE;
  DROP TABLE "pages_hero_quick_links" CASCADE;
  DROP TABLE "pages_blocks_services_grid_items" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_metrics_strip_items" CASCADE;
  DROP TABLE "pages_blocks_metrics_strip" CASCADE;
  DROP TABLE "pages_blocks_products_grid_items" CASCADE;
  DROP TABLE "pages_blocks_products_grid" CASCADE;
  DROP TABLE "pages_blocks_logo_marquee_items" CASCADE;
  DROP TABLE "pages_blocks_logo_marquee" CASCADE;
  DROP TABLE "pages_blocks_centered_cta" CASCADE;
  DROP TABLE "pages_blocks_process_steps_items" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_version_hero_slides_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_slides" CASCADE;
  DROP TABLE "_pages_v_version_hero_quick_links_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_quick_links" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_strip_items" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_products_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_products_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_marquee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_centered_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_items" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "appearance";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_autoplay";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_autoplay_interval";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_intro_eyebrow";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_intro_heading";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_intro_highlighted_text";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_intro_description";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "appearance";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "eyebrow";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_autoplay";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_autoplay_interval";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_intro_eyebrow";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_intro_heading";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_intro_highlighted_text";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_intro_description";
  DROP TYPE "public"."enum_pages_hero_slides_links_link_type";
  DROP TYPE "public"."enum_pages_hero_slides_links_link_appearance";
  DROP TYPE "public"."enum_pages_hero_quick_links_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_form_block_appearance";
  DROP TYPE "public"."enum_pages_blocks_services_grid_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_products_grid_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_centered_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_centered_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_slides_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_quick_links_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_services_grid_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_products_grid_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_centered_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_centered_cta_link_appearance";`);
}
