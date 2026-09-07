import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_homepage_hero_slides_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_homepage_hero_slides_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_homepage_hero_quick_links_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_homepage_hero_slides_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_homepage_hero_slides_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_homepage_hero_quick_links_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_homepage_hero_slides_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_homepage_hero_slides_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_homepage_hero_slides_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_homepage_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_homepage_hero_quick_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_homepage_hero_quick_links_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_homepage_hero_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_homepage_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 7000,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_highlighted_text" varchar,
  	"intro_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero_slides_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_homepage_hero_slides_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_homepage_hero_slides_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero_quick_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_homepage_hero_quick_links_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon_id" integer,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 7000,
  	"intro_eyebrow" varchar,
  	"intro_heading" varchar,
  	"intro_highlighted_text" varchar,
  	"intro_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  -- Move localized content and version history into blocks.
  -- Retain legacy tables, columns and enums: the previous Netlify deployment
  -- still queries them while the new application is building.
  UPDATE "pages_blocks_cta" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_content" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_media_block" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_archive" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_form_block" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_services_grid" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_metrics_strip" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_products_grid" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_logo_marquee" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_centered_cta" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_process_steps" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_blocks_company_timeline" b SET _order = b._order + 1 FROM "pages_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.hero_type = 'homepage' AND b._path = 'layout';
  UPDATE "pages_rels" r SET path = 'layout.' || (split_part(r.path, '.', 2)::integer + 1)::text || substring(r.path FROM length('layout.') + length(split_part(r.path, '.', 2)) + 1)
 FROM "pages_locales" l WHERE l._parent_id = r.parent_id AND l._locale = r.locale AND l.hero_type = 'homepage' AND r.path LIKE 'layout.%';
  UPDATE "pages_rels" r SET path = 'layout.0.' || substring(r.path FROM 6) FROM "pages_locales" l
 WHERE l._parent_id = r.parent_id AND l._locale = r.locale AND l.hero_type = 'homepage' AND (r.path LIKE 'hero.slides.%' OR r.path LIKE 'hero.quickLinks.%');
  INSERT INTO "pages_blocks_homepage_hero" (_order, _parent_id, _path, _locale, id, autoplay, autoplay_interval, intro_eyebrow, intro_heading, intro_highlighted_text, intro_description)
 SELECT 1, l._parent_id, 'layout', l._locale, substring(md5('homepage-hero:' || l._parent_id::text || ':' || l._locale::text), 1, 24), l.hero_autoplay, l.hero_autoplay_interval, l.hero_intro_eyebrow, l.hero_intro_heading, l.hero_intro_highlighted_text, l.hero_intro_description FROM "pages_locales" l  WHERE l.hero_type = 'homepage';
  INSERT INTO "pages_blocks_homepage_hero_slides" (_order, _parent_id, _locale, id, heading, description)
 SELECT a._order, b.id, a._locale, a.id, a.heading, a.description FROM "pages_hero_slides" a JOIN "pages_blocks_homepage_hero" b ON b._parent_id = a._parent_id AND b._locale = a._locale;
  INSERT INTO "pages_blocks_homepage_hero_slides_links" (_order, _parent_id, _locale, id, link_type, link_new_tab, link_url, link_label, link_appearance)
 SELECT a._order, a._parent_id, a._locale, a.id, a.link_type::text::"enum_pages_blocks_homepage_hero_slides_links_link_type", a.link_new_tab, a.link_url, a.link_label, a.link_appearance::text::"enum_pages_blocks_homepage_hero_slides_links_link_appearance" FROM "pages_hero_slides_links" a JOIN "pages_blocks_homepage_hero_slides" b ON b.id = a._parent_id;
  INSERT INTO "pages_blocks_homepage_hero_quick_links" (_order, _parent_id, _locale, id, image_id, icon_id, title)
 SELECT a._order, b.id, a._locale, a.id, a.image_id, a.icon_id, a.title FROM "pages_hero_quick_links" a JOIN "pages_blocks_homepage_hero" b ON b._parent_id = a._parent_id AND b._locale = a._locale;
  INSERT INTO "pages_blocks_homepage_hero_quick_links_links" (_order, _parent_id, _locale, id, link_type, link_new_tab, link_url, link_label)
 SELECT a._order, a._parent_id, a._locale, a.id, a.link_type::text::"enum_pages_blocks_homepage_hero_quick_links_links_link_type", a.link_new_tab, a.link_url, a.link_label FROM "pages_hero_quick_links_links" a JOIN "pages_blocks_homepage_hero_quick_links" b ON b.id = a._parent_id;
  UPDATE "pages_locales" SET hero_type = 'none' WHERE hero_type = 'homepage';
  UPDATE "_pages_v_blocks_cta" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_content" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_media_block" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_archive" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_form_block" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_services_grid" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_metrics_strip" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_products_grid" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_logo_marquee" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_centered_cta" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_process_steps" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_blocks_company_timeline" b SET _order = b._order + 1 FROM "_pages_v_locales" l WHERE l._parent_id = b._parent_id AND l._locale = b._locale AND l.version_hero_type = 'homepage' AND b._path = 'version.layout';
  UPDATE "_pages_v_rels" r SET path = 'version.layout.' || (split_part(r.path, '.', 3)::integer + 1)::text || substring(r.path FROM length('version.layout.') + length(split_part(r.path, '.', 3)) + 1)
 FROM "_pages_v_locales" l WHERE l._parent_id = r.parent_id AND l._locale = r.locale AND l.version_hero_type = 'homepage' AND r.path LIKE 'version.layout.%';
  UPDATE "_pages_v_rels" r SET path = 'version.layout.0.' || substring(r.path FROM 14) FROM "_pages_v_locales" l
 WHERE l._parent_id = r.parent_id AND l._locale = r.locale AND l.version_hero_type = 'homepage' AND (r.path LIKE 'version.hero.slides.%' OR r.path LIKE 'version.hero.quickLinks.%');
  INSERT INTO "_pages_v_blocks_homepage_hero" (_order, _parent_id, _path, _locale, _uuid, autoplay, autoplay_interval, intro_eyebrow, intro_heading, intro_highlighted_text, intro_description)
 SELECT 1, l._parent_id, 'version.layout', l._locale, substring(md5('homepage-hero:' || v.parent_id::text || ':' || l._locale::text), 1, 24), l.version_hero_autoplay, l.version_hero_autoplay_interval, l.version_hero_intro_eyebrow, l.version_hero_intro_heading, l.version_hero_intro_highlighted_text, l.version_hero_intro_description FROM "_pages_v_locales" l JOIN "_pages_v" v ON v.id = l._parent_id WHERE l.version_hero_type = 'homepage';
  INSERT INTO "_pages_v_blocks_homepage_hero_slides" (_order, _parent_id, _locale, id, heading, description, _uuid)
 SELECT a._order, b.id, a._locale, a.id, a.heading, a.description, a._uuid FROM "_pages_v_version_hero_slides" a JOIN "_pages_v_blocks_homepage_hero" b ON b._parent_id = a._parent_id AND b._locale = a._locale;
  INSERT INTO "_pages_v_blocks_homepage_hero_slides_links" (_order, _parent_id, _locale, id, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid)
 SELECT a._order, a._parent_id, a._locale, a.id, a.link_type::text::"enum__pages_v_blocks_homepage_hero_slides_links_link_type", a.link_new_tab, a.link_url, a.link_label, a.link_appearance::text::"enum__pages_v_blocks_homepage_hero_slides_links_link_appearance", a._uuid FROM "_pages_v_version_hero_slides_links" a JOIN "_pages_v_blocks_homepage_hero_slides" b ON b.id = a._parent_id;
  SELECT setval(pg_get_serial_sequence('_pages_v_blocks_homepage_hero_slides', 'id'), COALESCE((SELECT MAX(id) FROM "_pages_v_blocks_homepage_hero_slides"), 1), EXISTS(SELECT 1 FROM "_pages_v_blocks_homepage_hero_slides"));
  SELECT setval(pg_get_serial_sequence('_pages_v_blocks_homepage_hero_slides_links', 'id'), COALESCE((SELECT MAX(id) FROM "_pages_v_blocks_homepage_hero_slides_links"), 1), EXISTS(SELECT 1 FROM "_pages_v_blocks_homepage_hero_slides_links"));
  INSERT INTO "_pages_v_blocks_homepage_hero_quick_links" (_order, _parent_id, _locale, id, image_id, icon_id, title, _uuid)
 SELECT a._order, b.id, a._locale, a.id, a.image_id, a.icon_id, a.title, a._uuid FROM "_pages_v_version_hero_quick_links" a JOIN "_pages_v_blocks_homepage_hero" b ON b._parent_id = a._parent_id AND b._locale = a._locale;
  INSERT INTO "_pages_v_blocks_homepage_hero_quick_links_links" (_order, _parent_id, _locale, id, link_type, link_new_tab, link_url, link_label, _uuid)
 SELECT a._order, a._parent_id, a._locale, a.id, a.link_type::text::"enum__pages_v_blocks_homepage_hero_quick_links_links_link_type", a.link_new_tab, a.link_url, a.link_label, a._uuid FROM "_pages_v_version_hero_quick_links_links" a JOIN "_pages_v_blocks_homepage_hero_quick_links" b ON b.id = a._parent_id;
  SELECT setval(pg_get_serial_sequence('_pages_v_blocks_homepage_hero_quick_links', 'id'), COALESCE((SELECT MAX(id) FROM "_pages_v_blocks_homepage_hero_quick_links"), 1), EXISTS(SELECT 1 FROM "_pages_v_blocks_homepage_hero_quick_links"));
  SELECT setval(pg_get_serial_sequence('_pages_v_blocks_homepage_hero_quick_links_links', 'id'), COALESCE((SELECT MAX(id) FROM "_pages_v_blocks_homepage_hero_quick_links_links"), 1), EXISTS(SELECT 1 FROM "_pages_v_blocks_homepage_hero_quick_links_links"));
  UPDATE "_pages_v_locales" SET version_hero_type = 'none' WHERE version_hero_type = 'homepage';

  ALTER TABLE "pages_blocks_homepage_hero_slides_links" ADD CONSTRAINT "pages_blocks_homepage_hero_slides_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_homepage_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero_slides" ADD CONSTRAINT "pages_blocks_homepage_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links_links" ADD CONSTRAINT "pages_blocks_homepage_hero_quick_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_homepage_hero_quick_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD CONSTRAINT "pages_blocks_homepage_hero_quick_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD CONSTRAINT "pages_blocks_homepage_hero_quick_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero_quick_links" ADD CONSTRAINT "pages_blocks_homepage_hero_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_homepage_hero" ADD CONSTRAINT "pages_blocks_homepage_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_slides_links" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_slides_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_homepage_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_slides" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links_links" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_homepage_hero_quick_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_quick_links" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_homepage_hero_slides_links_order_idx" ON "pages_blocks_homepage_hero_slides_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_homepage_hero_slides_links_parent_id_idx" ON "pages_blocks_homepage_hero_slides_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_homepage_hero_slides_links_locale_idx" ON "pages_blocks_homepage_hero_slides_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_homepage_hero_slides_order_idx" ON "pages_blocks_homepage_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_homepage_hero_slides_parent_id_idx" ON "pages_blocks_homepage_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_homepage_hero_slides_locale_idx" ON "pages_blocks_homepage_hero_slides" USING btree ("_locale");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_links_order_idx" ON "pages_blocks_homepage_hero_quick_links_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_links_parent_id_idx" ON "pages_blocks_homepage_hero_quick_links_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_links_locale_idx" ON "pages_blocks_homepage_hero_quick_links_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_order_idx" ON "pages_blocks_homepage_hero_quick_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_parent_id_idx" ON "pages_blocks_homepage_hero_quick_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_locale_idx" ON "pages_blocks_homepage_hero_quick_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_image_idx" ON "pages_blocks_homepage_hero_quick_links" USING btree ("image_id");
  CREATE INDEX "pages_blocks_homepage_hero_quick_links_icon_idx" ON "pages_blocks_homepage_hero_quick_links" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_homepage_hero_order_idx" ON "pages_blocks_homepage_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_homepage_hero_parent_id_idx" ON "pages_blocks_homepage_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_homepage_hero_path_idx" ON "pages_blocks_homepage_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_homepage_hero_locale_idx" ON "pages_blocks_homepage_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_homepage_hero_slides_links_order_idx" ON "_pages_v_blocks_homepage_hero_slides_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_homepage_hero_slides_links_parent_id_idx" ON "_pages_v_blocks_homepage_hero_slides_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_slides_links_locale_idx" ON "_pages_v_blocks_homepage_hero_slides_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_homepage_hero_slides_order_idx" ON "_pages_v_blocks_homepage_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_homepage_hero_slides_parent_id_idx" ON "_pages_v_blocks_homepage_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_slides_locale_idx" ON "_pages_v_blocks_homepage_hero_slides" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_links_order_idx" ON "_pages_v_blocks_homepage_hero_quick_links_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_links_parent_id_idx" ON "_pages_v_blocks_homepage_hero_quick_links_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_links_locale_idx" ON "_pages_v_blocks_homepage_hero_quick_links_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_order_idx" ON "_pages_v_blocks_homepage_hero_quick_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_parent_id_idx" ON "_pages_v_blocks_homepage_hero_quick_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_locale_idx" ON "_pages_v_blocks_homepage_hero_quick_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_image_idx" ON "_pages_v_blocks_homepage_hero_quick_links" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_quick_links_icon_idx" ON "_pages_v_blocks_homepage_hero_quick_links" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_order_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_homepage_hero_parent_id_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_path_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_homepage_hero_locale_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("_locale");
  `);
}

// A page can now contain multiple hero blocks; the old single hero cannot represent them.
export async function down(_args: MigrateDownArgs): Promise<void> {
    throw new Error(
        "Homepage hero migration cannot be reversed without losing block content. Restore a database backup together with the previous application version.",
    );
}
