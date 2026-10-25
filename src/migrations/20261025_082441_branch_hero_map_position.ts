import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        CREATE TYPE "public"."enum_pages_branch_info_map_position" AS ENUM('praha', 'hradec-kralove', 'ostrava', 'zlin', 'brno');
        CREATE TYPE "public"."enum__pages_v_version_branch_info_map_position" AS ENUM('praha', 'hradec-kralove', 'ostrava', 'zlin', 'brno');
        ALTER TABLE "pages" ADD COLUMN "branch_info_map_position" "enum_pages_branch_info_map_position";
        ALTER TABLE "_pages_v" ADD COLUMN "version_branch_info_map_position" "enum__pages_v_version_branch_info_map_position";
    `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        ALTER TABLE "pages" DROP COLUMN "branch_info_map_position";
        ALTER TABLE "_pages_v" DROP COLUMN "version_branch_info_map_position";
        DROP TYPE "public"."enum_pages_branch_info_map_position";
        DROP TYPE "public"."enum__pages_v_version_branch_info_map_position";
    `);
}
