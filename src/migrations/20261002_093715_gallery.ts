import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum_gallery_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__gallery_v_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__gallery_v_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TABLE "flex_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "flex_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing_top" "enum_gallery_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum_gallery_spacing_bottom" DEFAULT 'auto',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "_flex_gallery_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_flex_gallery_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_gallery_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_gallery_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing_top" "enum__gallery_v_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum__gallery_v_spacing_bottom" DEFAULT 'auto',
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "flex_gallery_images" ADD CONSTRAINT "flex_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "flex_gallery_images" ADD CONSTRAINT "flex_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."flex_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flex_gallery" ADD CONSTRAINT "flex_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_gallery_v_images" ADD CONSTRAINT "_flex_gallery_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_flex_gallery_v_images" ADD CONSTRAINT "_flex_gallery_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_flex_gallery_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_flex_gallery_v" ADD CONSTRAINT "_flex_gallery_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v_images" ADD CONSTRAINT "_gallery_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gallery_v_images" ADD CONSTRAINT "_gallery_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_gallery_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_gallery_v" ADD CONSTRAINT "_gallery_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "flex_gallery_images_order_idx" ON "flex_gallery_images" USING btree ("_order");
  CREATE INDEX "flex_gallery_images_parent_id_idx" ON "flex_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "flex_gallery_images_locale_idx" ON "flex_gallery_images" USING btree ("_locale");
  CREATE INDEX "flex_gallery_images_image_idx" ON "flex_gallery_images" USING btree ("image_id");
  CREATE INDEX "flex_gallery_order_idx" ON "flex_gallery" USING btree ("_order");
  CREATE INDEX "flex_gallery_parent_id_idx" ON "flex_gallery" USING btree ("_parent_id");
  CREATE INDEX "flex_gallery_path_idx" ON "flex_gallery" USING btree ("_path");
  CREATE INDEX "flex_gallery_locale_idx" ON "flex_gallery" USING btree ("_locale");
  CREATE INDEX "gallery_images_order_idx" ON "gallery_images" USING btree ("_order");
  CREATE INDEX "gallery_images_parent_id_idx" ON "gallery_images" USING btree ("_parent_id");
  CREATE INDEX "gallery_images_locale_idx" ON "gallery_images" USING btree ("_locale");
  CREATE INDEX "gallery_images_image_idx" ON "gallery_images" USING btree ("image_id");
  CREATE INDEX "gallery_order_idx" ON "gallery" USING btree ("_order");
  CREATE INDEX "gallery_parent_id_idx" ON "gallery" USING btree ("_parent_id");
  CREATE INDEX "gallery_path_idx" ON "gallery" USING btree ("_path");
  CREATE INDEX "gallery_locale_idx" ON "gallery" USING btree ("_locale");
  CREATE INDEX "_flex_gallery_v_images_order_idx" ON "_flex_gallery_v_images" USING btree ("_order");
  CREATE INDEX "_flex_gallery_v_images_parent_id_idx" ON "_flex_gallery_v_images" USING btree ("_parent_id");
  CREATE INDEX "_flex_gallery_v_images_locale_idx" ON "_flex_gallery_v_images" USING btree ("_locale");
  CREATE INDEX "_flex_gallery_v_images_image_idx" ON "_flex_gallery_v_images" USING btree ("image_id");
  CREATE INDEX "_flex_gallery_v_order_idx" ON "_flex_gallery_v" USING btree ("_order");
  CREATE INDEX "_flex_gallery_v_parent_id_idx" ON "_flex_gallery_v" USING btree ("_parent_id");
  CREATE INDEX "_flex_gallery_v_path_idx" ON "_flex_gallery_v" USING btree ("_path");
  CREATE INDEX "_flex_gallery_v_locale_idx" ON "_flex_gallery_v" USING btree ("_locale");
  CREATE INDEX "_gallery_v_images_order_idx" ON "_gallery_v_images" USING btree ("_order");
  CREATE INDEX "_gallery_v_images_parent_id_idx" ON "_gallery_v_images" USING btree ("_parent_id");
  CREATE INDEX "_gallery_v_images_locale_idx" ON "_gallery_v_images" USING btree ("_locale");
  CREATE INDEX "_gallery_v_images_image_idx" ON "_gallery_v_images" USING btree ("image_id");
  CREATE INDEX "_gallery_v_order_idx" ON "_gallery_v" USING btree ("_order");
  CREATE INDEX "_gallery_v_parent_id_idx" ON "_gallery_v" USING btree ("_parent_id");
  CREATE INDEX "_gallery_v_path_idx" ON "_gallery_v" USING btree ("_path");
  CREATE INDEX "_gallery_v_locale_idx" ON "_gallery_v" USING btree ("_locale");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "flex_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "flex_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_flex_gallery_v_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_flex_gallery_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_gallery_v_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_gallery_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "flex_gallery_images" CASCADE;
  DROP TABLE "flex_gallery" CASCADE;
  DROP TABLE "gallery_images" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "_flex_gallery_v_images" CASCADE;
  DROP TABLE "_flex_gallery_v" CASCADE;
  DROP TABLE "_gallery_v_images" CASCADE;
  DROP TABLE "_gallery_v" CASCADE;
  DROP TYPE "public"."enum_gallery_spacing_top";
  DROP TYPE "public"."enum_gallery_spacing_bottom";
  DROP TYPE "public"."enum__gallery_v_spacing_top";
  DROP TYPE "public"."enum__gallery_v_spacing_bottom";`);
}
