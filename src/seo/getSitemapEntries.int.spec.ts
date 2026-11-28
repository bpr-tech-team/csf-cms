import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getSitemapEntries } from "./getSitemapEntries";

const findPages = vi.hoisted(() => vi.fn());
vi.mock("payload", () => ({
    getPayload: async () => ({ find: findPages }),
}));
vi.mock("@payload-config", () => ({ default: {} }));

const origin = "https://example.com";
const lastmod = "2026-11-27T11:00:00.000Z";

beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SERVER_URL", origin);
    findPages.mockReset();
});
afterEach(() => vi.unstubAllEnvs());

describe("Czech sitemaps", () => {
    it("lists the archive once when it also has a CMS page", async () => {
        findPages.mockResolvedValueOnce({
            docs: [
                { slug: "posts", pageType: "standard", updatedAt: lastmod },
                { slug: "pocitace", pageType: "computer", updatedAt: lastmod },
            ],
        });

        expect(await getSitemapEntries("pages")).toEqual([
            { loc: `${origin}/posts`, lastmod },
            { loc: `${origin}/produkty/pocitace`, lastmod },
        ]);
        expect(findPages).toHaveBeenCalledWith(
            expect.objectContaining({
                locale: "cs",
                fallbackLocale: false,
                draft: false,
                where: {
                    pageType: { not_equals: "post" },
                    _status: { equals: "published" },
                },
            }),
        );
    });

    it("includes the archive route without a CMS page", async () => {
        findPages.mockResolvedValueOnce({ docs: [] });

        expect(await getSitemapEntries("pages")).toEqual([
            { loc: `${origin}/posts` },
        ]);
    });

    it("lists articles with a Czech slug at their canonical URLs", async () => {
        findPages.mockResolvedValueOnce({
            docs: [
                {
                    slug: "případová-studie",
                    pageType: "post",
                    updatedAt: lastmod,
                },
                { slug: null, pageType: "post", updatedAt: lastmod },
            ],
        });

        expect(await getSitemapEntries("posts")).toEqual([
            {
                loc: `${origin}/posts/${encodeURIComponent("případová-studie")}`,
                lastmod,
            },
        ]);
        expect(findPages).toHaveBeenCalledWith(
            expect.objectContaining({
                locale: "cs",
                fallbackLocale: false,
                draft: false,
                where: {
                    pageType: { equals: "post" },
                    _status: { equals: "published" },
                },
            }),
        );
    });
});
