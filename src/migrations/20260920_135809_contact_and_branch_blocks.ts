import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_branch_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_branch_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_branches_grid_items_width" AS ENUM('standard', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_branch_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_branch_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_branches_grid_items_width" AS ENUM('standard', 'wide');
  ALTER TYPE "public"."enum_pages_page_type" ADD VALUE 'branch' BEFORE 'standard';
  ALTER TYPE "public"."enum__pages_v_version_page_type" ADD VALUE 'branch' BEFORE 'standard';
  CREATE TABLE "pages_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background_media_id" integer,
  	"phone" varchar,
  	"call_label" varchar,
  	"form_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_branch_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_branch_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_branch_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_branch_hero" (
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
  
  CREATE TABLE "pages_blocks_branches_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_branches_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"branch_id" integer,
  	"width" "enum_pages_blocks_branches_grid_items_width" DEFAULT 'standard',
  	"show_opening_hours" boolean DEFAULT true
  );
  
  CREATE TABLE "pages_blocks_branches_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_branch_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"contact_heading" varchar,
  	"hours_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_branch_info_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "pages_branch_info_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_branch_info_opening_hours_locales" (
  	"days" varchar,
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"background_media_id" integer,
  	"phone" varchar,
  	"call_label" varchar,
  	"form_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branch_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_branch_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_branch_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branch_hero" (
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
  
  CREATE TABLE "_pages_v_blocks_branches_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branches_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"branch_id" integer,
  	"width" "enum__pages_v_blocks_branches_grid_items_width" DEFAULT 'standard',
  	"show_opening_hours" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_branches_grid" (
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
  
  CREATE TABLE "_pages_v_blocks_branch_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"contact_heading" varchar,
  	"hours_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_branch_info_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_branch_info_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_branch_info_opening_hours_locales" (
  	"days" varchar,
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "branch_info_email" varchar;
  ALTER TABLE "pages" ADD COLUMN "branch_info_company_name" varchar;
  ALTER TABLE "pages" ADD COLUMN "branch_info_company_id" varchar;
  ALTER TABLE "pages" ADD COLUMN "branch_info_vat_id" varchar;
  ALTER TABLE "pages" ADD COLUMN "branch_info_map_embed_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "branch_info_icon_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "branch_info_address" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_email" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_company_name" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_company_id" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_vat_id" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_map_embed_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_icon_id" integer;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_branch_info_address" varchar;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branch_hero_links" ADD CONSTRAINT "pages_blocks_branch_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branch_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branch_hero" ADD CONSTRAINT "pages_blocks_branch_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_branch_hero" ADD CONSTRAINT "pages_blocks_branch_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branches_grid_highlighted_texts" ADD CONSTRAINT "pages_blocks_branches_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branches_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branches_grid_items" ADD CONSTRAINT "pages_blocks_branches_grid_items_branch_id_pages_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_branches_grid_items" ADD CONSTRAINT "pages_blocks_branches_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_branches_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branches_grid" ADD CONSTRAINT "pages_blocks_branches_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_branch_details" ADD CONSTRAINT "pages_blocks_branch_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_branch_info_phones" ADD CONSTRAINT "pages_branch_info_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_branch_info_opening_hours" ADD CONSTRAINT "pages_branch_info_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_branch_info_opening_hours_locales" ADD CONSTRAINT "pages_branch_info_opening_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_branch_info_opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branch_hero_links" ADD CONSTRAINT "_pages_v_blocks_branch_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_branch_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branch_hero" ADD CONSTRAINT "_pages_v_blocks_branch_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branch_hero" ADD CONSTRAINT "_pages_v_blocks_branch_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branches_grid_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_branches_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_branches_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branches_grid_items" ADD CONSTRAINT "_pages_v_blocks_branches_grid_items_branch_id_pages_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branches_grid_items" ADD CONSTRAINT "_pages_v_blocks_branches_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_branches_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branches_grid" ADD CONSTRAINT "_pages_v_blocks_branches_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_branch_details" ADD CONSTRAINT "_pages_v_blocks_branch_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_branch_info_phones" ADD CONSTRAINT "_pages_v_version_branch_info_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_branch_info_opening_hours" ADD CONSTRAINT "_pages_v_version_branch_info_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_branch_info_opening_hours_locales" ADD CONSTRAINT "_pages_v_version_branch_info_opening_hours_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_branch_info_opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_hero_order_idx" ON "pages_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_parent_id_idx" ON "pages_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_path_idx" ON "pages_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_hero_locale_idx" ON "pages_blocks_contact_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_hero_background_media_idx" ON "pages_blocks_contact_hero" USING btree ("background_media_id");
  CREATE INDEX "pages_blocks_branch_hero_links_order_idx" ON "pages_blocks_branch_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_branch_hero_links_parent_id_idx" ON "pages_blocks_branch_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branch_hero_links_locale_idx" ON "pages_blocks_branch_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_branch_hero_order_idx" ON "pages_blocks_branch_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_branch_hero_parent_id_idx" ON "pages_blocks_branch_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branch_hero_path_idx" ON "pages_blocks_branch_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_branch_hero_locale_idx" ON "pages_blocks_branch_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_branch_hero_background_media_idx" ON "pages_blocks_branch_hero" USING btree ("background_media_id");
  CREATE INDEX "pages_blocks_branches_grid_highlighted_texts_order_idx" ON "pages_blocks_branches_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_branches_grid_highlighted_texts_parent_id_idx" ON "pages_blocks_branches_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branches_grid_highlighted_texts_locale_idx" ON "pages_blocks_branches_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_branches_grid_items_order_idx" ON "pages_blocks_branches_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_branches_grid_items_parent_id_idx" ON "pages_blocks_branches_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branches_grid_items_locale_idx" ON "pages_blocks_branches_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_branches_grid_items_branch_idx" ON "pages_blocks_branches_grid_items" USING btree ("branch_id");
  CREATE INDEX "pages_blocks_branches_grid_order_idx" ON "pages_blocks_branches_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_branches_grid_parent_id_idx" ON "pages_blocks_branches_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branches_grid_path_idx" ON "pages_blocks_branches_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_branches_grid_locale_idx" ON "pages_blocks_branches_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_branch_details_order_idx" ON "pages_blocks_branch_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_branch_details_parent_id_idx" ON "pages_blocks_branch_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_branch_details_path_idx" ON "pages_blocks_branch_details" USING btree ("_path");
  CREATE INDEX "pages_blocks_branch_details_locale_idx" ON "pages_blocks_branch_details" USING btree ("_locale");
  CREATE INDEX "pages_branch_info_phones_order_idx" ON "pages_branch_info_phones" USING btree ("_order");
  CREATE INDEX "pages_branch_info_phones_parent_id_idx" ON "pages_branch_info_phones" USING btree ("_parent_id");
  CREATE INDEX "pages_branch_info_opening_hours_order_idx" ON "pages_branch_info_opening_hours" USING btree ("_order");
  CREATE INDEX "pages_branch_info_opening_hours_parent_id_idx" ON "pages_branch_info_opening_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_branch_info_opening_hours_locales_locale_parent_id_uni" ON "pages_branch_info_opening_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_order_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_parent_id_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_path_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_hero_locale_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_contact_hero_background_media_idx" ON "_pages_v_blocks_contact_hero" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_branch_hero_links_order_idx" ON "_pages_v_blocks_branch_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branch_hero_links_parent_id_idx" ON "_pages_v_blocks_branch_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branch_hero_links_locale_idx" ON "_pages_v_blocks_branch_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_branch_hero_order_idx" ON "_pages_v_blocks_branch_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branch_hero_parent_id_idx" ON "_pages_v_blocks_branch_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branch_hero_path_idx" ON "_pages_v_blocks_branch_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_branch_hero_locale_idx" ON "_pages_v_blocks_branch_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_branch_hero_background_media_idx" ON "_pages_v_blocks_branch_hero" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_branches_grid_highlighted_texts_order_idx" ON "_pages_v_blocks_branches_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branches_grid_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_branches_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branches_grid_highlighted_texts_locale_idx" ON "_pages_v_blocks_branches_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_branches_grid_items_order_idx" ON "_pages_v_blocks_branches_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branches_grid_items_parent_id_idx" ON "_pages_v_blocks_branches_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branches_grid_items_locale_idx" ON "_pages_v_blocks_branches_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_branches_grid_items_branch_idx" ON "_pages_v_blocks_branches_grid_items" USING btree ("branch_id");
  CREATE INDEX "_pages_v_blocks_branches_grid_order_idx" ON "_pages_v_blocks_branches_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branches_grid_parent_id_idx" ON "_pages_v_blocks_branches_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branches_grid_path_idx" ON "_pages_v_blocks_branches_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_branches_grid_locale_idx" ON "_pages_v_blocks_branches_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_branch_details_order_idx" ON "_pages_v_blocks_branch_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_branch_details_parent_id_idx" ON "_pages_v_blocks_branch_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_branch_details_path_idx" ON "_pages_v_blocks_branch_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_branch_details_locale_idx" ON "_pages_v_blocks_branch_details" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_branch_info_phones_order_idx" ON "_pages_v_version_branch_info_phones" USING btree ("_order");
  CREATE INDEX "_pages_v_version_branch_info_phones_parent_id_idx" ON "_pages_v_version_branch_info_phones" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_branch_info_opening_hours_order_idx" ON "_pages_v_version_branch_info_opening_hours" USING btree ("_order");
  CREATE INDEX "_pages_v_version_branch_info_opening_hours_parent_id_idx" ON "_pages_v_version_branch_info_opening_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_branch_info_opening_hours_locales_locale_pa" ON "_pages_v_version_branch_info_opening_hours_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_branch_info_icon_id_media_id_fk" FOREIGN KEY ("branch_info_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_branch_info_icon_id_media_id_fk" FOREIGN KEY ("version_branch_info_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_branch_info_branch_info_icon_idx" ON "pages" USING btree ("branch_info_icon_id");
  CREATE INDEX "_pages_v_version_branch_info_version_branch_info_icon_idx" ON "_pages_v" USING btree ("version_branch_info_icon_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_branch_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_branch_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_branches_grid_highlighted_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_branches_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_branches_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_branch_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_branch_info_phones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_branch_info_opening_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_branch_info_opening_hours_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_branch_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_branch_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_branches_grid_highlighted_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_branches_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_branches_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_branch_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_branch_info_phones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_branch_info_opening_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_branch_info_opening_hours_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_contact_hero" CASCADE;
  DROP TABLE "pages_blocks_branch_hero_links" CASCADE;
  DROP TABLE "pages_blocks_branch_hero" CASCADE;
  DROP TABLE "pages_blocks_branches_grid_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_branches_grid_items" CASCADE;
  DROP TABLE "pages_blocks_branches_grid" CASCADE;
  DROP TABLE "pages_blocks_branch_details" CASCADE;
  DROP TABLE "pages_branch_info_phones" CASCADE;
  DROP TABLE "pages_branch_info_opening_hours" CASCADE;
  DROP TABLE "pages_branch_info_opening_hours_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_branch_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_branch_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_branches_grid_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_branches_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_branches_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_branch_details" CASCADE;
  DROP TABLE "_pages_v_version_branch_info_phones" CASCADE;
  DROP TABLE "_pages_v_version_branch_info_opening_hours" CASCADE;
  DROP TABLE "_pages_v_version_branch_info_opening_hours_locales" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_branch_info_icon_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_branch_info_icon_id_media_id_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE text;
  UPDATE "pages" SET "page_type" = 'standard' WHERE "page_type" = 'branch';
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum_pages_page_type";
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('standard', 'service', 'computer');
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DEFAULT 'standard'::"public"."enum_pages_page_type";
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET DATA TYPE "public"."enum_pages_page_type" USING "page_type"::"public"."enum_pages_page_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE text;
  UPDATE "_pages_v" SET "version_page_type" = 'standard' WHERE "version_page_type" = 'branch';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum__pages_v_version_page_type";
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('standard', 'service', 'computer');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DEFAULT 'standard'::"public"."enum__pages_v_version_page_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE "public"."enum__pages_v_version_page_type" USING "version_page_type"::"public"."enum__pages_v_version_page_type";
  DROP INDEX "pages_branch_info_branch_info_icon_idx";
  DROP INDEX "_pages_v_version_branch_info_version_branch_info_icon_idx";
  ALTER TABLE "pages" DROP COLUMN "branch_info_email";
  ALTER TABLE "pages" DROP COLUMN "branch_info_company_name";
  ALTER TABLE "pages" DROP COLUMN "branch_info_company_id";
  ALTER TABLE "pages" DROP COLUMN "branch_info_vat_id";
  ALTER TABLE "pages" DROP COLUMN "branch_info_map_embed_url";
  ALTER TABLE "pages" DROP COLUMN "branch_info_icon_id";
  ALTER TABLE "pages_locales" DROP COLUMN "branch_info_address";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_email";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_company_name";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_company_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_vat_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_map_embed_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_icon_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_branch_info_address";
  DROP TYPE "public"."enum_pages_blocks_branch_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_branch_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_branches_grid_items_width";
  DROP TYPE "public"."enum__pages_v_blocks_branch_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_branch_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_branches_grid_items_width";`);
}
