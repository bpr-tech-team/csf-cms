import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

// Keep historical migrations independent of future changes to the map registry.
const positions = [
    "praha",
    "hradec-kralove",
    "ostrava",
    "zlin",
    "brno",
] as const;
type Position = (typeof positions)[number];
type FooterPoint = {
    id: string;
    parent_id: string;
    branch_id: number | null;
    position: string | null;
    page_id: number | null;
    page_type: string | null;
    page_position: string | null;
};

const isPosition = (value: string | null): value is Position =>
    positions.some((position) => position === value);

function legacyAssignments(points: FooterPoint[]) {
    const assignments = new Map<number, Position>();
    const occupied = new Map<string, number>();
    const headOfficeIDs = new Set<number>();
    const errors: string[] = [];
    const skipped: string[] = [];

    for (const point of points) {
        if (
            point.branch_id === null ||
            point.page_id === null ||
            point.page_type !== "branch"
        ) {
            skipped.push(point.id);
            continue;
        }
        const branchID = point.branch_id;
        if (!isPosition(point.position)) {
            errors.push(`Footer row ${point.id} has an unknown map position.`);
            continue;
        }
        const previous = assignments.get(branchID);
        if (previous && previous !== point.position) {
            errors.push(
                `Branch ${branchID} has conflicting footer positions: ${previous}, ${point.position}.`,
            );
        }
        if (
            point.page_position !== null &&
            point.page_position !== point.position
        ) {
            errors.push(
                `Branch ${branchID} explicitly selects ${point.page_position}, but footer row ${point.id} selects ${point.position}.`,
            );
        }
        const slot = `${point.parent_id}:${point.position}`;
        const occupant = occupied.get(slot);
        if (occupant !== undefined && occupant !== branchID) {
            errors.push(
                `Footer map ${point.parent_id} assigns ${point.position} to branches ${occupant} and ${branchID}.`,
            );
        }
        occupied.set(slot, branchID);
        assignments.set(branchID, point.position);
        // The former shared SEO address explicitly described the Hradec office.
        if (point.position === "hradec-kralove") headOfficeIDs.add(branchID);
    }

    if (headOfficeIDs.size > 1) {
        errors.push(
            `The legacy Hradec head office is ambiguous: branches ${[...headOfficeIDs].join(", ")}.`,
        );
    }
    if (errors.length) {
        throw new Error(
            `Branch map migration preflight failed:\n${errors.join("\n")}`,
        );
    }
    return {
        assignments,
        headOfficeID: [...headOfficeIDs][0],
        skipped,
    };
}

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
    // Payload wraps this migration in a transaction. Prevent edits between
    // preflight and copying the canonical values, while leaving reads available.
    await db.execute(sql`
        LOCK TABLE "footer_blocks_footer_branches_map_points", "pages", "_pages_v", "contact_details" IN SHARE ROW EXCLUSIVE MODE;
    `);
    const { rows } = await db.execute<FooterPoint>(sql`
        SELECT f."id", f."_parent_id" AS parent_id, f."branch_id",
            f."position"::text AS position, p."id" AS page_id,
            p."page_type"::text AS page_type,
            p."branch_info_map_position"::text AS page_position
        FROM "footer_blocks_footer_branches_map_points" f
        LEFT JOIN "pages" p ON p."id" = f."branch_id"
        ORDER BY f."_parent_id", f."_order", f."id";
    `);
    const { assignments, headOfficeID, skipped } = legacyAssignments(rows);
    if (skipped.length) {
        payload.logger.warn(
            `Branch map migration skips footer rows without an existing branch: ${skipped.join(", ")}.`,
        );
    }

    for (const [branchID, position] of assignments) {
        await db.execute(sql`
            UPDATE "pages"
            SET "branch_info_map_position" = ${position}::"enum_pages_branch_info_map_position"
            WHERE "id" = ${branchID} AND "page_type" = 'branch'
                AND "branch_info_map_position" IS NULL;
        `);
        await db.execute(sql`
            UPDATE "_pages_v"
            SET "version_branch_info_map_position" = ${position}::"enum__pages_v_version_branch_info_map_position"
            WHERE "parent_id" = ${branchID} AND "version_page_type" = 'branch'
                AND "version_branch_info_map_position" IS NULL;
        `);
    }
    await db.execute(sql`
        ALTER TABLE "contact_details" ADD COLUMN "head_office_id" integer;
        ALTER TABLE "contact_details" ADD CONSTRAINT "contact_details_head_office_id_pages_id_fk" FOREIGN KEY ("head_office_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
        CREATE INDEX "contact_details_head_office_idx" ON "contact_details" USING btree ("head_office_id");
    `);
    if (headOfficeID !== undefined) {
        await db.execute(sql`
            UPDATE "contact_details" SET "head_office_id" = ${headOfficeID}
            WHERE "head_office_id" IS NULL;
        `);
    }
    await db.execute(sql`
        ALTER TABLE "footer_blocks_footer_branches_map_points" DROP COLUMN "position";
        DROP TYPE "public"."enum_footer_blocks_footer_branches_map_points_position";
    `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        LOCK TABLE "footer_blocks_footer_branches_map_points", "pages", "contact_details" IN SHARE ROW EXCLUSIVE MODE;
    `);
    const { rows } = await db.execute<
        Pick<FooterPoint, "id" | "page_position">
    >(sql`
        SELECT f."id", p."branch_info_map_position"::text AS page_position
        FROM "footer_blocks_footer_branches_map_points" f
        LEFT JOIN "pages" p ON p."id" = f."branch_id" AND p."page_type" = 'branch'
        ORDER BY f."_parent_id", f."_order", f."id";
    `);
    const unresolved = rows.filter((point) => !isPosition(point.page_position));
    if (unresolved.length) {
        throw new Error(
            `Cannot restore legacy footer positions for rows ${unresolved.map(({ id }) => id).join(", ")}. Assign an existing branch with a map position or remove these rows before rollback.`,
        );
    }
    await db.execute(sql`
        CREATE TYPE "public"."enum_footer_blocks_footer_branches_map_points_position" AS ENUM('praha', 'hradec-kralove', 'ostrava', 'zlin', 'brno');
        ALTER TABLE "footer_blocks_footer_branches_map_points" ADD COLUMN "position" "enum_footer_blocks_footer_branches_map_points_position";
        UPDATE "footer_blocks_footer_branches_map_points" f
        SET "position" = p."branch_info_map_position"::text::"enum_footer_blocks_footer_branches_map_points_position"
        FROM "pages" p WHERE p."id" = f."branch_id" AND p."page_type" = 'branch';
        ALTER TABLE "footer_blocks_footer_branches_map_points" ALTER COLUMN "position" SET NOT NULL;
        ALTER TABLE "contact_details" DROP CONSTRAINT "contact_details_head_office_id_pages_id_fk";
        DROP INDEX "contact_details_head_office_idx";
        ALTER TABLE "contact_details" DROP COLUMN "head_office_id";
    `);
    // Retain canonical page/version selections: editors may have changed them
    // since the migration, and clearing them would discard valid content.
}
