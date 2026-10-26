import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_process_auto_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum_process_auto_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__process_auto_v_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__process_auto_v_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TABLE "process_auto_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "process_auto_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "process_auto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing_top" "enum_process_auto_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum_process_auto_spacing_bottom" DEFAULT 'auto',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_process_auto_v_highlighted_texts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_process_auto_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_process_auto_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing_top" "enum__process_auto_v_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum__process_auto_v_spacing_bottom" DEFAULT 'auto',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "process_auto_highlighted_texts" ADD CONSTRAINT "process_auto_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_auto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_auto_items" ADD CONSTRAINT "process_auto_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."process_auto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "process_auto" ADD CONSTRAINT "process_auto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_process_auto_v_highlighted_texts" ADD CONSTRAINT "_process_auto_v_highlighted_texts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_process_auto_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_process_auto_v_items" ADD CONSTRAINT "_process_auto_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_process_auto_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_process_auto_v" ADD CONSTRAINT "_process_auto_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "process_auto_highlighted_texts_order_idx" ON "process_auto_highlighted_texts" USING btree ("_order");
  CREATE INDEX "process_auto_highlighted_texts_parent_id_idx" ON "process_auto_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "process_auto_highlighted_texts_locale_idx" ON "process_auto_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "process_auto_items_order_idx" ON "process_auto_items" USING btree ("_order");
  CREATE INDEX "process_auto_items_parent_id_idx" ON "process_auto_items" USING btree ("_parent_id");
  CREATE INDEX "process_auto_items_locale_idx" ON "process_auto_items" USING btree ("_locale");
  CREATE INDEX "process_auto_order_idx" ON "process_auto" USING btree ("_order");
  CREATE INDEX "process_auto_parent_id_idx" ON "process_auto" USING btree ("_parent_id");
  CREATE INDEX "process_auto_path_idx" ON "process_auto" USING btree ("_path");
  CREATE INDEX "process_auto_locale_idx" ON "process_auto" USING btree ("_locale");
  CREATE INDEX "_process_auto_v_highlighted_texts_order_idx" ON "_process_auto_v_highlighted_texts" USING btree ("_order");
  CREATE INDEX "_process_auto_v_highlighted_texts_parent_id_idx" ON "_process_auto_v_highlighted_texts" USING btree ("_parent_id");
  CREATE INDEX "_process_auto_v_highlighted_texts_locale_idx" ON "_process_auto_v_highlighted_texts" USING btree ("_locale");
  CREATE INDEX "_process_auto_v_items_order_idx" ON "_process_auto_v_items" USING btree ("_order");
  CREATE INDEX "_process_auto_v_items_parent_id_idx" ON "_process_auto_v_items" USING btree ("_parent_id");
  CREATE INDEX "_process_auto_v_items_locale_idx" ON "_process_auto_v_items" USING btree ("_locale");
  CREATE INDEX "_process_auto_v_order_idx" ON "_process_auto_v" USING btree ("_order");
  CREATE INDEX "_process_auto_v_parent_id_idx" ON "_process_auto_v" USING btree ("_parent_id");
  CREATE INDEX "_process_auto_v_path_idx" ON "_process_auto_v" USING btree ("_path");
  CREATE INDEX "_process_auto_v_locale_idx" ON "_process_auto_v" USING btree ("_locale");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "process_auto_highlighted_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "process_auto_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "process_auto" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_process_auto_v_highlighted_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_process_auto_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_process_auto_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "process_auto_highlighted_texts" CASCADE;
  DROP TABLE "process_auto_items" CASCADE;
  DROP TABLE "process_auto" CASCADE;
  DROP TABLE "_process_auto_v_highlighted_texts" CASCADE;
  DROP TABLE "_process_auto_v_items" CASCADE;
  DROP TABLE "_process_auto_v" CASCADE;
  
  DROP TYPE "public"."enum_process_auto_spacing_top";
  DROP TYPE "public"."enum_process_auto_spacing_bottom";
  DROP TYPE "public"."enum__process_auto_v_spacing_top";
  DROP TYPE "public"."enum__process_auto_v_spacing_bottom";`);
}
