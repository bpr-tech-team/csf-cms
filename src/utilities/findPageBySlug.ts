import config from "@payload-config";
import { getPayload } from "payload";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { PagesSelect } from "@/payload-types";
import type { PageType } from "./getPagePath";

// The renderer loads content; Proxy selects only slug and pageType at depth 0.
export async function findPageBySlug<
    TSelect extends PagesSelect<true> | PagesSelect<false>,
>({
    locale,
    slug,
    pageTypes,
    draft = false,
    select,
    depth,
}: {
    locale: AppLocale;
    slug: string;
    pageTypes: PageType[];
    draft?: boolean;
    select?: TSelect;
    depth?: number;
}) {
    const payload = await getPayload({ config });
    const options = {
        collection: "pages" as const,
        draft,
        overrideAccess: draft,
        depth,
        select,
    };
    const where = { pageType: { in: pageTypes }, slug: { equals: slug } };
    const result = await payload.find({
        ...options,
        fallbackLocale: locale === defaultLocale ? false : defaultLocale,
        limit: 1,
        locale,
        pagination: false,
        where,
    });
    if (result.docs[0]) return result.docs[0];
    if (locale === defaultLocale) return null;

    const fallback = await payload.find({
        ...options,
        locale: defaultLocale,
        fallbackLocale: false,
        limit: 1,
        pagination: false,
        where,
    });
    if (!fallback.docs[0]) return null;

    return payload.findByID({
        ...options,
        id: fallback.docs[0].id,
        locale,
        fallbackLocale: defaultLocale,
        disableErrors: true,
    });
}
