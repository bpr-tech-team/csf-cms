import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_homepage_hero" ADD COLUMN "background_media_id" integer;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD COLUMN "background_media_id" integer;
  ALTER TABLE "pages_blocks_homepage_hero" ADD CONSTRAINT "pages_blocks_homepage_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_homepage_hero" ADD CONSTRAINT "_pages_v_blocks_homepage_hero_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_homepage_hero_background_media_idx" ON "pages_blocks_homepage_hero" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_homepage_hero_background_media_idx" ON "_pages_v_blocks_homepage_hero" USING btree ("background_media_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_homepage_hero" DROP CONSTRAINT "pages_blocks_homepage_hero_background_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_homepage_hero" DROP CONSTRAINT "_pages_v_blocks_homepage_hero_background_media_id_media_id_fk";
  
  DROP INDEX "pages_blocks_homepage_hero_background_media_idx";
  DROP INDEX "_pages_v_blocks_homepage_hero_background_media_idx";
  ALTER TABLE "pages_blocks_homepage_hero" DROP COLUMN "background_media_id";
  ALTER TABLE "_pages_v_blocks_homepage_hero" DROP COLUMN "background_media_id";`);
}
