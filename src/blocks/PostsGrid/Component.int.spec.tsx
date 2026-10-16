import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { PostCardsResult } from "@/utilities/postsGrid";
import { PostsGridClient } from "./Component.client";

vi.mock("@/components/CollectionArchive", () => ({
    PostCardGrid: ({
        posts,
        theme,
    }: {
        posts: { id: number; title: string }[];
        theme: string;
    }) => (
        <div data-theme={theme}>
            {posts.map((post) => (
                <article key={post.id}>{post.title}</article>
            ))}
        </div>
    ),
}));

const initialData: PostCardsResult = {
    docs: [
        {
            id: 1,
            slug: "initial",
            title: "Initial post",
            heroImage: 1,
            excerpt: "Text",
        },
    ],
    page: 1,
    totalDocs: 15,
    totalPages: 3,
};
const result = (title: string, page = 1): PostCardsResult => ({
    ...initialData,
    docs: [{ ...initialData.docs[0], title }],
    page,
});
const respond = (data: PostCardsResult) =>
    Promise.resolve(new Response(JSON.stringify(data), { status: 200 }));

describe("posts grid interaction", () => {
    beforeEach(() => {
        window.history.replaceState(null, "", "/news?campaign=it#grid");
        vi.stubGlobal(
            "fetch",
            vi.fn(() => respond(result("Loaded post"))),
        );
        HTMLElement.prototype.scrollIntoView = vi.fn();
    });
    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });
    const mount = (blockId = "one") =>
        render(
            <PostsGridClient
                blockId={blockId}
                locale="en"
                limit={6}
                theme="dark"
                initialData={initialData}
            />,
        );

    it("includes initial cards in server HTML without an extra client request", () => {
        const html = renderToString(
            <PostsGridClient
                blockId="one"
                locale="en"
                limit={6}
                theme="dark"
                initialData={initialData}
            />,
        );
        expect(html).toContain("Initial post");
        expect(html).toContain('data-theme="dark"');
        mount();
        expect(fetch).not.toHaveBeenCalled();
    });

    it("debounces title search, resets pagination and preserves unrelated URL state", async () => {
        vi.useFakeTimers();
        mount();
        fireEvent.change(screen.getByRole("searchbox"), {
            target: { value: " cloud " },
        });
        expect(fetch).not.toHaveBeenCalled();
        await act(() => vi.advanceTimersByTimeAsync(300));
        expect(fetch).toHaveBeenCalledTimes(1);
        const query = new URL(
            vi.mocked(fetch).mock.calls[0][0] as string,
            "http://localhost",
        ).searchParams;
        expect(query.get("q")).toBe("cloud");
        expect(query.get("page")).toBe("1");
        expect(window.location.search).toContain("campaign=it");
        expect(window.location.hash).toBe("#grid");
    });

    it("combines sorting and pagination and restores browser history", async () => {
        mount();
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "oldest" },
        });
        await screen.findByText("Loaded post");
        expect(window.location.search).toContain("posts_one_sort=oldest");
        vi.mocked(fetch).mockImplementationOnce(() =>
            respond(result("Page two", 2)),
        );
        fireEvent.click(screen.getByRole("button", { name: "Next" }));
        await screen.findByText("Page two");
        expect(window.location.search).toContain("posts_one_page=2");
        act(() => {
            window.history.replaceState(null, "", "/news?posts_one_q=restored");
            window.dispatchEvent(new PopStateEvent("popstate"));
        });
        await waitFor(() =>
            expect(
                (screen.getByRole("searchbox") as HTMLInputElement).value,
            ).toBe("restored"),
        );
        expect((screen.getByRole("combobox") as HTMLSelectElement).value).toBe(
            "newest",
        );
    });

    it("keeps two blocks independent", async () => {
        mount("one");
        mount("two");
        const grids = document.querySelectorAll("[data-posts-grid]");
        fireEvent.change(
            within(grids[0] as HTMLElement).getByRole("searchbox"),
            { target: { value: "only one" } },
        );
        fireEvent.submit(within(grids[0] as HTMLElement).getByRole("search"));
        await within(grids[0] as HTMLElement).findByText("Loaded post");
        expect(
            within(grids[1] as HTMLElement).getByText("Initial post"),
        ).toBeTruthy();
        expect(window.location.search).not.toContain("posts_two_");
    });

    it("ignores an older response that arrives after a newer search", async () => {
        let resolveFirst!: (value: Response) => void;
        vi.mocked(fetch).mockImplementationOnce(
            () =>
                new Promise((resolve) => {
                    resolveFirst = resolve;
                }),
        );
        mount();
        fireEvent.change(screen.getByRole("searchbox"), {
            target: { value: "first" },
        });
        fireEvent.submit(screen.getByRole("search"));
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        fireEvent.change(screen.getByRole("searchbox"), {
            target: { value: "second" },
        });
        fireEvent.submit(screen.getByRole("search"));
        await screen.findByText("Loaded post");
        await act(async () =>
            resolveFirst(await respond(result("Stale post"))),
        );
        expect(screen.queryByText("Stale post")).toBeNull();
        expect(screen.getByText("Loaded post")).toBeTruthy();
    });

    it("distinguishes failed requests from empty results and supports retry", async () => {
        vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));
        mount();
        fireEvent.change(screen.getByRole("searchbox"), {
            target: { value: "missing" },
        });
        fireEvent.submit(screen.getByRole("search"));
        await screen.findByRole("alert");
        expect(screen.queryByText("Search produced no results.")).toBeNull();
        vi.mocked(fetch).mockImplementationOnce(() =>
            respond({ ...initialData, docs: [], totalDocs: 0, totalPages: 1 }),
        );
        fireEvent.click(screen.getByRole("button", { name: "Try again" }));
        await screen.findByText("Search produced no results.");
        expect(screen.queryByRole("navigation")).toBeNull();
    });
});
