import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import { locales, withLocalePrefix } from "@/i18n/config";
import type { Page } from "../../../payload-types";
import { getPagePath } from "@/utilities/getPagePath";
import { BRANCHES_CACHE_TAG } from "@/utilities/branchData";

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
    doc,
    previousDoc,
    req: { payload, context },
}) => {
    if (!context.disableRevalidate) {
        if (doc._status === "published") {
            for (const locale of locales) {
                const path = withLocalePrefix(getPagePath(doc), locale);
                payload.logger.info(`Revalidating page at path: ${path}`);
                revalidatePath(path);
            }
            revalidateTag("pages-sitemap", "max");
        }

        // If the page was previously published, we need to revalidate the old path
        if (
            previousDoc?._status === "published" &&
            (doc._status !== "published" ||
                doc.slug !== previousDoc.slug ||
                doc.pageType !== previousDoc.pageType)
        ) {
            for (const locale of locales) {
                revalidatePath(
                    withLocalePrefix(getPagePath(previousDoc), locale),
                );
            }
            revalidateTag("pages-sitemap", "max");
        }

        if (doc.pageType === "branch" || previousDoc?.pageType === "branch") {
            // Both languages and all grids share this data; expire immediately
            // so publication, unpublication and edits appear on the next request.
            revalidateTag(BRANCHES_CACHE_TAG, { expire: 0 });
            revalidateTag(`pages_${doc.id}`, { expire: 0 });
            revalidateTag("global_header", { expire: 0 });
            revalidateTag("global_footer", { expire: 0 });
        }
    }
    return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
    doc,
    req: { context },
}) => {
    if (!context.disableRevalidate) {
        for (const locale of locales) {
            revalidatePath(withLocalePrefix(getPagePath(doc), locale));
        }
        revalidateTag("pages-sitemap", "max");
        if (doc.pageType === "branch") {
            revalidateTag(BRANCHES_CACHE_TAG, { expire: 0 });
            revalidateTag(`pages_${doc.id}`, { expire: 0 });
            revalidateTag("global_header", { expire: 0 });
            revalidateTag("global_footer", { expire: 0 });
        }
    }

    return doc;
};
