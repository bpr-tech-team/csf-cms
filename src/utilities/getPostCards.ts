import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@payload-config";

import { defaultLocale, type AppLocale } from "@/i18n/config";
import { postCardSelect, type PostCardData } from "./postCards";
import {
    defaultPostsGridState,
    POST_CARDS_CACHE_TAG,
    postCardsWhere,
    type PostCardsQuery,
    type PostCardsResult,
    type PostPageSize,
} from "./postsGrid";

// Keep rich text, authors and other media metadata out of the public card DTO.
function cardData({
    id,
    slug,
    title,
    excerpt,
    heroImage,
}: PostCardData): PostCardData {
    return {
        id,
        slug,
        title,
        excerpt,
        heroImage:
            heroImage && typeof heroImage === "object"
                ? {
                      id: heroImage.id,
                      url: heroImage.url,
                      alt: heroImage.alt,
                      width: heroImage.width,
                      height: heroImage.height,
                      mimeType: heroImage.mimeType,
                      createdAt: heroImage.createdAt,
                      updatedAt: heroImage.updatedAt,
                  }
                : heroImage,
    };
}

export async function getPostCards(
    query: PostCardsQuery,
): Promise<PostCardsResult> {
    const payload = await getPayload({ config });
    const options = {
        collection: "pages" as const,
        where: postCardsWhere(query.locale, query.q),
        locale: query.locale,
        fallbackLocale:
            query.locale === defaultLocale ? (false as const) : defaultLocale,
        draft: false,
        overrideAccess: false,
        depth: 1,
        limit: query.limit,
        select: postCardSelect,
        sort:
            query.sort === "oldest"
                ? ["publishedAt", "id"]
                : ["-publishedAt", "-id"],
    };
    let result = await payload.find({ ...options, page: query.page });
    // The SQL adapter's window count can be zero on an out-of-range page.
    // Recover the actual count before deciding that the whole list is empty.
    let totalDocs = result.totalDocs;
    if (query.page > 1 && !result.docs.length && !totalDocs) {
        ({ totalDocs } = await payload.count({
            collection: "pages",
            where: options.where,
            locale: options.locale,
            overrideAccess: false,
        }));
    }
    const lastPage = Math.max(1, Math.ceil(totalDocs / query.limit));
    if (query.page > lastPage && totalDocs > 0) {
        result = await payload.find({ ...options, page: lastPage });
    }
    const page = result.totalDocs ? (result.page ?? 1) : 1;
    return {
        docs: result.docs.map(cardData),
        page,
        limit: query.limit,
        totalDocs: result.totalDocs,
        totalPages: Math.max(1, result.totalPages),
        hasPrevPage: page > 1,
        hasNextPage: page < Math.max(1, result.totalPages),
    };
}

// Follow the existing ISR cache model; only the bounded initial queries persist.
export const getInitialPostCards = unstable_cache(
    (locale: AppLocale, limit: PostPageSize) =>
        getPostCards({ locale, limit, ...defaultPostsGridState }),
    ["posts-grid-initial"],
    { tags: [POST_CARDS_CACHE_TAG] },
);
