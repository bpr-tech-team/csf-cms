import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@payload-config";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { BRANCHES_CACHE_TAG } from "./branchData";

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
        select: { title: true, slug: true, pageType: true, branchInfo: true },
    });
    return result.docs;
};

const getPublishedBranches = unstable_cache(
    (ids: number[], locale: AppLocale) => queryBranches(ids, locale, false),
    ["branch-grid-data"],
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
