import config from "@payload-config";
import type { ISitemapField } from "next-sitemap";
import { getPayload } from "payload";

import { defaultLocale } from "@/i18n/config";
import { getPagePath } from "@/utilities/getPagePath";
import { getCanonicalUrl } from "./config";

export async function getSitemapEntries(section: "pages" | "posts") {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
        collection: "pages",
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        locale: defaultLocale,
        fallbackLocale: false,
        pagination: false,
        where: {
            pageType:
                section === "posts"
                    ? { equals: "post" }
                    : { not_equals: "post" },
            _status: { equals: "published" },
        },
        select: { slug: true, pageType: true, updatedAt: true },
    });

    const entries = new Map<string, ISitemapField>();
    if (section === "pages") {
        // The archive route is available without a corresponding CMS page.
        const loc = getCanonicalUrl("/posts");
        entries.set(loc, { loc });
    }

    for (const page of docs) {
        if (!page.slug) continue;
        const loc = getCanonicalUrl(getPagePath(page));
        entries.set(loc, { loc, lastmod: page.updatedAt });
    }

    return Array.from(entries.values());
}
