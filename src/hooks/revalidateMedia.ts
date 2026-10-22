import type { CollectionAfterOperationHook } from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

import { BRANCHES_CACHE_TAG } from "@/utilities/branchData";
import { POST_CARDS_CACHE_TAG } from "@/utilities/postsGrid";

export const revalidateMedia: CollectionAfterOperationHook<"media"> = ({
    operation,
    req,
    result,
}) => {
    if (
        !["update", "updateByID", "delete", "deleteByID"].includes(operation) ||
        req.context.disableRevalidate ||
        req.context.skipCloudStorage
    ) {
        return result;
    }

    // Run after the storage hooks finish. Media can appear in any content block
    // and in serialized globals/grids, so expire both public layouts and their data.
    for (const tag of [
        "global_header",
        "global_footer",
        "global_contact-details",
        BRANCHES_CACHE_TAG,
        POST_CARDS_CACHE_TAG,
    ]) {
        revalidateTag(tag, { expire: 0 });
    }
    revalidatePath("/(frontend)", "layout");
    revalidatePath("/(frontend-en)", "layout");

    return result;
};
