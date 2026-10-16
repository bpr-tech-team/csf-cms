import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_footer_blocks_footer_contacts_items_kind" AS ENUM('phone', 'email', 'linkedin', 'dataBox');
  CREATE TYPE "public"."enum_footer_blocks_footer_links_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "footer_blocks_footer_brand" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_footer_brand_locales" (
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_footer_contacts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_footer_blocks_footer_contacts_items_kind" DEFAULT 'phone' NOT NULL
  );
  
  CREATE TABLE "footer_blocks_footer_contacts_items_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_footer_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_footer_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_footer_text_locales" (
  	"text" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_footer_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_blocks_footer_links_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "footer_blocks_footer_links_links_locales" (
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_layout_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "footer" ADD COLUMN "contact_details_phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_details_email" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_details_linkedin" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_details_data_box_id" varchar;
  ALTER TABLE "footer_blocks_footer_brand" ADD CONSTRAINT "footer_blocks_footer_brand_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_brand" ADD CONSTRAINT "footer_blocks_footer_brand_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_brand_locales" ADD CONSTRAINT "footer_blocks_footer_brand_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_footer_brand"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD CONSTRAINT "footer_blocks_footer_contacts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_footer_contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_contacts_items_locales" ADD CONSTRAINT "footer_blocks_footer_contacts_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_footer_contacts_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_contacts" ADD CONSTRAINT "footer_blocks_footer_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_text" ADD CONSTRAINT "footer_blocks_footer_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_text_locales" ADD CONSTRAINT "footer_blocks_footer_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_footer_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_links_links" ADD CONSTRAINT "footer_blocks_footer_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_links_links_locales" ADD CONSTRAINT "footer_blocks_footer_links_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_footer_links_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_links" ADD CONSTRAINT "footer_blocks_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_layout" ADD CONSTRAINT "footer_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_layout_locales" ADD CONSTRAINT "footer_layout_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_layout"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_blocks_footer_brand_order_idx" ON "footer_blocks_footer_brand" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_brand_parent_id_idx" ON "footer_blocks_footer_brand" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_footer_brand_path_idx" ON "footer_blocks_footer_brand" USING btree ("_path");
  CREATE INDEX "footer_blocks_footer_brand_logo_idx" ON "footer_blocks_footer_brand" USING btree ("logo_id");
  CREATE UNIQUE INDEX "footer_blocks_footer_brand_locales_locale_parent_id_unique" ON "footer_blocks_footer_brand_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_footer_contacts_items_order_idx" ON "footer_blocks_footer_contacts_items" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_contacts_items_parent_id_idx" ON "footer_blocks_footer_contacts_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_blocks_footer_contacts_items_locales_locale_parent_id" ON "footer_blocks_footer_contacts_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_footer_contacts_order_idx" ON "footer_blocks_footer_contacts" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_contacts_parent_id_idx" ON "footer_blocks_footer_contacts" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_footer_contacts_path_idx" ON "footer_blocks_footer_contacts" USING btree ("_path");
  CREATE INDEX "footer_blocks_footer_text_order_idx" ON "footer_blocks_footer_text" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_text_parent_id_idx" ON "footer_blocks_footer_text" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_footer_text_path_idx" ON "footer_blocks_footer_text" USING btree ("_path");
  CREATE UNIQUE INDEX "footer_blocks_footer_text_locales_locale_parent_id_unique" ON "footer_blocks_footer_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_footer_links_links_order_idx" ON "footer_blocks_footer_links_links" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_links_links_parent_id_idx" ON "footer_blocks_footer_links_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_blocks_footer_links_links_locales_locale_parent_id_un" ON "footer_blocks_footer_links_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_blocks_footer_links_order_idx" ON "footer_blocks_footer_links" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_links_parent_id_idx" ON "footer_blocks_footer_links" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_footer_links_path_idx" ON "footer_blocks_footer_links" USING btree ("_path");
  CREATE INDEX "footer_layout_order_idx" ON "footer_layout" USING btree ("_order");
  CREATE INDEX "footer_layout_parent_id_idx" ON "footer_layout" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_layout_locales_locale_parent_id_unique" ON "footer_layout_locales" USING btree ("_locale","_parent_id");`);

    // Preserve the currently displayed footer. Legacy navigation remains stored
    // in its original tables, but is not restored into the new visible layout.
    await db.execute(sql`
    INSERT INTO "footer" ("created_at", "updated_at")
    SELECT now(), now() WHERE NOT EXISTS (SELECT 1 FROM "footer");

    UPDATE "footer" SET
      "contact_details_phone" = '+420 495 533 495',
      "contact_details_email" = 'info@csf.cz',
      "contact_details_linkedin" = 'https://cz.linkedin.com/company/csf-s-r-o',
      "contact_details_data_box_id" = '2t4pa54';

    INSERT INTO "footer_layout" ("_order", "_parent_id", "id")
    SELECT column_number, f."id",
      md5('footer.column.' || f."id"::text || '.' || column_number::text)
    FROM "footer" f CROSS JOIN generate_series(1, 3) AS column_number;

    INSERT INTO "footer_blocks_footer_brand" ("_order", "_parent_id", "_path", "id")
    SELECT 1, "id", 'layout.0.content', md5('footer.brand.' || "id"::text)
    FROM "footer";

    INSERT INTO "footer_blocks_footer_brand_locales" ("description", "_locale", "_parent_id")
    SELECT "tagline", "_locale", md5('footer.brand.' || "_parent_id"::text)
    FROM "footer_locales";

    INSERT INTO "footer_blocks_footer_contacts" ("_order", "_parent_id", "_path", "id")
    SELECT 1, "id", 'layout.1.content', md5('footer.contacts.' || "id"::text)
    FROM "footer";

    INSERT INTO "footer_blocks_footer_contacts_items" ("_order", "_parent_id", "id", "kind")
    SELECT item.position, md5('footer.contacts.' || f."id"::text),
      md5('footer.contact.' || f."id"::text || '.' || item.kind),
      item.kind::"enum_footer_blocks_footer_contacts_items_kind"
    FROM "footer" f CROSS JOIN (
      VALUES (1, 'phone'), (2, 'email'), (3, 'linkedin'), (4, 'dataBox')
    ) AS item(position, kind);
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "footer_blocks_footer_brand" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_brand_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_contacts_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_contacts_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_contacts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_links_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_links_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_layout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_layout_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_blocks_footer_brand" CASCADE;
  DROP TABLE "footer_blocks_footer_brand_locales" CASCADE;
  DROP TABLE "footer_blocks_footer_contacts_items" CASCADE;
  DROP TABLE "footer_blocks_footer_contacts_items_locales" CASCADE;
  DROP TABLE "footer_blocks_footer_contacts" CASCADE;
  DROP TABLE "footer_blocks_footer_text" CASCADE;
  DROP TABLE "footer_blocks_footer_text_locales" CASCADE;
  DROP TABLE "footer_blocks_footer_links_links" CASCADE;
  DROP TABLE "footer_blocks_footer_links_links_locales" CASCADE;
  DROP TABLE "footer_blocks_footer_links" CASCADE;
  DROP TABLE "footer_layout" CASCADE;
  DROP TABLE "footer_layout_locales" CASCADE;
  ALTER TABLE "footer" DROP COLUMN "contact_details_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_details_email";
  ALTER TABLE "footer" DROP COLUMN "contact_details_linkedin";
  ALTER TABLE "footer" DROP COLUMN "contact_details_data_box_id";
  DROP TYPE "public"."enum_footer_blocks_footer_contacts_items_kind";
  DROP TYPE "public"."enum_footer_blocks_footer_links_links_link_type";`);
}
