"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
    readPostsGridState,
    writePostsGridState,
    type PostsGridState,
} from "@/utilities/postsGrid";

const changeEvent = "posts-grid-url-change";
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";
const subscribe = (listener: () => void) => {
    window.addEventListener("popstate", listener);
    window.addEventListener(changeEvent, listener);
    return () => {
        window.removeEventListener("popstate", listener);
        window.removeEventListener(changeEvent, listener);
    };
};

export function usePostsGridState(blockId: string) {
    // The server snapshot keeps the initial cards in HTML and hydrates identically.
    const search = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );
    const updateState = useCallback(
        (patch: Partial<PostsGridState>, mode: "push" | "replace" = "push") => {
            const url = new URL(window.location.href);
            const next = writePostsGridState(url, blockId, {
                ...readPostsGridState(url.search, blockId),
                ...patch,
            });
            if (next === `${url.pathname}${url.search}${url.hash}`) return;
            if (mode === "replace") window.history.replaceState(null, "", next);
            else window.history.pushState(null, "", next);
            window.dispatchEvent(new Event(changeEvent));
        },
        [blockId],
    );
    return { state: readPostsGridState(search, blockId), updateState };
}
