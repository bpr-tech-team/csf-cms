import { MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"background_media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"background_media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  `);

    await migrateHeroContent(db);

    await db.execute(sql`
  DROP TABLE "pages_blocks_about_hero_links" CASCADE;
  DROP TABLE "pages_blocks_about_hero" CASCADE;
  DROP TABLE "pages_blocks_contact_hero" CASCADE;
  DROP TABLE "pages_blocks_branch_hero_links" CASCADE;
  DROP TABLE "pages_blocks_branch_hero" CASCADE;
  DROP TABLE "pages_blocks_service_hero_links" CASCADE;
  DROP TABLE "pages_blocks_service_hero" CASCADE;
  DROP TABLE "pages_blocks_computer_hero_links" CASCADE;
  DROP TABLE "pages_blocks_computer_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_about_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_about_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_branch_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_branch_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_computer_hero" CASCADE;
  ALTER TABLE "pages_blocks_homepage_hero_slides" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "_pages_v_blocks_homepage_hero_slides" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_locale_idx" ON "pages_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_background_media_idx" ON "pages_blocks_hero" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_locale_idx" ON "_pages_v_blocks_hero_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_background_media_idx" ON "_pages_v_blocks_hero" USING btree ("background_media_id");
  DROP TYPE "public"."enum_pages_blocks_about_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_branch_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_branch_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_service_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_service_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_computer_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_computer_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_about_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_branch_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_branch_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_computer_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_computer_hero_links_link_appearance";`);
}

// Consolidation removes the original block identities. An automatic rollback
// would discard subtitles and additional buttons edited with the new schema.
export async function down(): Promise<void> {
    throw new Error(
        "The unified Hero migration cannot be reversed without losing content. Restore a database backup together with the previous application version.",
    );
}

async function migrateHeroContent(db: MigrateUpArgs["db"]): Promise<void> {
    // Version tables use independent serial IDs, so the same ID can occur in
    // several old block tables. Allocate new IDs and explicitly map their links.
    await db.execute(sql`
        CREATE TEMP TABLE hero_version_ids (
            source text NOT NULL,
            old_id integer NOT NULL,
            new_id integer NOT NULL,
            PRIMARY KEY (source, old_id)
        ) ON COMMIT DROP;
    `);

    for (const source of [
        "about",
        "service",
        "computer",
        "branch",
        "contact",
    ]) {
        // Identifiers come only from the fixed list above, never from content.
        await db.execute(
            sql.raw(`
            INSERT INTO pages_blocks_hero
                (_order, _parent_id, _path, _locale, id, heading, description, background_media_id, block_name)
            SELECT _order, _parent_id, _path, _locale, id, heading, description, background_media_id, block_name
            FROM pages_blocks_${source}_hero;

            INSERT INTO hero_version_ids (source, old_id, new_id)
            SELECT '${source}', id, nextval('_pages_v_blocks_hero_id_seq')
            FROM _pages_v_blocks_${source}_hero;

            INSERT INTO _pages_v_blocks_hero
                (_order, _parent_id, _path, _locale, id, heading, description, background_media_id, _uuid, block_name)
            SELECT hero._order, hero._parent_id, hero._path, hero._locale, ids.new_id,
                hero.heading, hero.description, hero.background_media_id, hero._uuid, hero.block_name
            FROM _pages_v_blocks_${source}_hero hero
            JOIN hero_version_ids ids ON ids.source = '${source}' AND ids.old_id = hero.id;
        `),
        );

        if (source !== "contact") {
            await db.execute(
                sql.raw(`
                INSERT INTO pages_blocks_hero_links
                    (_order, _parent_id, _locale, id, link_type, link_new_tab, link_url, link_label, link_appearance)
                SELECT _order, _parent_id, _locale, id,
                    link_type::text::enum_pages_blocks_hero_links_link_type,
                    link_new_tab, link_url, link_label,
                    link_appearance::text::enum_pages_blocks_hero_links_link_appearance
                FROM pages_blocks_${source}_hero_links;

                INSERT INTO _pages_v_blocks_hero_links
                    (_order, _parent_id, _locale, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid)
                SELECT links._order, ids.new_id, links._locale,
                    links.link_type::text::enum__pages_v_blocks_hero_links_link_type,
                    links.link_new_tab, links.link_url, links.link_label,
                    links.link_appearance::text::enum__pages_v_blocks_hero_links_link_appearance, links._uuid
                FROM _pages_v_blocks_${source}_hero_links links
                JOIN hero_version_ids ids ON ids.source = '${source}' AND ids.old_id = links._parent_id;
            `),
            );
        }
    }

    await db.execute(sql`
        INSERT INTO pages_blocks_hero_links
            (_order, _parent_id, _locale, id, link_type, link_url, link_label, link_appearance)
        SELECT button.position, hero.id, hero._locale,
            hero.id || button.suffix, 'custom',
            CASE WHEN button.position = 1 THEN
                'tel:' || regexp_replace(COALESCE(hero.phone, ''), '[^0-9+]', '', 'g')
                ELSE '#kontakt' END,
            CASE WHEN button.position = 1 THEN
                COALESCE(NULLIF(hero.call_label, ''), CASE WHEN hero._locale = 'cs' THEN 'Volat' ELSE 'Call us' END)
                ELSE COALESCE(NULLIF(hero.form_label, ''), CASE WHEN hero._locale = 'cs' THEN 'Napsat' ELSE 'Write to us' END) END,
            CASE WHEN button.position = 1 THEN 'default' ELSE 'outline' END::enum_pages_blocks_hero_links_link_appearance
        FROM pages_blocks_contact_hero hero
        CROSS JOIN (VALUES (1, '-call'), (2, '-form')) AS button(position, suffix);

        INSERT INTO _pages_v_blocks_hero_links
            (_order, _parent_id, _locale, link_type, link_url, link_label, link_appearance, _uuid)
        SELECT button.position, ids.new_id, hero._locale, 'custom',
            CASE WHEN button.position = 1 THEN
                'tel:' || regexp_replace(COALESCE(hero.phone, ''), '[^0-9+]', '', 'g')
                ELSE '#kontakt' END,
            CASE WHEN button.position = 1 THEN
                COALESCE(NULLIF(hero.call_label, ''), CASE WHEN hero._locale = 'cs' THEN 'Volat' ELSE 'Call us' END)
                ELSE COALESCE(NULLIF(hero.form_label, ''), CASE WHEN hero._locale = 'cs' THEN 'Napsat' ELSE 'Write to us' END) END,
            CASE WHEN button.position = 1 THEN 'default' ELSE 'outline' END::enum__pages_v_blocks_hero_links_link_appearance,
            COALESCE(hero._uuid, hero.id::text) || button.suffix
        FROM _pages_v_blocks_contact_hero hero
        JOIN hero_version_ids ids ON ids.source = 'contact' AND ids.old_id = hero.id
        CROSS JOIN (VALUES (1, '-call'), (2, '-form')) AS button(position, suffix);
    `);
    // Relationship paths use layout/array positions, not block slugs or SQL IDs.
    // Keeping _path, _order and _locale preserves pages_rels and _pages_v_rels.
}
