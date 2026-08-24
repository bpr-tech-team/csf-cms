import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import { defaultLocale, isLocale, withLocalePrefix } from "@/i18n/config";
import type { Page } from "../../../payload-types";

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
    doc,
    previousDoc,
    req: { payload, context, locale: reqLocale },
}) => {
    if (!context.disableRevalidate) {
        const locale = isLocale(reqLocale) ? reqLocale : defaultLocale;

        if (doc._status === "published") {
            const path = withLocalePrefix(
                doc.slug === "home" ? "/" : `/${doc.slug}`,
                locale,
            );

            payload.logger.info(`Revalidating page at path: ${path}`);

            revalidatePath(path);
            revalidateTag("pages-sitemap", "max");
        }

        // If the page was previously published, we need to revalidate the old path
        if (
            previousDoc?._status === "published" &&
            doc._status !== "published"
        ) {
            const oldPath = withLocalePrefix(
                previousDoc.slug === "home" ? "/" : `/${previousDoc.slug}`,
                locale,
            );

            payload.logger.info(`Revalidating old page at path: ${oldPath}`);

            revalidatePath(oldPath);
            revalidateTag("pages-sitemap", "max");
        }
    }
    return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
    doc,
    req: { context, locale: reqLocale },
}) => {
    if (!context.disableRevalidate) {
        const locale = isLocale(reqLocale) ? reqLocale : defaultLocale;
        const path = withLocalePrefix(
            doc?.slug === "home" ? "/" : `/${doc?.slug}`,
            locale,
        );

        revalidatePath(path);
        revalidateTag("pages-sitemap", "max");
    }

    return doc;
};
