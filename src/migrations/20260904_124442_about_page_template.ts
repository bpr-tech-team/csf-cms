import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'about';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'about';
  CREATE TABLE "pages_blocks_company_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_company_timeline" (
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
  
  CREATE TABLE "_pages_v_blocks_company_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_company_timeline" (
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
  
  ALTER TABLE "pages_blocks_company_timeline_items" ADD CONSTRAINT "pages_blocks_company_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_company_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_company_timeline" ADD CONSTRAINT "pages_blocks_company_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_company_timeline_items" ADD CONSTRAINT "_pages_v_blocks_company_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_company_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_company_timeline" ADD CONSTRAINT "_pages_v_blocks_company_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_company_timeline_items_order_idx" ON "pages_blocks_company_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_timeline_items_parent_id_idx" ON "pages_blocks_company_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_timeline_items_locale_idx" ON "pages_blocks_company_timeline_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_company_timeline_order_idx" ON "pages_blocks_company_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_timeline_parent_id_idx" ON "pages_blocks_company_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_timeline_path_idx" ON "pages_blocks_company_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_company_timeline_locale_idx" ON "pages_blocks_company_timeline" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_company_timeline_items_order_idx" ON "_pages_v_blocks_company_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_company_timeline_items_parent_id_idx" ON "_pages_v_blocks_company_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_company_timeline_items_locale_idx" ON "_pages_v_blocks_company_timeline_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_company_timeline_order_idx" ON "_pages_v_blocks_company_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_company_timeline_parent_id_idx" ON "_pages_v_blocks_company_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_company_timeline_path_idx" ON "_pages_v_blocks_company_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_company_timeline_locale_idx" ON "_pages_v_blocks_company_timeline" USING btree ("_locale");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "pages_blocks_company_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_company_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_company_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_company_timeline" CASCADE;
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  UPDATE "pages_locales" SET "hero_type" = 'lowImpact' WHERE "hero_type" = 'about';
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'homepage');
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  UPDATE "_pages_v_locales" SET "version_hero_type" = 'lowImpact' WHERE "version_hero_type" = 'about';
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'homepage');
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";`);
}
