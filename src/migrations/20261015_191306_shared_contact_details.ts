import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_footer_blocks_footer_contacts_items_icon_source" AS ENUM('image', 'fontawesome');
  CREATE TYPE "public"."enum_footer_blocks_footer_contacts_items_icon_image_color" AS ENUM('original', 'monochrome');
  CREATE TABLE "contact_details_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "contact_details" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"data_box_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TYPE "public"."enum_footer_blocks_footer_contacts_items_kind" RENAME VALUE 'linkedin' TO 'socialLink';
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD COLUMN "social_link_id" varchar;
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD COLUMN "icon_source" "enum_footer_blocks_footer_contacts_items_icon_source" DEFAULT 'fontawesome' NOT NULL;
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD COLUMN "icon_image_id" integer;
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD COLUMN "icon_font_awesome" varchar DEFAULT 'solid/phone';
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD COLUMN "icon_image_color" "enum_footer_blocks_footer_contacts_items_icon_image_color" DEFAULT 'original';
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD COLUMN "icon_scale" numeric DEFAULT 100;
  ALTER TABLE "contact_details_social_links" ADD CONSTRAINT "contact_details_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_details"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_details_social_links_order_idx" ON "contact_details_social_links" USING btree ("_order");
  CREATE INDEX "contact_details_social_links_parent_id_idx" ON "contact_details_social_links" USING btree ("_parent_id");
  ALTER TABLE "footer_blocks_footer_contacts_items" ADD CONSTRAINT "footer_blocks_footer_contacts_items_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_blocks_footer_contacts_items_icon_icon_image_idx" ON "footer_blocks_footer_contacts_items" USING btree ("icon_image_id");



`);
    await db.execute(sql`
    INSERT INTO "contact_details" ("phone", "email", "data_box_id", "created_at", "updated_at")
    SELECT "contact_details_phone", "contact_details_email", "contact_details_data_box_id", now(), now()
    FROM "footer" ORDER BY "id" LIMIT 1;

    INSERT INTO "contact_details_social_links" ("_order", "_parent_id", "id", "label", "url")
    SELECT 1, c."id", md5('contacts.social.linkedin'), 'LinkedIn', f."contact_details_linkedin"
    FROM "contact_details" c CROSS JOIN "footer" f
    WHERE NULLIF(f."contact_details_linkedin", '') IS NOT NULL;

    UPDATE "footer_blocks_footer_contacts_items" SET
      "icon_font_awesome" = CASE "kind"::text
        WHEN 'email' THEN 'solid/envelope'
        WHEN 'socialLink' THEN 'brands/linkedin-in'
        WHEN 'dataBox' THEN 'solid/inbox'
        ELSE 'solid/phone' END,
      "social_link_id" = CASE WHEN "kind"::text = 'socialLink'
        THEN md5('contacts.social.linkedin') ELSE NULL END;

    ALTER TABLE "footer" DROP COLUMN "contact_details_phone";
    ALTER TABLE "footer" DROP COLUMN "contact_details_email";
    ALTER TABLE "footer" DROP COLUMN "contact_details_linkedin";
    ALTER TABLE "footer" DROP COLUMN "contact_details_data_box_id";
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    // Restore the previous contact representation before removing the new tables.
    await db.execute(sql`
    ALTER TABLE "footer" ADD COLUMN "contact_details_phone" varchar;
    ALTER TABLE "footer" ADD COLUMN "contact_details_email" varchar;
    ALTER TABLE "footer" ADD COLUMN "contact_details_linkedin" varchar;
    ALTER TABLE "footer" ADD COLUMN "contact_details_data_box_id" varchar;
    UPDATE "footer" SET
      "contact_details_phone" = c."phone",
      "contact_details_email" = c."email",
      "contact_details_data_box_id" = c."data_box_id",
      "contact_details_linkedin" = (
        SELECT "url" FROM "contact_details_social_links"
        WHERE "_parent_id" = c."id" AND "url" LIKE '%linkedin.com/%'
        ORDER BY "_order" LIMIT 1
      )
    FROM "contact_details" c;
  `);
    await db.execute(sql`
   ALTER TABLE "contact_details_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_details" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contact_details_social_links" CASCADE;
  DROP TABLE "contact_details" CASCADE;
  ALTER TABLE "footer_blocks_footer_contacts_items" DROP CONSTRAINT "footer_blocks_footer_contacts_items_icon_image_id_media_id_fk";
  
  ALTER TYPE "public"."enum_footer_blocks_footer_contacts_items_kind" RENAME VALUE 'socialLink' TO 'linkedin';
  DROP INDEX "footer_blocks_footer_contacts_items_icon_icon_image_idx";
  ALTER TABLE "footer_blocks_footer_contacts_items" DROP COLUMN "social_link_id";
  ALTER TABLE "footer_blocks_footer_contacts_items" DROP COLUMN "icon_source";
  ALTER TABLE "footer_blocks_footer_contacts_items" DROP COLUMN "icon_image_id";
  ALTER TABLE "footer_blocks_footer_contacts_items" DROP COLUMN "icon_font_awesome";
  ALTER TABLE "footer_blocks_footer_contacts_items" DROP COLUMN "icon_image_color";
  ALTER TABLE "footer_blocks_footer_contacts_items" DROP COLUMN "icon_scale";
  DROP TYPE "public"."enum_footer_blocks_footer_contacts_items_icon_source";
  DROP TYPE "public"."enum_footer_blocks_footer_contacts_items_icon_image_color";`);
}
