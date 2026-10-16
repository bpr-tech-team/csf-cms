import { describe, expect, it } from "vitest";
import {
    parsePostCardsQuery,
    postCardsWhere,
    readPostsGridState,
    writePostsGridState,
} from "./postsGrid";

describe("posts grid queries", () => {
    it("validates the public query and trims title search", () => {
        expect(
            parsePostCardsQuery(
                new URLSearchParams(
                    "locale=en&limit=6&page=2&sort=oldest&q=%20cloud%20",
                ),
            ),
        ).toEqual({
            locale: "en",
            limit: 6,
            page: 2,
            sort: "oldest",
            q: "cloud",
        });
        for (const value of [
            "locale=all",
            "locale=ru",
            "limit=0",
            "limit=1000",
            "page=-1",
            "page=1.5",
            "page=Infinity",
            "sort=-updatedAt",
            `q=${"x".repeat(201)}`,
        ]) {
            expect(parsePostCardsQuery(new URLSearchParams(value))).toBeNull();
        }
    });

    it("restricts every search to published posts and searches the displayed fallback title", () => {
        expect(postCardsWhere("cs", "Počítač")).toEqual({
            and: [
                { pageType: { equals: "post" } },
                { _status: { equals: "published" } },
                { title: { contains: "Počítač" } },
            ],
        });
        expect(postCardsWhere("en", "cloud")).toEqual({
            and: [
                { pageType: { equals: "post" } },
                { _status: { equals: "published" } },
                {
                    or: [
                        { "title.en": { contains: "cloud" } },
                        {
                            and: [
                                {
                                    or: [
                                        { "title.en": { exists: false } },
                                        { "title.en": { equals: "" } },
                                    ],
                                },
                                { "title.cs": { contains: "cloud" } },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    it("keeps block state independent and preserves other URL parameters and the anchor", () => {
        const url = new URL(
            "https://example.test/en/news?campaign=test&posts_other_page=3#articles",
        );
        const path = writePostsGridState(url, "grid", {
            q: "IT & cloud",
            sort: "oldest",
            page: 2,
        });
        const updated = new URL(path, url);
        expect(readPostsGridState(updated.search, "grid")).toEqual({
            q: "IT & cloud",
            sort: "oldest",
            page: 2,
        });
        expect(updated.searchParams.get("posts_other_page")).toBe("3");
        expect(updated.searchParams.get("campaign")).toBe("test");
        expect(updated.hash).toBe("#articles");
        expect(
            writePostsGridState(updated, "grid", {
                q: "",
                sort: "newest",
                page: 1,
            }),
        ).toBe("/en/news?campaign=test&posts_other_page=3#articles");
        expect(
            readPostsGridState(
                "?posts_grid_page=-2&posts_grid_sort=invalid",
                "grid",
            ),
        ).toEqual({ q: "", sort: "newest", page: 1 });
    });
});
