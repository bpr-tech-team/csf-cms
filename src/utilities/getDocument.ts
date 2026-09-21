import configPromise from "@payload-config";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { getPayload } from "payload";

/** Read the current public target without caching its URL or publication state. */
export async function getDocument(
    collection: "pages" | "posts",
    id: number | string,
    locale: AppLocale = defaultLocale,
) {
    const payload = await getPayload({ config: configPromise });

    return payload.findByID({
        collection,
        depth: 0,
        disableErrors: true,
        draft: false,
        fallbackLocale: locale === defaultLocale ? false : defaultLocale,
        id,
        locale,
        overrideAccess: false,
    });
}
