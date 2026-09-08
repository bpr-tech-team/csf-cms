import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TABLE "pages_blocks_homepage_hero_intro_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_products_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_company_timeline_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_split_content_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_homepage_hero_intro_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_products_grid_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_company_timeline_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_homepage_hero_intro_highlighted_texts" ADD CONSTRAINT "pages_blocks_homepage_hero_intro_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_highlighted_texts" ADD CONSTRAINT "pages_blocks_services_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_products_grid_highlighted_texts" ADD CONSTRAINT "pages_blocks_products_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_products_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_highlighted_texts" ADD CONSTRAINT "pages_blocks_process_steps_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_company_timeline_highlighted_texts" ADD CONSTRAINT "pages_blocks_company_timeline_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_company_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_highlighted_texts" ADD CONSTRAINT "pages_blocks_split_content_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero_intro_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_intro_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_homepage_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_services_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products_grid_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_products_grid_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_products_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_process_steps_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_company_timeline_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_company_timeline_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_company_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_highlighted_texts" ADD CONSTRAINT "_pages_v_blocks_split_content_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_homepage_hero_intro_highlighted_texts_order_idx" ON "pages_blocks_homepage_hero_intro_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_homepage_hero_intro_highlighted_texts_parent_id_idx" ON "pages_blocks_homepage_hero_intro_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_homepage_hero_intro_highlighted_texts_locale_idx" ON "pages_blocks_homepage_hero_intro_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_services_grid_highlighted_texts_order_idx" ON "pages_blocks_services_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_highlighted_texts_parent_id_idx" ON "pages_blocks_services_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_highlighted_texts_locale_idx" ON "pages_blocks_services_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_products_grid_highlighted_texts_order_idx" ON "pages_blocks_products_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_products_grid_highlighted_texts_parent_id_idx" ON "pages_blocks_products_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_products_grid_highlighted_texts_locale_idx" ON "pages_blocks_products_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_process_steps_highlighted_texts_order_idx" ON "pages_blocks_process_steps_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_highlighted_texts_parent_id_idx" ON "pages_blocks_process_steps_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_highlighted_texts_locale_idx" ON "pages_blocks_process_steps_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_company_timeline_highlighted_texts_order_idx" ON "pages_blocks_company_timeline_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_timeline_highlighted_texts_parent_id_idx" ON "pages_blocks_company_timeline_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_timeline_highlighted_texts_locale_idx" ON "pages_blocks_company_timeline_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "pages_blocks_split_content_highlighted_texts_order_idx" ON "pages_blocks_split_content_highlighted_texts" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_highlighted_texts_parent_id_idx" ON "pages_blocks_split_content_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_highlighted_texts_locale_idx" ON "pages_blocks_split_content_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_homepage_hero_intro_highlighted_texts_order_idx" ON "_pages_v_blocks_homepage_hero_intro_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_homepage_hero_intro_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_homepage_hero_intro_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_intro_highlighted_texts_locale_idx" ON "_pages_v_blocks_homepage_hero_intro_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_services_grid_highlighted_texts_order_idx" ON "_pages_v_blocks_services_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_services_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_highlighted_texts_locale_idx" ON "_pages_v_blocks_services_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_products_grid_highlighted_texts_order_idx" ON "_pages_v_blocks_products_grid_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_products_grid_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_products_grid_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_products_grid_highlighted_texts_locale_idx" ON "_pages_v_blocks_products_grid_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_process_steps_highlighted_texts_order_idx" ON "_pages_v_blocks_process_steps_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_process_steps_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_highlighted_texts_locale_idx" ON "_pages_v_blocks_process_steps_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_company_timeline_highlighted_texts_order_idx" ON "_pages_v_blocks_company_timeline_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_company_timeline_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_company_timeline_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_company_timeline_highlighted_texts_locale_idx" ON "_pages_v_blocks_company_timeline_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_split_content_highlighted_texts_order_idx" ON "_pages_v_blocks_split_content_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_highlighted_texts_parent_id_idx" ON "_pages_v_blocks_split_content_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_highlighted_texts_locale_idx" ON "_pages_v_blocks_split_content_highlighted_texts" USING btree ("_locale");
  INSERT INTO "pages_blocks_homepage_hero_intro_highlighted_texts" ("_order", "_parent_id", "_locale", "id", "text")
  SELECT 1, "id", "_locale", "id" || '-highlight-1', "intro_highlighted_text"
  FROM "pages_blocks_homepage_hero"
  WHERE NULLIF(BTRIM("intro_highlighted_text"), '') IS NOT NULL;
  INSERT INTO "pages_blocks_services_grid_highlighted_texts" ("_order", "_parent_id", "_locale", "id", "text")
  SELECT 1, "id", "_locale", "id" || '-highlight-1', "highlighted_text"
  FROM "pages_blocks_services_grid"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "pages_blocks_products_grid_highlighted_texts" ("_order", "_parent_id", "_locale", "id", "text")
  SELECT 1, "id", "_locale", "id" || '-highlight-1', "highlighted_text"
  FROM "pages_blocks_products_grid"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "pages_blocks_process_steps_highlighted_texts" ("_order", "_parent_id", "_locale", "id", "text")
  SELECT 1, "id", "_locale", "id" || '-highlight-1', "highlighted_text"
  FROM "pages_blocks_process_steps"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "pages_blocks_company_timeline_highlighted_texts" ("_order", "_parent_id", "_locale", "id", "text")
  SELECT 1, "id", "_locale", "id" || '-highlight-1', "highlighted_text"
  FROM "pages_blocks_company_timeline"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "pages_blocks_split_content_highlighted_texts" ("_order", "_parent_id", "_locale", "id", "text")
  SELECT 1, "id", "_locale", "id" || '-highlight-1', "highlighted_text"
  FROM "pages_blocks_split_content"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "_pages_v_blocks_homepage_hero_intro_highlighted_texts" ("_order", "_parent_id", "_locale", "text", "_uuid")
  SELECT 1, "id", "_locale", "intro_highlighted_text", "id"::text || '-highlight-1'
  FROM "_pages_v_blocks_homepage_hero"
  WHERE NULLIF(BTRIM("intro_highlighted_text"), '') IS NOT NULL;
  INSERT INTO "_pages_v_blocks_services_grid_highlighted_texts" ("_order", "_parent_id", "_locale", "text", "_uuid")
  SELECT 1, "id", "_locale", "highlighted_text", "id"::text || '-highlight-1'
  FROM "_pages_v_blocks_services_grid"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "_pages_v_blocks_products_grid_highlighted_texts" ("_order", "_parent_id", "_locale", "text", "_uuid")
  SELECT 1, "id", "_locale", "highlighted_text", "id"::text || '-highlight-1'
  FROM "_pages_v_blocks_products_grid"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "_pages_v_blocks_process_steps_highlighted_texts" ("_order", "_parent_id", "_locale", "text", "_uuid")
  SELECT 1, "id", "_locale", "highlighted_text", "id"::text || '-highlight-1'
  FROM "_pages_v_blocks_process_steps"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "_pages_v_blocks_company_timeline_highlighted_texts" ("_order", "_parent_id", "_locale", "text", "_uuid")
  SELECT 1, "id", "_locale", "highlighted_text", "id"::text || '-highlight-1'
  FROM "_pages_v_blocks_company_timeline"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  INSERT INTO "_pages_v_blocks_split_content_highlighted_texts" ("_order", "_parent_id", "_locale", "text", "_uuid")
  SELECT 1, "id", "_locale", "highlighted_text", "id"::text || '-highlight-1'
  FROM "_pages_v_blocks_split_content"
  WHERE NULLIF(BTRIM("highlighted_text"), '') IS NOT NULL;
  ALTER TABLE "pages_blocks_homepage_hero" DROP COLUMN "intro_highlighted_text";
  ALTER TABLE "pages_blocks_services_grid" DROP COLUMN "highlighted_text";
  ALTER TABLE "pages_blocks_products_grid" DROP COLUMN "highlighted_text";
  ALTER TABLE "pages_blocks_process_steps" DROP COLUMN "highlighted_text";
  ALTER TABLE "pages_blocks_company_timeline" DROP COLUMN "highlighted_text";
  ALTER TABLE "pages_blocks_split_content" DROP COLUMN "highlighted_text";
  ALTER TABLE "_pages_v_blocks_homepage_hero" DROP COLUMN "intro_highlighted_text";
  ALTER TABLE "_pages_v_blocks_services_grid" DROP COLUMN "highlighted_text";
  ALTER TABLE "_pages_v_blocks_products_grid" DROP COLUMN "highlighted_text";
  ALTER TABLE "_pages_v_blocks_process_steps" DROP COLUMN "highlighted_text";
  ALTER TABLE "_pages_v_blocks_company_timeline" DROP COLUMN "highlighted_text";
  ALTER TABLE "_pages_v_blocks_split_content" DROP COLUMN "highlighted_text";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_homepage_hero" ADD COLUMN "intro_highlighted_text" varchar;
  ALTER TABLE "pages_blocks_services_grid" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "pages_blocks_products_grid" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "pages_blocks_process_steps" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "pages_blocks_company_timeline" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "pages_blocks_split_content" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD COLUMN "intro_highlighted_text" varchar;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "_pages_v_blocks_products_grid" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "_pages_v_blocks_company_timeline" ADD COLUMN "highlighted_text" varchar;
  ALTER TABLE "_pages_v_blocks_split_content" ADD COLUMN "highlighted_text" varchar;
  UPDATE "pages_blocks_homepage_hero" AS parent
  SET "intro_highlighted_text" = child."text"
  FROM "pages_blocks_homepage_hero_intro_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "pages_blocks_services_grid" AS parent
  SET "highlighted_text" = child."text"
  FROM "pages_blocks_services_grid_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "pages_blocks_products_grid" AS parent
  SET "highlighted_text" = child."text"
  FROM "pages_blocks_products_grid_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "pages_blocks_process_steps" AS parent
  SET "highlighted_text" = child."text"
  FROM "pages_blocks_process_steps_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "pages_blocks_company_timeline" AS parent
  SET "highlighted_text" = child."text"
  FROM "pages_blocks_company_timeline_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "pages_blocks_split_content" AS parent
  SET "highlighted_text" = child."text"
  FROM "pages_blocks_split_content_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "_pages_v_blocks_homepage_hero" AS parent
  SET "intro_highlighted_text" = child."text"
  FROM "_pages_v_blocks_homepage_hero_intro_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "_pages_v_blocks_services_grid" AS parent
  SET "highlighted_text" = child."text"
  FROM "_pages_v_blocks_services_grid_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "_pages_v_blocks_products_grid" AS parent
  SET "highlighted_text" = child."text"
  FROM "_pages_v_blocks_products_grid_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "_pages_v_blocks_process_steps" AS parent
  SET "highlighted_text" = child."text"
  FROM "_pages_v_blocks_process_steps_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "_pages_v_blocks_company_timeline" AS parent
  SET "highlighted_text" = child."text"
  FROM "_pages_v_blocks_company_timeline_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  UPDATE "_pages_v_blocks_split_content" AS parent
  SET "highlighted_text" = child."text"
  FROM "_pages_v_blocks_split_content_highlighted_texts" AS child
  WHERE child."_parent_id" = parent."id" AND child."_order" = 1;
  DROP TABLE "pages_blocks_homepage_hero_intro_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_services_grid_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_products_grid_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_process_steps_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_company_timeline_highlighted_texts" CASCADE;
  DROP TABLE "pages_blocks_split_content_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_homepage_hero_intro_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_products_grid_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_company_timeline_highlighted_texts" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_highlighted_texts" CASCADE;`);
}
