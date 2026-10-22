type AnchorNavigationListener = (target: HTMLElement) => boolean;

const listeners = new Set<AnchorNavigationListener>();

const getTarget = (hash: string): HTMLElement | null => {
    let id: string;
    try {
        id = decodeURIComponent(hash.slice(1));
    } catch {
        return null;
    }

    return (
        document.getElementById(id) ??
        Array.from(document.getElementsByName(id)).find(
            (element) => element instanceof HTMLAnchorElement,
        ) ??
        (!id || id.toLowerCase() === "top" ? document.documentElement : null)
    );
};

const notify = (target: HTMLElement) => {
    let releasedLock = false;
    listeners.forEach((listener) => {
        releasedLock = listener(target) || releasedLock;
    });
    return releasedLock;
};

const onClick = (event: MouseEvent) => {
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
    ) {
        return;
    }

    const link = event.target.closest("a[href]");
    if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute("download") ||
        (link.target && link.target.toLowerCase() !== "_self")
    ) {
        return;
    }

    const url = new URL(link.href, window.location.href);
    if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        url.search !== window.location.search ||
        !url.href.includes("#")
    ) {
        return;
    }

    const target = getTarget(url.hash);
    if (target) notify(target);
};

const onHistoryNavigation = (event: Event) => {
    if (
        !window.location.hash &&
        !window.location.href.includes("#") &&
        event.type !== "hashchange"
    ) {
        // popstate precedes the browser's saved-position restoration. Release a
        // lock, but leave that restoration in control when there is no anchor.
        notify(document.documentElement);
        return;
    }
    const target = getTarget(window.location.hash);
    if (!target || !notify(target)) return;

    // Releasing a fixed body restores its old scroll position. Reapply a native
    // hash/history jump only when that restoration could have cancelled it.
    target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        block: "start",
    });
};

/** Prepare scroll-driven blocks before an anchor can start scrolling. */
export const subscribeToAnchorNavigation = (
    listener: AnchorNavigationListener,
) => {
    if (listeners.size === 0) {
        // Capture runs before React's SmoothHashLink/Next Link click handlers.
        // pushState itself does not emit hashchange.
        document.addEventListener("click", onClick, true);
        window.addEventListener("hashchange", onHistoryNavigation);
        window.addEventListener("popstate", onHistoryNavigation);
    }
    listeners.add(listener);

    if (window.location.hash) {
        const target = getTarget(window.location.hash);
        if (target) listener(target);
    }

    return () => {
        listeners.delete(listener);
        if (listeners.size > 0) return;
        document.removeEventListener("click", onClick, true);
        window.removeEventListener("hashchange", onHistoryNavigation);
        window.removeEventListener("popstate", onHistoryNavigation);
    };
};
