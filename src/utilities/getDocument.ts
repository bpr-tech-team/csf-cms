import type { Config } from "src/payload-types";

import configPromise from "@payload-config";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { getPayload } from "payload";
import { unstable_cache } from "next/cache";

type Collection = keyof Config["collections"];

async function getDocument(
    collection: Collection,
    id: number | string,
    depth = 0,
    locale: AppLocale = defaultLocale,
) {
    const payload = await getPayload({ config: configPromise });

    const document = await payload.findByID({
        collection,
        depth,
        fallbackLocale: locale === defaultLocale ? false : defaultLocale,
        id,
        locale,
    });

    return document;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the document ID
 */
export const getCachedDocument = (
    collection: Collection,
    id: number | string,
    locale: AppLocale = defaultLocale,
) =>
    unstable_cache(
        async () => getDocument(collection, id, 0, locale),
        [collection, String(id), locale],
        {
            tags: [`${collection}_${id}`, `${collection}_${id}_${locale}`],
        },
    );
