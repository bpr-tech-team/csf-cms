import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@payload-config";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import type { Page } from "@/payload-types";
import { BRANCHES_CACHE_TAG } from "./branchData";

const branchSelect = {
    title: true,
    slug: true,
    pageType: true,
    branchInfo: true,
} as const;

export type BranchDirectoryEntry = Pick<
    Page,
    "id" | "title" | "slug" | "pageType" | "branchInfo"
>;

const queryBranches = async (
    ids: number[],
    locale: AppLocale,
    draft: boolean,
) => {
    const payload = await getPayload({ config });
    const result = await payload.find({
        collection: "pages",
        locale,
        fallbackLocale: defaultLocale,
        draft,
        overrideAccess: draft,
        pagination: false,
        depth: 1,
        where: {
            and: [{ id: { in: ids } }, { pageType: { equals: "branch" } }],
        },
        select: branchSelect,
    });
    return result.docs;
};

const getPublishedBranches = unstable_cache(
    (ids: number[], locale: AppLocale) => queryBranches(ids, locale, false),
    ["branch-data-v2"],
    { tags: [BRANCHES_CACHE_TAG] },
);

export const getBranches = (
    ids: number[],
    locale: AppLocale,
    draft = false,
) => {
    if (!ids.length) return Promise.resolve([]);
    return draft
        ? queryBranches(ids, locale, true)
        : getPublishedBranches(ids, locale);
};

export const getBranchDirectory = unstable_cache(
    async (locale: AppLocale): Promise<BranchDirectoryEntry[]> => {
        const payload = await getPayload({ config });
        const result = await payload.find({
            collection: "pages",
            locale,
            fallbackLocale: defaultLocale,
            draft: false,
            overrideAccess: false,
            pagination: false,
            limit: 0,
            depth: 0,
            sort: "id",
            where: {
                and: [
                    { pageType: { equals: "branch" } },
                    { _status: { equals: "published" } },
                ],
            },
            select: branchSelect,
        });
        return result.docs;
    },
    ["branch-directory"],
    { tags: [BRANCHES_CACHE_TAG] },
);
