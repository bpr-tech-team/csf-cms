import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
} from "payload";
import { revalidateTag } from "next/cache";

import type { Page } from "@/payload-types";

type NavigationDocument = Pick<Page, "id" | "slug" | "_status"> & {
    pageType?: Page["pageType"];
};

const expireNavigation = () => {
    // These tags cover both locales, including English links using Czech fallback.
    // Expire immediately so the next request cannot reuse a broken URL.
    revalidateTag("global_header", { expire: 0 });
    revalidateTag("global_footer", { expire: 0 });
};

export const revalidateNavigation: CollectionAfterChangeHook<
    NavigationDocument
> = ({ doc, previousDoc, req }) => {
    if (
        !req.context.disableRevalidate &&
        (doc._status === "published" || previousDoc?._status === "published") &&
        (doc._status !== previousDoc?._status ||
            doc.slug !== previousDoc?.slug ||
            doc.pageType !== previousDoc?.pageType)
    ) {
        expireNavigation();
    }

    return doc;
};

export const revalidateNavigationAfterDelete: CollectionAfterDeleteHook = ({
    doc,
    req,
}) => {
    if (!req.context.disableRevalidate) expireNavigation();

    return doc;
};
