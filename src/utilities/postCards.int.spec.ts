import { describe, expect, it } from "vitest";

import type { Page } from "@/payload-types";
import { getRelatedPostCards } from "./postCards";
import { isVisibleContentBlock, resolveBlockSpacing } from "./blockSpacing";

const related = (id: number, status: Page["_status"] = "published"): Page => ({
    id,
    pageType: "post",
    title: `Post ${id}`,
    slug: `post-${id}`,
    heroImage: 1,
    excerpt: `Excerpt ${id}`,
    layout: [{ blockType: "flexibleContent", theme: "light", heading: "Body" }],
    createdAt: "2026-10-15T00:00:00Z",
    updatedAt: "2026-10-15T00:00:00Z",
    _status: status,
});

describe("related post cards", () => {
    it("preserves selection order, excluding drafts, inaccessible IDs and the article itself", () => {
        const cards = getRelatedPostCards({
            id: 1,
            relatedPosts: [
                related(3),
                related(1),
                99,
                related(2, "draft"),
                related(4),
                { ...related(5), pageType: "service" },
            ],
        });
        expect(cards.map(({ id }) => id)).toEqual([3, 4]);
        expect(cards[0]).toMatchObject({
            title: "Post 3",
            excerpt: "Excerpt 3",
            heroImage: 1,
        });
        expect(cards[0]).not.toHaveProperty("layout");
    });

    it("does not render an empty related section or reserve its spacing", () => {
        const block = { blockType: "relatedPosts" } as const;
        const content = {
            blockType: "flexibleContent",
            theme: "light",
        } as const;
        expect(isVisibleContentBlock(block, undefined, [])).toBe(false);
        const cards = getRelatedPostCards({
            id: 1,
            relatedPosts: [related(2)],
        });
        expect(isVisibleContentBlock(block, undefined, cards)).toBe(true);
        expect(resolveBlockSpacing(block, content)).toEqual({
            top: "none",
            bottom: "auto",
        });
    });
});
