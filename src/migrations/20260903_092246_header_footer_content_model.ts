import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_header_customer_zone_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_contact_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "header_locales" (
  	"customer_zone_link_url" varchar,
  	"customer_zone_link_label" varchar NOT NULL,
  	"contact_link_url" varchar,
  	"contact_link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "header" ADD COLUMN "customer_zone_link_type" "enum_header_customer_zone_link_type" DEFAULT 'reference';
  ALTER TABLE "header" ADD COLUMN "customer_zone_link_new_tab" boolean;
  ALTER TABLE "header" ADD COLUMN "contact_link_type" "enum_header_contact_link_type" DEFAULT 'reference';
  ALTER TABLE "header" ADD COLUMN "contact_link_new_tab" boolean;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_locale_idx" ON "footer_columns_links" USING btree ("_locale");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_locale_idx" ON "footer_columns" USING btree ("_locale");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  ALTER TABLE "header" DROP COLUMN "customer_zone_link_type";
  ALTER TABLE "header" DROP COLUMN "customer_zone_link_new_tab";
  ALTER TABLE "header" DROP COLUMN "contact_link_type";
  ALTER TABLE "header" DROP COLUMN "contact_link_new_tab";
  DROP TYPE "public"."enum_header_customer_zone_link_type";
  DROP TYPE "public"."enum_header_contact_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";`);
}
