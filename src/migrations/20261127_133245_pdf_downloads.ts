import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_pdf_downloads_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum_pages_blocks_pdf_downloads_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_pdf_downloads_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_pdf_downloads_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TABLE "pages_blocks_pdf_downloads_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"file_id" integer
  );
  
  CREATE TABLE "pages_blocks_pdf_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing_top" "enum_pages_blocks_pdf_downloads_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum_pages_blocks_pdf_downloads_spacing_bottom" DEFAULT 'auto',
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pdf_downloads_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pdf_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing_top" "enum__pages_v_blocks_pdf_downloads_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum__pages_v_blocks_pdf_downloads_spacing_bottom" DEFAULT 'auto',
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_pdf_downloads_documents" ADD CONSTRAINT "pages_blocks_pdf_downloads_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pdf_downloads_documents" ADD CONSTRAINT "pages_blocks_pdf_downloads_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pdf_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pdf_downloads" ADD CONSTRAINT "pages_blocks_pdf_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pdf_downloads_documents" ADD CONSTRAINT "_pages_v_blocks_pdf_downloads_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pdf_downloads_documents" ADD CONSTRAINT "_pages_v_blocks_pdf_downloads_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pdf_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pdf_downloads" ADD CONSTRAINT "_pages_v_blocks_pdf_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_pdf_downloads_documents_order_idx" ON "pages_blocks_pdf_downloads_documents" USING btree ("_order");
  CREATE INDEX "pages_blocks_pdf_downloads_documents_parent_id_idx" ON "pages_blocks_pdf_downloads_documents" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pdf_downloads_documents_locale_idx" ON "pages_blocks_pdf_downloads_documents" USING btree ("_locale");
  CREATE INDEX "pages_blocks_pdf_downloads_documents_file_idx" ON "pages_blocks_pdf_downloads_documents" USING btree ("file_id");
  CREATE INDEX "pages_blocks_pdf_downloads_order_idx" ON "pages_blocks_pdf_downloads" USING btree ("_order");
  CREATE INDEX "pages_blocks_pdf_downloads_parent_id_idx" ON "pages_blocks_pdf_downloads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pdf_downloads_path_idx" ON "pages_blocks_pdf_downloads" USING btree ("_path");
  CREATE INDEX "pages_blocks_pdf_downloads_locale_idx" ON "pages_blocks_pdf_downloads" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_documents_order_idx" ON "_pages_v_blocks_pdf_downloads_documents" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_documents_parent_id_idx" ON "_pages_v_blocks_pdf_downloads_documents" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_documents_locale_idx" ON "_pages_v_blocks_pdf_downloads_documents" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_documents_file_idx" ON "_pages_v_blocks_pdf_downloads_documents" USING btree ("file_id");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_order_idx" ON "_pages_v_blocks_pdf_downloads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_parent_id_idx" ON "_pages_v_blocks_pdf_downloads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_path_idx" ON "_pages_v_blocks_pdf_downloads" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pdf_downloads_locale_idx" ON "_pages_v_blocks_pdf_downloads" USING btree ("_locale");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_pdf_downloads_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pdf_downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pdf_downloads_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_pdf_downloads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_pdf_downloads_documents" CASCADE;
  DROP TABLE "pages_blocks_pdf_downloads" CASCADE;
  DROP TABLE "_pages_v_blocks_pdf_downloads_documents" CASCADE;
  DROP TABLE "_pages_v_blocks_pdf_downloads" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_pdf_downloads_spacing_top";
  DROP TYPE "public"."enum_pages_blocks_pdf_downloads_spacing_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_pdf_downloads_spacing_top";
  DROP TYPE "public"."enum__pages_v_blocks_pdf_downloads_spacing_bottom";`);
}
