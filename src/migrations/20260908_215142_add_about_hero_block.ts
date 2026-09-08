import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_about_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_about_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_about_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_about_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_about_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_about_hero" (
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
  
  CREATE TABLE "_pages_v_blocks_about_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_about_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_about_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_hero" (
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
  
  ALTER TABLE "pages_blocks_about_hero_links" ADD CONSTRAINT "pages_blocks_about_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero" ADD CONSTRAINT "pages_blocks_about_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero" ADD CONSTRAINT "pages_blocks_about_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_hero_links" ADD CONSTRAINT "_pages_v_blocks_about_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_hero" ADD CONSTRAINT "_pages_v_blocks_about_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_hero" ADD CONSTRAINT "_pages_v_blocks_about_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_hero_links_order_idx" ON "pages_blocks_about_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_links_parent_id_idx" ON "pages_blocks_about_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_hero_links_locale_idx" ON "pages_blocks_about_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_hero_order_idx" ON "pages_blocks_about_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_parent_id_idx" ON "pages_blocks_about_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_hero_path_idx" ON "pages_blocks_about_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_hero_locale_idx" ON "pages_blocks_about_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_about_hero_background_media_idx" ON "pages_blocks_about_hero" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_about_hero_links_order_idx" ON "_pages_v_blocks_about_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_hero_links_parent_id_idx" ON "_pages_v_blocks_about_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_hero_links_locale_idx" ON "_pages_v_blocks_about_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_hero_order_idx" ON "_pages_v_blocks_about_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_hero_parent_id_idx" ON "_pages_v_blocks_about_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_hero_path_idx" ON "_pages_v_blocks_about_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_hero_locale_idx" ON "_pages_v_blocks_about_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_about_hero_background_media_idx" ON "_pages_v_blocks_about_hero" USING btree ("background_media_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "pages_blocks_about_hero_links" CASCADE;
  DROP TABLE "pages_blocks_about_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_about_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_about_hero" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_about_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_about_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_hero_links_link_appearance";`);
}
