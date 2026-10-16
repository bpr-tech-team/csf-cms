import type { GlobalAfterChangeHook } from "payload";
import { revalidateTag } from "next/cache";

export const revalidateContactDetails: GlobalAfterChangeHook = ({
    doc,
    req,
}) => {
    if (!req.context.disableRevalidate) {
        revalidateTag("global_contact-details", { expire: 0 });
    }
    return doc;
};
