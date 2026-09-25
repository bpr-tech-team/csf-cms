import { beforeEach, describe, expect, it, vi } from "vitest";
import { revalidateTag } from "next/cache";

import type { Page } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLinkHref } from "@/utilities/getLinkHref";
import {
    revalidateNavigation,
    revalidateNavigationAfterDelete,
} from "./revalidateNavigation";

const { entries, findGlobal } = vi.hoisted(() => ({
    entries: new Map<string, { tags: string[]; value: unknown }>(),
    findGlobal: vi.fn(),
}));

vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("payload", () => ({
    getPayload: vi.fn(async () => ({ findGlobal })),
}));
vi.mock("next/cache", () => ({
    // Model the Data Cache boundary to exercise reads before and after hooks.
    unstable_cache:
        (
            read: () => Promise<unknown>,
            keys: string[],
            { tags }: { tags: string[] },
        ) =>
        async () => {
            const key = JSON.stringify(keys);
            if (!entries.has(key)) {
                entries.set(key, { tags, value: await read() });
            }
            return entries.get(key)?.value;
        },
    revalidateTag: vi.fn((tag, profile) => {
        if (profile?.expire !== 0) return;
        for (const [key, entry] of entries) {
            if (entry.tags.includes(tag)) entries.delete(key);
        }
    }),
}));

type ChangeArgs = Parameters<typeof revalidateNavigation>[0];
type DeleteArgs = Parameters<typeof revalidateNavigationAfterDelete>[0];
type Document = ChangeArgs["doc"];

const published: Document = {
    id: 1,
    _status: "published",
    slug: "old",
};

const change = (
    doc: Document,
    previousDoc: Document | undefined,
    disableRevalidate = false,
) =>
    revalidateNavigation({
        doc,
        previousDoc,
        req: { context: { disableRevalidate } },
    } as unknown as ChangeArgs);

const remove = (disableRevalidate = false) =>
    revalidateNavigationAfterDelete({
        doc: published,
        req: { context: { disableRevalidate } },
    } as unknown as DeleteArgs);

async function links() {
    const result = [];
    for (const global of ["header", "footer"] as const) {
        for (const locale of ["cs", "en"] as const) {
            const data = await getCachedGlobal(global, 1, locale)();
            result.push(getLinkHref(data.navItems?.[0]?.link, locale));
        }
    }
    return result;
}

beforeEach(() => {
    entries.clear();
    vi.clearAllMocks();
});

describe.each(["pages", "posts"] as const)(
    "%s navigation cache",
    (relationTo) => {
        let current: (Document & { pageType: Page["pageType"] }) | undefined;

        beforeEach(() => {
            current = { ...published, pageType: "standard" };
            findGlobal.mockImplementation(async () => ({
                navItems: [
                    {
                        link: {
                            type: "reference",
                            reference: {
                                relationTo,
                                // Payload leaves only the ID for inaccessible relationships.
                                value:
                                    current?._status === "published"
                                        ? { ...current }
                                        : 1,
                            },
                        },
                    },
                ],
            }));
        });

        const expectedLinks = (slug: string) => {
            const path = relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
            return [path, `/en${path}`, path, `/en${path}`];
        };

        it("refreshes both globals and locales after renaming a published document", async () => {
            expect(await links()).toEqual(expectedLinks("old"));
            expect(await links()).toEqual(expectedLinks("old"));
            expect(findGlobal).toHaveBeenCalledTimes(4);

            const previousDoc = current;
            current = { ...current!, slug: "new" };
            await change(current, previousDoc);

            expect(await links()).toEqual(expectedLinks("new"));
            expect(findGlobal).toHaveBeenCalledTimes(8);
            for (const [{ overrideAccess, draft }] of findGlobal.mock.calls) {
                expect(overrideAccess).toBe(false);
                expect(draft).toBe(false);
            }
        });

        it("removes links on unpublish and restores them on publication", async () => {
            await links();
            const previousDoc = current;
            current = { ...current!, _status: "draft" };
            await change(current, previousDoc);
            expect(await links()).toEqual([null, null, null, null]);

            const draft = current;
            current = { ...current, _status: "published", slug: "new" };
            await change(current, draft);
            expect(await links()).toEqual(expectedLinks("new"));
        });

        it("removes cached links after deletion", async () => {
            await links();
            current = undefined;
            await remove();
            expect(await links()).toEqual([null, null, null, null]);
        });
    },
);

describe("navigation invalidation scope", () => {
    it.each([
        ["publication", published, undefined],
        [
            "publication after autosave",
            published,
            { ...published, _status: "draft" },
        ],
        [
            "page type change",
            { ...published, pageType: "service" },
            { ...published, pageType: "standard" },
        ],
    ] as const)(
        "invalidates both globals on %s",
        async (_, doc, previousDoc) => {
            await change(doc, previousDoc);
            expect(revalidateTag).toHaveBeenCalledWith("global_header", {
                expire: 0,
            });
            expect(revalidateTag).toHaveBeenCalledWith("global_footer", {
                expire: 0,
            });
        },
    );

    it("keeps navigation cached for content-only edits and unpublished drafts", async () => {
        await change({ ...published }, published);
        await change(
            { ...published, _status: "draft", slug: "new" },
            { ...published, _status: "draft", slug: "old" },
        );
        await change(
            { ...published, _status: "draft", slug: "new" },
            undefined,
        );
        expect(revalidateTag).not.toHaveBeenCalled();
    });

    it("respects disableRevalidate for changes and deletion", async () => {
        await change({ ...published, slug: "new" }, published, true);
        await remove(true);
        expect(revalidateTag).not.toHaveBeenCalled();
    });
});
