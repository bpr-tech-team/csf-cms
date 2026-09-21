import configPromise from "@payload-config";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";

export async function getRedirects() {
    const payload = await getPayload({ config: configPromise });

    const { docs: redirects } = await payload.find({
        collection: "redirects",
        depth: 0,
        overrideAccess: false,
        limit: 0,
        pagination: false,
    });

    return redirects;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * Cache rules and target IDs only. Read target documents directly from Payload.
 */
export const getCachedRedirects = () =>
    unstable_cache(async () => getRedirects(), ["redirect-rules-v2"], {
        tags: ["redirects"],
    });
