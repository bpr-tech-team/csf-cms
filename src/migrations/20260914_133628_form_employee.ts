import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_form_block" ADD COLUMN "enable_employee" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "employee_photo_id" integer;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "employee_name" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "employee_position" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "employee_phone" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "employee_email" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "employee_address" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "enable_employee" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "employee_photo_id" integer;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "employee_name" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "employee_position" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "employee_phone" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "employee_email" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "employee_address" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_employee_photo_id_media_id_fk" FOREIGN KEY ("employee_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_employee_photo_id_media_id_fk" FOREIGN KEY ("employee_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_form_block_employee_employee_photo_idx" ON "pages_blocks_form_block" USING btree ("employee_photo_id");
  CREATE INDEX "_pages_v_blocks_form_block_employee_employee_photo_idx" ON "_pages_v_blocks_form_block" USING btree ("employee_photo_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_form_block" DROP CONSTRAINT "pages_blocks_form_block_employee_photo_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_form_block" DROP CONSTRAINT "_pages_v_blocks_form_block_employee_photo_id_media_id_fk";
  
  DROP INDEX "pages_blocks_form_block_employee_employee_photo_idx";
  DROP INDEX "_pages_v_blocks_form_block_employee_employee_photo_idx";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "enable_employee";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "employee_photo_id";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "employee_name";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "employee_position";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "employee_phone";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "employee_email";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "employee_address";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "enable_employee";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "employee_photo_id";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "employee_name";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "employee_position";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "employee_phone";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "employee_email";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "employee_address";`);
}
