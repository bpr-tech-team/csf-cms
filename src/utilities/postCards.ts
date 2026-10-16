import type { Page, PagesSelect } from "@/payload-types";

export type PostCardData = Pick<
    Page,
    "id" | "slug" | "heroImage" | "excerpt" | "title"
>;

export const postCardSelect = {
    title: true,
    slug: true,
    heroImage: true,
    excerpt: true,
    _status: true,
    pageType: true,
} as const satisfies PagesSelect<true>;

export const getRelatedPostCards = (
    post: Pick<Page, "id" | "relatedPosts">,
): PostCardData[] =>
    (post.relatedPosts ?? [])
        .filter(
            (related): related is Page =>
                Boolean(related) &&
                typeof related === "object" &&
                related.id !== post.id &&
                related.pageType === "post" &&
                related._status === "published" &&
                Boolean(related.slug),
        )
        .map(({ id, slug, title, heroImage, excerpt }) => ({
            id,
            slug,
            title,
            heroImage,
            excerpt,
        }));
