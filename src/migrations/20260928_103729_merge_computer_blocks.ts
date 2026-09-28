import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TABLE "pc_heading_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pc_audience_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pc_category_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pc_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pc_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"summary" varchar
  );
  
  CREATE TABLE "pc_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar
  );
  
  CREATE TABLE "pc_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_computer_catalog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"navigation_heading" varchar DEFAULT 'Čemu se věnujete?',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pc_heading_highlights_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_audience_highlights_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_category_highlights_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_specs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_products_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"summary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_categories_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pc_audiences_v" (
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
  
  CREATE TABLE "_pages_v_blocks_computer_catalog" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"navigation_heading" varchar DEFAULT 'Čemu se věnujete?',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pc_heading_highlights" ADD CONSTRAINT "pc_heading_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_computer_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_audience_highlights" ADD CONSTRAINT "pc_audience_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pc_audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_category_highlights" ADD CONSTRAINT "pc_category_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pc_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_specs" ADD CONSTRAINT "pc_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pc_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_products" ADD CONSTRAINT "pc_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pc_products" ADD CONSTRAINT "pc_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pc_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_categories" ADD CONSTRAINT "pc_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pc_audiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pc_audiences" ADD CONSTRAINT "pc_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_computer_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_computer_catalog" ADD CONSTRAINT "pages_blocks_computer_catalog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_heading_highlights_v" ADD CONSTRAINT "_pc_heading_highlights_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_computer_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_audience_highlights_v" ADD CONSTRAINT "_pc_audience_highlights_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pc_audiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_category_highlights_v" ADD CONSTRAINT "_pc_category_highlights_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pc_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_specs_v" ADD CONSTRAINT "_pc_specs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pc_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_products_v" ADD CONSTRAINT "_pc_products_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pc_products_v" ADD CONSTRAINT "_pc_products_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pc_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_categories_v" ADD CONSTRAINT "_pc_categories_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pc_audiences_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pc_audiences_v" ADD CONSTRAINT "_pc_audiences_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_computer_catalog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_computer_catalog" ADD CONSTRAINT "_pages_v_blocks_computer_catalog_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pc_heading_highlights_order_idx" ON "pc_heading_highlights" USING btree ("_order");
  CREATE INDEX "pc_heading_highlights_parent_id_idx" ON "pc_heading_highlights" USING btree ("_parent_id");
  CREATE INDEX "pc_heading_highlights_locale_idx" ON "pc_heading_highlights" USING btree ("_locale");
  CREATE INDEX "pc_audience_highlights_order_idx" ON "pc_audience_highlights" USING btree ("_order");
  CREATE INDEX "pc_audience_highlights_parent_id_idx" ON "pc_audience_highlights" USING btree ("_parent_id");
  CREATE INDEX "pc_audience_highlights_locale_idx" ON "pc_audience_highlights" USING btree ("_locale");
  CREATE INDEX "pc_category_highlights_order_idx" ON "pc_category_highlights" USING btree ("_order");
  CREATE INDEX "pc_category_highlights_parent_id_idx" ON "pc_category_highlights" USING btree ("_parent_id");
  CREATE INDEX "pc_category_highlights_locale_idx" ON "pc_category_highlights" USING btree ("_locale");
  CREATE INDEX "pc_specs_order_idx" ON "pc_specs" USING btree ("_order");
  CREATE INDEX "pc_specs_parent_id_idx" ON "pc_specs" USING btree ("_parent_id");
  CREATE INDEX "pc_specs_locale_idx" ON "pc_specs" USING btree ("_locale");
  CREATE INDEX "pc_products_order_idx" ON "pc_products" USING btree ("_order");
  CREATE INDEX "pc_products_parent_id_idx" ON "pc_products" USING btree ("_parent_id");
  CREATE INDEX "pc_products_locale_idx" ON "pc_products" USING btree ("_locale");
  CREATE INDEX "pc_products_image_idx" ON "pc_products" USING btree ("image_id");
  CREATE INDEX "pc_categories_order_idx" ON "pc_categories" USING btree ("_order");
  CREATE INDEX "pc_categories_parent_id_idx" ON "pc_categories" USING btree ("_parent_id");
  CREATE INDEX "pc_categories_locale_idx" ON "pc_categories" USING btree ("_locale");
  CREATE INDEX "pc_audiences_order_idx" ON "pc_audiences" USING btree ("_order");
  CREATE INDEX "pc_audiences_parent_id_idx" ON "pc_audiences" USING btree ("_parent_id");
  CREATE INDEX "pc_audiences_locale_idx" ON "pc_audiences" USING btree ("_locale");
  CREATE INDEX "pages_blocks_computer_catalog_order_idx" ON "pages_blocks_computer_catalog" USING btree ("_order");
  CREATE INDEX "pages_blocks_computer_catalog_parent_id_idx" ON "pages_blocks_computer_catalog" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_computer_catalog_path_idx" ON "pages_blocks_computer_catalog" USING btree ("_path");
  CREATE INDEX "pages_blocks_computer_catalog_locale_idx" ON "pages_blocks_computer_catalog" USING btree ("_locale");
  CREATE INDEX "_pc_heading_highlights_v_order_idx" ON "_pc_heading_highlights_v" USING btree ("_order");
  CREATE INDEX "_pc_heading_highlights_v_parent_id_idx" ON "_pc_heading_highlights_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_heading_highlights_v_locale_idx" ON "_pc_heading_highlights_v" USING btree ("_locale");
  CREATE INDEX "_pc_audience_highlights_v_order_idx" ON "_pc_audience_highlights_v" USING btree ("_order");
  CREATE INDEX "_pc_audience_highlights_v_parent_id_idx" ON "_pc_audience_highlights_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_audience_highlights_v_locale_idx" ON "_pc_audience_highlights_v" USING btree ("_locale");
  CREATE INDEX "_pc_category_highlights_v_order_idx" ON "_pc_category_highlights_v" USING btree ("_order");
  CREATE INDEX "_pc_category_highlights_v_parent_id_idx" ON "_pc_category_highlights_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_category_highlights_v_locale_idx" ON "_pc_category_highlights_v" USING btree ("_locale");
  CREATE INDEX "_pc_specs_v_order_idx" ON "_pc_specs_v" USING btree ("_order");
  CREATE INDEX "_pc_specs_v_parent_id_idx" ON "_pc_specs_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_specs_v_locale_idx" ON "_pc_specs_v" USING btree ("_locale");
  CREATE INDEX "_pc_products_v_order_idx" ON "_pc_products_v" USING btree ("_order");
  CREATE INDEX "_pc_products_v_parent_id_idx" ON "_pc_products_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_products_v_locale_idx" ON "_pc_products_v" USING btree ("_locale");
  CREATE INDEX "_pc_products_v_image_idx" ON "_pc_products_v" USING btree ("image_id");
  CREATE INDEX "_pc_categories_v_order_idx" ON "_pc_categories_v" USING btree ("_order");
  CREATE INDEX "_pc_categories_v_parent_id_idx" ON "_pc_categories_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_categories_v_locale_idx" ON "_pc_categories_v" USING btree ("_locale");
  CREATE INDEX "_pc_audiences_v_order_idx" ON "_pc_audiences_v" USING btree ("_order");
  CREATE INDEX "_pc_audiences_v_parent_id_idx" ON "_pc_audiences_v" USING btree ("_parent_id");
  CREATE INDEX "_pc_audiences_v_locale_idx" ON "_pc_audiences_v" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_computer_catalog_order_idx" ON "_pages_v_blocks_computer_catalog" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_computer_catalog_parent_id_idx" ON "_pages_v_blocks_computer_catalog" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_computer_catalog_path_idx" ON "_pages_v_blocks_computer_catalog" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_computer_catalog_locale_idx" ON "_pages_v_blocks_computer_catalog" USING btree ("_locale");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pc_heading_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_audience_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_category_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_specs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pc_audiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_computer_catalog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_heading_highlights_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_audience_highlights_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_category_highlights_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_specs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_categories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pc_audiences_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_computer_catalog" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pc_heading_highlights" CASCADE;
  DROP TABLE "pc_audience_highlights" CASCADE;
  DROP TABLE "pc_category_highlights" CASCADE;
  DROP TABLE "pc_specs" CASCADE;
  DROP TABLE "pc_products" CASCADE;
  DROP TABLE "pc_categories" CASCADE;
  DROP TABLE "pc_audiences" CASCADE;
  DROP TABLE "pages_blocks_computer_catalog" CASCADE;
  DROP TABLE "_pc_heading_highlights_v" CASCADE;
  DROP TABLE "_pc_audience_highlights_v" CASCADE;
  DROP TABLE "_pc_category_highlights_v" CASCADE;
  DROP TABLE "_pc_specs_v" CASCADE;
  DROP TABLE "_pc_products_v" CASCADE;
  DROP TABLE "_pc_categories_v" CASCADE;
  DROP TABLE "_pc_audiences_v" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_catalog" CASCADE;`);
}
