import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { Page } from "../../../payload-types";
import { BRANCHES_CACHE_TAG } from "@/utilities/branchData";
import {
    getDocumentRevalidationPaths,
    takeDeletedDocumentPaths,
} from "@/utilities/getDocumentRevalidationPaths";

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
    doc,
    previousDoc,
    req,
}) => {
    const { payload, context } = req;
    if (!context.disableRevalidate) {
        if (doc._status === "published") {
            const paths = await getDocumentRevalidationPaths("pages", doc, req);
            for (const path of paths) {
                payload.logger.info(`Revalidating page at path: ${path}`);
                revalidatePath(path);
            }
            revalidateTag("pages-sitemap", "max");
        }

        if (
            previousDoc?._status === "published" &&
            (doc._status !== "published" ||
                doc.slug !== previousDoc.slug ||
                doc.pageType !== previousDoc.pageType)
        ) {
            const paths = await getDocumentRevalidationPaths(
                "pages",
                previousDoc,
                req,
            );
            for (const path of paths) {
                revalidatePath(path);
            }
            revalidateTag("pages-sitemap", "max");
        }

        if (doc.pageType === "branch" || previousDoc?.pageType === "branch") {
            // Both languages and all grids share this data; expire immediately
            // so publication, unpublication and edits appear on the next request.
            revalidateTag(BRANCHES_CACHE_TAG, { expire: 0 });
            revalidateTag("global_header", { expire: 0 });
            revalidateTag("global_footer", { expire: 0 });
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
        if (doc.pageType === "branch") {
            revalidateTag(BRANCHES_CACHE_TAG, { expire: 0 });
            revalidateTag("global_header", { expire: 0 });
            revalidateTag("global_footer", { expire: 0 });
        }
    }

    return doc;
};
