import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { subscribeToAnchorNavigation } from "./anchorNavigation";

const subscriptions: (() => void)[] = [];
const scrollIntoView = vi.fn();
const originalScrollIntoView = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "scrollIntoView",
);

const subscribe = (listener: (target: HTMLElement) => boolean) => {
    const unsubscribe = subscribeToAnchorNavigation(listener);
    subscriptions.push(unsubscribe);
    return unsubscribe;
};

const click = (
    href: string,
    options: MouseEventInit = {},
    attributes: Record<string, string> = {},
    onClick?: (event: MouseEvent) => void,
) => {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    for (const [name, value] of Object.entries(attributes)) {
        link.setAttribute(name, value);
    }
    const label = document.createElement("span");
    link.append(label);
    document.body.append(link);
    link.addEventListener("click", (event) => {
        onClick?.(event);
        // Keep jsdom from scheduling a native navigation after the assertion.
        event.preventDefault();
    });
    label.dispatchEvent(
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            button: 0,
            ...options,
        }),
    );
    link.remove();
};

beforeEach(() => {
    vi.clearAllMocks();
    scrollIntoView.mockReset();
    window.history.replaceState(null, "", "/anchor-test?view=all");
    document.body.innerHTML = '<section id="target"></section>';
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
        configurable: true,
        writable: true,
        value: scrollIntoView,
    });
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
});

afterEach(() => {
    subscriptions.splice(0).forEach((unsubscribe) => unsubscribe());
    document.body.innerHTML = "";
    window.history.replaceState(null, "", "/");
    if (originalScrollIntoView) {
        Object.defineProperty(
            HTMLElement.prototype,
            "scrollIntoView",
            originalScrollIntoView,
        );
    } else {
        delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
    }
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("anchor navigation", () => {
    it("notifies before a link's click handler, including repeated navigation to the same hash", () => {
        const order: string[] = [];
        subscribe((target) => {
            expect(target).toBe(document.getElementById("target"));
            order.push("release");
            return true;
        });
        const onClick = (event: MouseEvent) => {
            expect(event.defaultPrevented).toBe(false);
            order.push("click");
        };

        click("#target", {}, {}, onClick);
        window.history.replaceState(null, "", "#target");
        click("#target", {}, {}, onClick);

        expect(order).toEqual(["release", "click", "release", "click"]);
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it("recognizes same-page path and absolute links without changing the URL itself", () => {
        const listener = vi.fn(() => false);
        subscribe(listener);
        const href = window.location.href;

        click("/anchor-test?view=all#target");
        click(`${window.location.origin}/anchor-test?view=all#target`);

        expect(listener).toHaveBeenCalledTimes(2);
        expect(window.location.href).toBe(href);
    });

    it("ignores modified clicks, other destinations, downloads and new tabs", () => {
        const listener = vi.fn(() => false);
        subscribe(listener);

        for (const options of [
            { button: 1 },
            { ctrlKey: true },
            { metaKey: true },
            { shiftKey: true },
            { altKey: true },
        ]) {
            click("#target", options);
        }
        for (const href of [
            "https://example.invalid/anchor-test?view=all#target",
            "/other?view=all#target",
            "/anchor-test?view=other#target",
            "/anchor-test?view=all",
        ]) {
            click(href);
        }
        click("#target", {}, { download: "" });
        click("#target", {}, { target: "_blank" });

        expect(listener).not.toHaveBeenCalled();
    });

    it("applies the initial decoded hash to every subscriber and supports named anchors", () => {
        document.body.innerHTML =
            '<section id="část"></section><a name="legacy"></a>';
        window.history.replaceState(null, "", "#%C4%8D%C3%A1st");
        const first = vi.fn(() => false);
        const second = vi.fn(() => false);
        subscribe(first);
        subscribe(second);

        expect(first).toHaveBeenCalledWith(document.getElementById("část"));
        expect(second).toHaveBeenCalledWith(document.getElementById("část"));
        click("#legacy");
        expect(first).toHaveBeenLastCalledWith(
            document.querySelector('[name="legacy"]'),
        );
    });

    it("treats an empty fragment and the legacy top fragment as navigation to the root", () => {
        const listener = vi.fn(() => false);
        subscribe(listener);

        click("#");
        click("#top");

        expect(listener).toHaveBeenCalledTimes(2);
        expect(listener).toHaveBeenNthCalledWith(1, document.documentElement);
        expect(listener).toHaveBeenNthCalledWith(2, document.documentElement);
    });

    it("ignores missing and malformed targets without changing scroll", () => {
        const listener = vi.fn(() => true);
        subscribe(listener);

        for (const hash of ["#missing", "#%E0%A4%A"]) {
            click(hash);
            window.history.replaceState(null, "", hash);
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        }

        expect(listener).not.toHaveBeenCalled();
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it("corrects native history navigation only after all active locks have been released", () => {
        const order: string[] = [];
        subscribe(() => {
            order.push("first");
            return true;
        });
        subscribe(() => {
            order.push("second");
            return false;
        });
        scrollIntoView.mockImplementation(() => order.push("scroll"));
        window.history.replaceState(null, "", "#target");

        window.dispatchEvent(new HashChangeEvent("hashchange"));
        expect(order).toEqual(["first", "second", "scroll"]);
        expect(scrollIntoView).toHaveBeenLastCalledWith({
            behavior: "smooth",
            block: "start",
        });

        order.length = 0;
        vi.mocked(window.matchMedia).mockReturnValue({
            matches: true,
        } as MediaQueryList);
        window.dispatchEvent(new PopStateEvent("popstate"));
        expect(order).toEqual(["first", "second", "scroll"]);
        expect(scrollIntoView).toHaveBeenLastCalledWith({
            behavior: "instant",
            block: "start",
        });
    });

    it("does not reissue native scrolling when no listener released a lock", () => {
        const listener = vi.fn(() => false);
        subscribe(listener);
        window.history.replaceState(null, "", "#target");

        window.dispatchEvent(new HashChangeEvent("hashchange"));

        expect(listener).toHaveBeenCalledWith(
            document.getElementById("target"),
        );
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it("releases history navigation without an anchor without overriding saved-position restoration", () => {
        const listener = vi.fn(() => true);
        subscribe(listener);

        window.dispatchEvent(new PopStateEvent("popstate"));

        expect(listener).toHaveBeenCalledWith(document.documentElement);
        expect(scrollIntoView).not.toHaveBeenCalled();
    });

    it("keeps shared listeners until the final subscriber leaves and cleans them up", () => {
        const first = vi.fn(() => false);
        const second = vi.fn(() => false);
        const unsubscribeFirst = subscribe(first);
        const unsubscribeSecond = subscribe(second);
        unsubscribeFirst();

        click("#target");
        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledTimes(1);

        unsubscribeSecond();
        click("#target");
        window.history.replaceState(null, "", "#target");
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        window.dispatchEvent(new PopStateEvent("popstate"));
        expect(second).toHaveBeenCalledTimes(1);
    });
});
