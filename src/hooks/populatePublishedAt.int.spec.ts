import { describe, expect, it } from "vitest";
import type { Page } from "@/payload-types";
import { populatePublishedAt } from "./populatePublishedAt";

const run = (data: Partial<Page>, originalDoc?: Partial<Page>) =>
    populatePublishedAt({ data, originalDoc } as Parameters<
        typeof populatePublishedAt
    >[0]);

describe("publication dates", () => {
    it("preserves the existing date in partial edits, unpublishing and cleared inputs", async () => {
        const date = "2025-01-01T00:00:00.000Z";
        for (const data of [
            { title: "Edit" },
            { _status: "draft" as const },
            { publishedAt: null },
        ]) {
            expect(
                await run(data, { publishedAt: date, _status: "published" }),
            ).toMatchObject({ publishedAt: date });
        }
    });
    it("dates the first publication, retains explicit dates and leaves new drafts undated", async () => {
        expect(await run({ _status: "published" })).toHaveProperty(
            "publishedAt",
            expect.any(String),
        );
        expect(await run({ _status: "draft" })).not.toHaveProperty(
            "publishedAt",
        );
        expect(
            await run({ _status: "published", publishedAt: "2024-01-01" }),
        ).toMatchObject({ publishedAt: "2024-01-01" });
    });
});
