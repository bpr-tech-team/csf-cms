import type { CollectionBeforeChangeHook } from "payload";
import type { Page } from "@/payload-types";

export const populatePublishedAt: CollectionBeforeChangeHook<Page> = ({
    data,
    originalDoc,
}) => {
    if (data.publishedAt) return data;
    if (originalDoc?.publishedAt) {
        return { ...data, publishedAt: originalDoc.publishedAt };
    }
    if ((data._status ?? originalDoc?._status) === "published") {
        return { ...data, publishedAt: new Date().toISOString() };
    }
    return data;
};
