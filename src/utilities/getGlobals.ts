import type { Config } from "src/payload-types";

import configPromise from "@payload-config";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { type DataFromGlobalSlug, getPayload } from "payload";
import { unstable_cache } from "next/cache";

type Global = keyof Config["globals"];

async function getGlobal<T extends Global>(
    slug: T,
    depth = 0,
    locale: AppLocale = defaultLocale,
): Promise<DataFromGlobalSlug<T>> {
    const payload = await getPayload({ config: configPromise });

    const global = await payload.findGlobal({
        slug,
        depth,
        locale,
        draft: false,
        // Navigation must only resolve documents available to public visitors.
        overrideAccess: false,
    });

    return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(
    slug: T,
    depth = 0,
    locale: AppLocale = defaultLocale,
) =>
    unstable_cache(
        async () => getGlobal<T>(slug, depth, locale),
        ["public-global", slug, String(depth), locale],
        {
            tags: [`global_${slug}`, `global_${slug}_${locale}`],
        },
    );
