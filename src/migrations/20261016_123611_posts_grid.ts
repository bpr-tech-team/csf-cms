import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_posts_grid_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum_pages_blocks_posts_grid_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum_pages_blocks_posts_grid_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_posts_grid_page_size" AS ENUM('6', '12', '24');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_spacing_top" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_spacing_bottom" AS ENUM('auto', 'none', 'compact', 'normal', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_page_size" AS ENUM('6', '12', '24');
  CREATE TABLE "pages_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing_top" "enum_pages_blocks_posts_grid_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum_pages_blocks_posts_grid_spacing_bottom" DEFAULT 'auto',
  	"anchor_id" varchar,
  	"theme" "enum_pages_blocks_posts_grid_theme" DEFAULT 'light',
  	"heading" varchar,
  	"page_size" "enum_pages_blocks_posts_grid_page_size" DEFAULT '12',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing_top" "enum__pages_v_blocks_posts_grid_spacing_top" DEFAULT 'auto',
  	"spacing_bottom" "enum__pages_v_blocks_posts_grid_spacing_bottom" DEFAULT 'auto',
  	"anchor_id" varchar,
  	"theme" "enum__pages_v_blocks_posts_grid_theme" DEFAULT 'light',
  	"heading" varchar,
  	"page_size" "enum__pages_v_blocks_posts_grid_page_size" DEFAULT '12',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_posts_grid" ADD CONSTRAINT "pages_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_grid" ADD CONSTRAINT "_pages_v_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_posts_grid_order_idx" ON "pages_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_grid_parent_id_idx" ON "pages_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_grid_path_idx" ON "pages_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_grid_locale_idx" ON "pages_blocks_posts_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_posts_grid_order_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_grid_parent_id_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_grid_path_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_grid_locale_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_locale");
  -- Fill only missing dates; explicit editorial dates remain intact.
  UPDATE "pages" SET "published_at" = "created_at"
    WHERE "page_type" = 'post' AND "_status" = 'published' AND "published_at" IS NULL;
  UPDATE "_pages_v" SET "version_published_at" = "version_created_at"
    WHERE "version_page_type" = 'post' AND "version__status" = 'published'
      AND "version_published_at" IS NULL;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_posts_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_posts_grid" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_posts_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_grid" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_posts_grid_spacing_top";
  DROP TYPE "public"."enum_pages_blocks_posts_grid_spacing_bottom";
  DROP TYPE "public"."enum_pages_blocks_posts_grid_theme";
  DROP TYPE "public"."enum_pages_blocks_posts_grid_page_size";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_spacing_top";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_spacing_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_theme";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_page_size";`);
}
