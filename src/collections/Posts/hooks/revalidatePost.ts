import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
    CollectionBeforeChangeHook,
} from "payload";

import { revalidatePath, revalidateTag } from "next/cache";

import type { Post } from "../../../payload-types";
import {
    getDocumentRevalidationPaths,
    takeDeletedDocumentPaths,
} from "@/utilities/getDocumentRevalidationPaths";

const previousPathsKey = (id: Post["id"]) => `postPathsBeforeChange:${id}`;

export const capturePostPathsBeforeChange: CollectionBeforeChangeHook<
    Post
> = async ({ data, operation, originalDoc, req }) => {
    if (
        !req.context.disableRevalidate &&
        operation === "update" &&
        originalDoc &&
        data._status === "published" &&
        (originalDoc._status !== "published" ||
            (data.slug !== undefined && data.slug !== originalDoc.slug))
    ) {
        // previousDoc can be an autosaved draft with the new slug already.
        // Read the main document before publication replaces its public URLs.
        req.context[previousPathsKey(originalDoc.id)] =
            await getDocumentRevalidationPaths(
                "posts",
                { id: originalDoc.id },
                req,
            );
    }
    return data;
};

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
    doc,
    previousDoc,
    req,
}) => {
    const { payload, context } = req;
    const key = previousPathsKey(doc.id);
    const previousPaths = context[key] as string[] | undefined;
    delete context[key];

    if (!context.disableRevalidate) {
        if (doc._status === "published") {
            const paths = await getDocumentRevalidationPaths("posts", doc, req);
            for (const path of paths) {
                payload.logger.info(`Revalidating post at path: ${path}`);
                revalidatePath(path);
            }
            revalidateTag("posts-sitemap", "max");
        }

        // Revalidate the previous URL on unpublish or a published slug change.
        if (
            previousPaths ||
            (previousDoc?._status === "published" &&
                (doc._status !== "published" || doc.slug !== previousDoc.slug))
        ) {
            const paths =
                previousPaths ??
                (await getDocumentRevalidationPaths("posts", previousDoc, req));
            for (const path of paths) {
                payload.logger.info(`Revalidating old post at path: ${path}`);
                revalidatePath(path);
            }
            revalidateTag("posts-sitemap", "max");
        }
    }
    return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
    doc,
    req,
}) => {
    if (!req.context.disableRevalidate) {
        for (const path of takeDeletedDocumentPaths("posts", doc.id, req)) {
            revalidatePath(path);
        }
        revalidateTag("posts-sitemap", "max");
    }

    return doc;
};
