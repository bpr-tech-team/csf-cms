// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const { find, count } = vi.hoisted(() => ({ find: vi.fn(), count: vi.fn() }));
vi.mock("payload", () => ({ getPayload: async () => ({ find, count }) }));
vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));

import { getPostCards } from "./getPostCards";

describe("public post card selection", () => {
    beforeEach(() => {
        find.mockReset();
        count.mockReset().mockResolvedValue({ totalDocs: 0 });
    });

    it("queries only the requested page with public access and returns a small card DTO", async () => {
        find.mockResolvedValue({
            docs: [
                {
                    id: 3,
                    title: "Post",
                    slug: "post",
                    excerpt: "Text",
                    heroImage: {
                        id: 1,
                        url: "/image.png",
                        createdAt: "date",
                        updatedAt: "date",
                        caption: "private to card response",
                    },
                    layout: ["large body"],
                },
            ],
            page: 2,
            totalPages: 3,
            totalDocs: 14,
            hasPrevPage: true,
            hasNextPage: true,
        });
        const result = await getPostCards({
            locale: "cs",
            limit: 6,
            q: "",
            page: 2,
            sort: "newest",
        });
        expect(find).toHaveBeenCalledWith(
            expect.objectContaining({
                collection: "pages",
                page: 2,
                limit: 6,
                depth: 1,
                draft: false,
                overrideAccess: false,
                sort: ["-publishedAt", "-id"],
            }),
        );
        expect(result).toMatchObject({ page: 2, totalDocs: 14, totalPages: 3 });
        expect(result.docs[0]).not.toHaveProperty("layout");
        expect(result.docs[0].heroImage).not.toHaveProperty("caption");
    });

    it("clamps a vanished last page and applies oldest-first ordering", async () => {
        find.mockResolvedValueOnce({
            docs: [],
            page: 9,
            totalPages: 2,
            totalDocs: 7,
        }).mockResolvedValueOnce({
            docs: [],
            page: 2,
            totalPages: 2,
            totalDocs: 7,
            hasPrevPage: true,
            hasNextPage: false,
        });
        const result = await getPostCards({
            locale: "en",
            limit: 6,
            q: "cloud",
            page: 9,
            sort: "oldest",
        });
        expect(find).toHaveBeenLastCalledWith(
            expect.objectContaining({
                page: 2,
                sort: ["publishedAt", "id"],
                locale: "en",
                fallbackLocale: "cs",
            }),
        );
        expect(result.page).toBe(2);
    });

    it("normalizes an empty result to page one", async () => {
        find.mockResolvedValue({
            docs: [],
            page: 9,
            totalPages: 0,
            totalDocs: 0,
            hasPrevPage: true,
            hasNextPage: false,
        });
        expect(
            await getPostCards({
                locale: "cs",
                limit: 12,
                q: "missing",
                page: 9,
                sort: "newest",
            }),
        ).toMatchObject({
            page: 1,
            totalPages: 1,
            totalDocs: 0,
            hasPrevPage: false,
            hasNextPage: false,
        });
    });

    it("recovers the SQL adapter's missing window count on an out-of-range page", async () => {
        find.mockResolvedValueOnce({
            docs: [],
            page: 999,
            totalPages: 0,
            totalDocs: 0,
        }).mockResolvedValueOnce({
            docs: [],
            page: 2,
            totalPages: 2,
            totalDocs: 7,
        });
        count.mockResolvedValue({ totalDocs: 7 });
        expect(
            await getPostCards({
                locale: "cs",
                limit: 6,
                q: "",
                page: 999,
                sort: "newest",
            }),
        ).toMatchObject({ page: 2, totalDocs: 7 });
    });
});
