import type { Where } from "payload";

import { defaultLocale, isLocale, type AppLocale } from "@/i18n/config";
import type { PostCardData } from "./postCards";

export const POST_CARDS_CACHE_TAG = "post-cards";
export const POST_SEARCH_MAX_LENGTH = 200;
export const postPageSizes = [6, 12, 24] as const;
export type PostPageSize = (typeof postPageSizes)[number];
export type PostSort = "newest" | "oldest";
export type PostsGridState = { q: string; sort: PostSort; page: number };
export type PostCardsQuery = PostsGridState & {
    locale: AppLocale;
    limit: PostPageSize;
};
export type PostCardsResult = {
    docs: PostCardData[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export const defaultPostsGridState: PostsGridState = {
    q: "",
    sort: "newest",
    page: 1,
};

export const isPostPageSize = (value: number): value is PostPageSize =>
    postPageSizes.some((size) => size === value);

export const isPostPage = (value: number) =>
    Number.isSafeInteger(value) && value > 0;

export const postQueryKey = (query: PostCardsQuery) =>
    JSON.stringify([
        query.locale,
        query.limit,
        query.q,
        query.sort,
        query.page,
    ]);

export function parsePostCardsQuery(
    params: URLSearchParams,
): PostCardsQuery | null {
    const locale = params.get("locale") ?? defaultLocale;
    const limit = Number(params.get("limit") ?? 12);
    const page = Number(params.get("page") ?? 1);
    const sort = params.get("sort") ?? "newest";
    const q = (params.get("q") ?? "").trim();
    if (
        !isLocale(locale) ||
        !isPostPageSize(limit) ||
        !isPostPage(page) ||
        (sort !== "newest" && sort !== "oldest") ||
        q.length > POST_SEARCH_MAX_LENGTH
    ) {
        return null;
    }
    return { locale, limit, page, sort, q };
}

export function postCardsWhere(locale: AppLocale, q: string): Where {
    const and: Where[] = [
        { pageType: { equals: "post" } },
        { _status: { equals: "published" } },
    ];
    if (q) {
        // Payload applies fallback to returned values, not to WHERE clauses.
        // Search Czech only when the displayed English title falls back to it.
        and.push(
            locale === defaultLocale
                ? { title: { contains: q } }
                : {
                      or: [
                          { "title.en": { contains: q } },
                          {
                              and: [
                                  {
                                      or: [
                                          { "title.en": { exists: false } },
                                          { "title.en": { equals: "" } },
                                      ],
                                  },
                                  { "title.cs": { contains: q } },
                              ],
                          },
                      ],
                  },
        );
    }
    return { and };
}

export function readPostsGridState(
    search: string,
    blockId: string,
): PostsGridState {
    const params = new URLSearchParams(search);
    const prefix = `posts_${blockId}_`;
    const page = Number(params.get(`${prefix}page`) ?? 1);
    return {
        q: (params.get(`${prefix}q`) ?? "")
            .trim()
            .slice(0, POST_SEARCH_MAX_LENGTH),
        sort: params.get(`${prefix}sort`) === "oldest" ? "oldest" : "newest",
        page: isPostPage(page) ? page : 1,
    };
}

export function writePostsGridState(
    url: URL,
    blockId: string,
    state: PostsGridState,
) {
    const next = new URL(url);
    const prefix = `posts_${blockId}_`;
    for (const [name, value] of Object.entries(state)) {
        const key = `${prefix}${name}`;
        if (value === defaultPostsGridState[name as keyof PostsGridState]) {
            next.searchParams.delete(key);
        } else {
            next.searchParams.set(key, String(value));
        }
    }
    return `${next.pathname}${next.search}${next.hash}`;
}
