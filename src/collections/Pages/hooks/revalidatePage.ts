import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
    CollectionBeforeChangeHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { Page } from "../../../payload-types";
import { BRANCHES_CACHE_TAG } from "@/utilities/branchData";
import { locales, withLocalePrefix } from "@/i18n/config";
import {
    getDocumentRevalidationPaths,
    takeDeletedDocumentPaths,
} from "@/utilities/getDocumentRevalidationPaths";

const previousPathsKey = (id: Page["id"]) => `pagePathsBeforeChange:${id}`;

const revalidatePostCards = () => {
    for (const locale of locales) {
        const route =
            locale === "cs" ? "/(frontend)/posts" : "/(frontend-en)/en/posts";
        revalidatePath(withLocalePrefix("/posts", locale));
        revalidatePath(`${route}/page/[pageNumber]`, "page");
        revalidatePath(`${route}/[slug]`, "page");
    }
    revalidateTag("posts-sitemap", "max");
};

export const capturePagePathsBeforeChange: CollectionBeforeChangeHook<
    Page
> = async ({ data, operation, originalDoc, req }) => {
    if (
        !req.context.disableRevalidate &&
        operation === "update" &&
        originalDoc &&
        data._status === "published" &&
        (originalDoc._status !== "published" ||
            (data.slug !== undefined && data.slug !== originalDoc.slug))
    ) {
        // A restored/autosaved draft can already contain the new slug.
        // Capture public paths before publication replaces the main document.
        req.context[previousPathsKey(originalDoc.id)] =
            await getDocumentRevalidationPaths(
                "pages",
                { id: originalDoc.id },
                req,
            );
    }
    return data;
};

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
    doc,
    previousDoc,
    req,
}) => {
    const { payload, context } = req;
    const key = previousPathsKey(doc.id);
    const previousPaths = context[key] as string[] | undefined;
    delete context[key];
    if (!context.disableRevalidate) {
        if (
            (doc.pageType === "post" || previousDoc?.pageType === "post") &&
            (doc._status === "published" ||
                previousDoc?._status === "published")
        ) {
            revalidatePostCards();
        }
        if (doc._status === "published") {
            const paths = await getDocumentRevalidationPaths("pages", doc, req);
            for (const path of paths) {
                payload.logger.info(`Revalidating page at path: ${path}`);
                revalidatePath(path);
            }
            revalidateTag("pages-sitemap", "max");
        }

        if (
            previousPaths ||
            (previousDoc?._status === "published" &&
                (doc._status !== "published" ||
                    doc.slug !== previousDoc.slug ||
                    doc.pageType !== previousDoc.pageType))
        ) {
            const paths =
                previousPaths ??
                (await getDocumentRevalidationPaths("pages", previousDoc, req));
            for (const path of paths) {
                revalidatePath(path);
            }
            revalidateTag("pages-sitemap", "max");
        }

        if (doc.pageType === "branch" || previousDoc?.pageType === "branch") {
            // Both languages and all grids share this data; expire immediately
            // so publication, unpublication and edits appear on the next request.
            revalidateTag(BRANCHES_CACHE_TAG, { expire: 0 });
        }
    }
    return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
    doc,
    req,
}) => {
    if (!req.context.disableRevalidate) {
        for (const path of takeDeletedDocumentPaths("pages", doc.id, req)) {
            revalidatePath(path);
        }
        revalidateTag("pages-sitemap", "max");
        if (doc.pageType === "post") revalidatePostCards();
        if (doc.pageType === "branch") {
            revalidateTag(BRANCHES_CACHE_TAG, { expire: 0 });
        }
    }

    return doc;
};
