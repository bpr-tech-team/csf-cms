import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import { defaultLocale, isLocale, withLocalePrefix } from "@/i18n/config";
import type { Post } from "../../../payload-types";

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
    doc,
    previousDoc,
    req: { payload, context, locale: reqLocale },
}) => {
    if (!context.disableRevalidate) {
        const locale = isLocale(reqLocale) ? reqLocale : defaultLocale;

        if (doc._status === "published") {
            const path = withLocalePrefix(`/posts/${doc.slug}`, locale);

            payload.logger.info(`Revalidating post at path: ${path}`);

            revalidatePath(path);
            revalidateTag("posts-sitemap", "max");
        }

        // If the post was previously published, we need to revalidate the old path
        if (
            previousDoc._status === "published" &&
            doc._status !== "published"
        ) {
            const oldPath = withLocalePrefix(
                `/posts/${previousDoc.slug}`,
                locale,
            );

            payload.logger.info(`Revalidating old post at path: ${oldPath}`);

            revalidatePath(oldPath);
            revalidateTag("posts-sitemap", "max");
        }
    }
    return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
    doc,
    req: { context, locale: reqLocale },
}) => {
    if (!context.disableRevalidate) {
        const locale = isLocale(reqLocale) ? reqLocale : defaultLocale;
        const path = withLocalePrefix(`/posts/${doc?.slug}`, locale);

        revalidatePath(path);
        revalidateTag("posts-sitemap", "max");
    }

    return doc;
};
