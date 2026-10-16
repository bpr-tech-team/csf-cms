"use client";

import { useEffect, useRef, useState } from "react";

import { PostCardGrid } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { PaginationControls } from "@/components/Pagination/Controls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import {
    defaultPostsGridState,
    POST_SEARCH_MAX_LENGTH,
    postQueryKey,
    type PostCardsResult,
    type PostPageSize,
    type PostSort,
} from "@/utilities/postsGrid";
import { usePostsGridState } from "./usePostsGridState";

type Props = {
    blockId: string;
    locale: AppLocale;
    limit: PostPageSize;
    theme: "light" | "dark";
    initialData: PostCardsResult | null;
};

export function PostsGridClient({
    blockId,
    locale,
    limit,
    theme,
    initialData,
}: Props) {
    const {
        state: { q, sort, page },
        updateState,
    } = usePostsGridState(blockId);
    const messages = frontendMessages[locale];
    const [retry, setRetry] = useState(0);
    const [reply, setReply] = useState<{
        key: string;
        initialData: Props["initialData"];
        retry: number;
        data: Props["initialData"];
        error: boolean;
    } | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const key = postQueryKey({ locale, limit, q, sort, page });
    const initialKey = postQueryKey({
        locale,
        limit,
        ...defaultPostsGridState,
    });
    const needsFetch = key !== initialKey || !initialData || retry > 0;
    const isCurrent =
        reply?.key === key &&
        reply.initialData === initialData &&
        reply.retry === retry;
    const loading = needsFetch && !isCurrent;
    const error =
        needsFetch && (isCurrent ? reply.error : !initialData && !reply);
    const data = needsFetch ? (reply?.data ?? initialData) : initialData;

    useEffect(() => {
        if (!needsFetch || isCurrent) return;
        const controller = new AbortController();
        const params = new URLSearchParams({
            locale,
            limit: String(limit),
            q,
            sort,
            page: String(page),
        });
        async function load() {
            try {
                const response = await fetch(`/api/post-cards?${params}`, {
                    signal: controller.signal,
                    cache: "no-store",
                });
                if (!response.ok)
                    throw new Error(`Post cards returned ${response.status}`);
                const result: PostCardsResult = await response.json();
                if (controller.signal.aborted) return;
                setReply({
                    key: postQueryKey({
                        locale,
                        limit,
                        q,
                        sort,
                        page: result.page,
                    }),
                    initialData,
                    retry,
                    data: result,
                    error: false,
                });
                if (result.page !== page)
                    updateState({ page: result.page }, "replace");
            } catch (_error) {
                if (!controller.signal.aborted) {
                    setReply((previous) => ({
                        key,
                        initialData,
                        retry,
                        data: previous?.data ?? initialData,
                        error: true,
                    }));
                }
            }
        }
        void load();
        return () => controller.abort();
    }, [
        locale,
        limit,
        q,
        sort,
        page,
        key,
        initialData,
        retry,
        needsFetch,
        isCurrent,
        updateState,
    ]);

    const navigate = (nextPage: number) => {
        updateState({ page: nextPage });
        resultsRef.current?.focus({ preventScroll: true });
        resultsRef.current?.scrollIntoView({ block: "start" });
    };

    return (
        <div data-posts-grid={blockId}>
            <SearchControls
                blockId={blockId}
                locale={locale}
                q={q}
                sort={sort}
                updateState={updateState}
            />
            <div
                ref={resultsRef}
                tabIndex={-1}
                role="region"
                className="mt-8 scroll-mt-28 outline-none"
                aria-busy={loading}
                aria-label={messages.postsTitle}
            >
                <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    className="mb-6 min-h-6"
                >
                    {loading ? (
                        messages.postsGrid.loading
                    ) : data && !error ? (
                        <PageRange
                            locale={locale}
                            currentPage={data.page}
                            limit={limit}
                            totalDocs={data.totalDocs}
                        />
                    ) : null}
                </div>
                {error && (
                    <div
                        role="alert"
                        className="mb-6 flex flex-wrap items-center gap-4"
                    >
                        <p>{messages.postsGrid.error}</p>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setRetry((value) => value + 1)}
                        >
                            {messages.postsGrid.retry}
                        </Button>
                    </div>
                )}
                {data && (
                    <PostCardGrid
                        posts={data.docs}
                        locale={locale}
                        theme={theme}
                    />
                )}
                {data && data.totalPages > 1 && (
                    <div className="mt-10">
                        <PaginationControls
                            locale={locale}
                            page={data.page}
                            totalPages={data.totalPages}
                            onPageChange={navigate}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function SearchControls({
    blockId,
    locale,
    q,
    sort,
    updateState,
}: {
    blockId: string;
    locale: AppLocale;
    q: string;
    sort: PostSort;
    updateState: ReturnType<typeof usePostsGridState>["updateState"];
}) {
    const messages = frontendMessages[locale].postsGrid;
    const inputRef = useRef<HTMLInputElement>(null);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cancelSearch = () => {
        if (timer.current) clearTimeout(timer.current);
    };

    useEffect(() => {
        if (inputRef.current) inputRef.current.value = q;
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [q]);

    return (
        <form
            role="search"
            aria-label={messages.search}
            className="flex flex-col gap-5 sm:flex-row sm:items-end"
            onSubmit={(event) => {
                event.preventDefault();
                cancelSearch();
                updateState(
                    { q: inputRef.current?.value.trim() ?? "", page: 1 },
                    "replace",
                );
            }}
        >
            <div className="flex-1">
                <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor={`posts-search-${blockId}`}
                >
                    {messages.search}
                </label>
                <div className="flex gap-2">
                    <Input
                        ref={inputRef}
                        id={`posts-search-${blockId}`}
                        type="search"
                        defaultValue={q}
                        maxLength={POST_SEARCH_MAX_LENGTH}
                        placeholder={messages.placeholder}
                        className="h-12 bg-card text-card-foreground"
                        onChange={(event) => {
                            cancelSearch();
                            const value = event.currentTarget.value.trim();
                            timer.current = setTimeout(
                                () =>
                                    updateState(
                                        { q: value, page: 1 },
                                        "replace",
                                    ),
                                300,
                            );
                        }}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            cancelSearch();
                            if (inputRef.current) {
                                inputRef.current.value = "";
                                inputRef.current.focus();
                            }
                            updateState({ q: "", page: 1 }, "replace");
                        }}
                    >
                        {messages.clear}
                    </Button>
                </div>
            </div>
            <div>
                <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor={`posts-sort-${blockId}`}
                >
                    {messages.sort}
                </label>
                <select
                    id={`posts-sort-${blockId}`}
                    value={sort}
                    className="h-12 w-full rounded-md border border-input bg-card px-3 text-sm text-card-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:min-w-48"
                    onChange={(event) => {
                        cancelSearch();
                        updateState({
                            q: inputRef.current?.value.trim() ?? q,
                            sort: event.target.value as PostSort,
                            page: 1,
                        });
                    }}
                >
                    <option value="newest">{messages.newest}</option>
                    <option value="oldest">{messages.oldest}</option>
                </select>
            </div>
        </form>
    );
}
