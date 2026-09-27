import type { CollectionBeforeDeleteHook, PayloadRequest } from "payload";

import {
    defaultLocale,
    isLocale,
    locales,
    withLocalePrefix,
    type AppLocale,
} from "@/i18n/config";
import type { Page } from "@/payload-types";
import { getPageRoutePaths } from "@/utilities/getPagePath";

type DocumentCollection = "pages" | "posts";
type Slugs = Partial<Record<AppLocale, string | null>>;
type DocumentPaths = {
    id: number | string;
    slug?: string | null | Slugs;
    pageType?: Page["pageType"];
};

const localizedSlugs = (
    slug: DocumentPaths["slug"],
    locale: AppLocale,
): Slugs => (typeof slug === "object" && slug ? slug : { [locale]: slug });

const documentPaths = (collection: DocumentCollection, doc: DocumentPaths) => {
    const slugs = localizedSlugs(doc.slug, defaultLocale);
    const paths = new Set<string>();

    for (const locale of locales) {
        // Also invalidate the default-language slug under /en: it may be a
        // cached fallback page or a redirect to the translated slug.
        const localeSlugs = new Set([
            slugs[locale],
            ...(locale !== defaultLocale ? [slugs[defaultLocale]] : []),
        ]);

        for (const slug of localeSlugs) {
            if (!slug) continue;

            const encodedSlug = encodeURIComponent(slug);
            if (collection === "posts") {
                paths.add(withLocalePrefix(`/posts/${encodedSlug}`, locale));
            } else {
                for (const path of getPageRoutePaths(
                    { slug, pageType: doc.pageType },
                    locale,
                )) {
                    paths.add(path);
                }
            }
        }
    }

    return [...paths];
};

export const getDocumentRevalidationPaths = async (
    collection: DocumentCollection,
    doc: DocumentPaths,
    req: PayloadRequest,
) => {
    const locale = isLocale(req.locale) ? req.locale : defaultLocale;
    const storedDoc = await req.payload.findByID({
        collection,
        id: doc.id,
        locale: "all",
        fallbackLocale: false,
        draft: false,
        depth: 0,
        select:
            collection === "pages"
                ? { slug: true, pageType: true }
                : { slug: true },
        // Internal cache maintenance must also see unpublished documents.
        overrideAccess: true,
        // Payload mutates req.locale for Local API calls. Preserve the outer
        // locale while sharing its transaction and hook context.
        req: { ...req },
    });

    return documentPaths(collection, {
        ...storedDoc,
        ...doc,
        // previousDoc supplies the old slug on unpublish or rename.
        // Other locales have not changed and come from the same transaction.
        slug: {
            ...localizedSlugs(storedDoc.slug, defaultLocale),
            ...(doc.slug !== undefined ? localizedSlugs(doc.slug, locale) : {}),
        },
    });
};

const deletionKey = (collection: DocumentCollection, id: number | string) =>
    `documentRevalidation:${collection}:${id}`;

export const captureDocumentPathsBeforeDelete =
    (collection: DocumentCollection): CollectionBeforeDeleteHook =>
    async ({ id, req }) => {
        if (req.context.disableRevalidate) return;

        req.context[deletionKey(collection, id)] =
            await getDocumentRevalidationPaths(collection, { id }, req);
    };

export const takeDeletedDocumentPaths = (
    collection: DocumentCollection,
    id: number | string,
    req: PayloadRequest,
): string[] => {
    const key = deletionKey(collection, id);
    const paths = req.context[key] as string[] | undefined;
    delete req.context[key];
    return paths ?? [];
};
