// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import type { PayloadRequest } from "payload";
import type { Page } from "@/payload-types";
import { config, proxy } from "@/proxy";
import { findPageBySlug } from "./findPageBySlug";
import { getLinkHref } from "./getLinkHref";
import { getPagePath, getPageRoutePaths } from "./getPagePath";
import { generatePreviewPath } from "./generatePreviewPath";

vi.mock("./findPageBySlug", () => ({ findPageBySlug: vi.fn() }));

const product = { slug: "pocitace", pageType: "computer" } as Page;

beforeEach(() => {
    vi.resetAllMocks();
});

describe("product URLs", () => {
    it.each([
        ["cs", "/produkty/pocitace"],
        ["en", "/en/products/pocitace"],
    ] as const)(
        "uses the same %s URL for links, previews and invalidation",
        (locale, expected) => {
            expect(getPagePath(product, locale)).toBe(expected);
            expect(
                getLinkHref(
                    {
                        type: "reference",
                        reference: { relationTo: "pages", value: product },
                    },
                    locale,
                ),
            ).toBe(expected);
            const preview = generatePreviewPath({
                collection: "pages",
                slug: product.slug!,
                pageType: product.pageType,
                req: { locale } as PayloadRequest,
            });
            expect(
                new URL(preview!, "https://example.test").searchParams.get(
                    "path",
                ),
            ).toBe(expected);
            expect(getPageRoutePaths(product, locale)).toContain(expected);
        },
    );

    it.each(["/produkty/pocitace", "/en/products/pocitace"])(
        "matches the product route %s",
        (url) => {
            expect(unstable_doesMiddlewareMatch({ config, url })).toBe(true);
        },
    );

    it.each(["/pocitace/pocitace", "/en/computers/pocitace"])(
        "does not recognize the erroneous prefix in %s",
        (url) => {
            expect(unstable_doesMiddlewareMatch({ config, url })).toBe(false);
            for (const pageType of [
                "standard",
                "service",
                "computer",
                "branch",
            ] as const) {
                for (const locale of ["cs", "en"] as const) {
                    expect(
                        getPageRoutePaths(
                            { slug: "pocitace", pageType },
                            locale,
                        ),
                    ).not.toContain(url);
                }
            }
        },
    );

    it.each([
        ["cs", "/pocitace", "/produkty/pocitace"],
        ["en", "/en/pocitace", "/en/products/pocitace"],
    ] as const)(
        "redirects the former flat %s URL and retains the query",
        async (_, source, destination) => {
            vi.mocked(findPageBySlug).mockResolvedValue(product);
            const response = await proxy(
                new NextRequest(`https://example.test${source}?ref=home`),
            );
            expect(response.status).toBe(308);
            expect(response.headers.get("location")).toBe(
                `https://example.test${destination}?ref=home`,
            );
        },
    );

    it("serves the canonical product route without redirecting", async () => {
        vi.mocked(findPageBySlug).mockResolvedValue(product);
        const response = await proxy(
            new NextRequest("https://example.test/produkty/pocitace"),
        );
        expect(findPageBySlug).toHaveBeenCalledWith(
            expect.objectContaining({
                slug: "pocitace",
                pageTypes: ["computer"],
            }),
        );
        expect(response.headers.get("location")).toBeNull();
    });

    it("does not redirect an unpublished or missing product", async () => {
        vi.mocked(findPageBySlug).mockResolvedValue(null);
        const response = await proxy(
            new NextRequest("https://example.test/produkty/missing"),
        );
        expect(response.headers.get("location")).toBeNull();
    });
});
