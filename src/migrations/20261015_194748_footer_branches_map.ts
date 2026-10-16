import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_footer_blocks_footer_branches_map_points_position" AS ENUM('praha', 'hradec-kralove', 'ostrava', 'zlin', 'brno');
  CREATE TABLE "footer_blocks_footer_branches_map_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"position" "enum_footer_blocks_footer_branches_map_points_position" NOT NULL,
  	"branch_id" integer
  );
  
  CREATE TABLE "footer_blocks_footer_branches_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "footer_blocks_footer_branches_map_points" ADD CONSTRAINT "footer_blocks_footer_branches_map_points_branch_id_pages_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_branches_map_points" ADD CONSTRAINT "footer_blocks_footer_branches_map_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_footer_branches_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_footer_branches_map" ADD CONSTRAINT "footer_blocks_footer_branches_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_blocks_footer_branches_map_points_order_idx" ON "footer_blocks_footer_branches_map_points" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_branches_map_points_parent_id_idx" ON "footer_blocks_footer_branches_map_points" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_footer_branches_map_points_branch_idx" ON "footer_blocks_footer_branches_map_points" USING btree ("branch_id");
  CREATE INDEX "footer_blocks_footer_branches_map_order_idx" ON "footer_blocks_footer_branches_map" USING btree ("_order");
  CREATE INDEX "footer_blocks_footer_branches_map_parent_id_idx" ON "footer_blocks_footer_branches_map" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_footer_branches_map_path_idx" ON "footer_blocks_footer_branches_map" USING btree ("_path");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "footer_blocks_footer_branches_map_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_footer_branches_map" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_blocks_footer_branches_map_points" CASCADE;
  DROP TABLE "footer_blocks_footer_branches_map" CASCADE;
  DROP TYPE "public"."enum_footer_blocks_footer_branches_map_points_position";`);
}
