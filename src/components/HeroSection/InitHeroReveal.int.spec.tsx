import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InitHeroReveal } from "./InitHeroReveal";

const observers: MutationObserver[] = [];
const NativeObserver = window.MutationObserver;

beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
        "MutationObserver",
        class extends NativeObserver {
            constructor(callback: MutationCallback) {
                super(callback);
                observers.push(this);
            }
        },
    );
});

afterEach(() => {
    observers.splice(0).forEach((observer) => observer.disconnect());
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
    document.documentElement.removeAttribute("data-hero-reveal-enabled");
});

const flush = async () => {
    await Promise.resolve();
    await Promise.resolve();
};

function initialize() {
    const container = document.createElement("div");
    container.innerHTML = renderToStaticMarkup(<InitHeroReveal />);
    window.eval(container.querySelector("script")!.textContent!);
}

function createHero({ cached = false } = {}) {
    const section = document.createElement("section");
    section.dataset.heroReveal = "pending";
    const image = document.createElement("img");
    image.dataset.heroImage = "";
    image.src = "/hero.webp";
    Object.defineProperties(image, {
        complete: { configurable: true, value: cached },
        naturalWidth: { configurable: true, value: 1920 },
    });
    let decoded!: () => void;
    const decode = vi.fn(
        () => new Promise<void>((resolve) => (decoded = resolve)),
    );
    image.decode = decode;
    section.append(image, document.createElement("h1"));
    document.body.append(section);
    return { section, image, decode, decoded: () => decoded() };
}

describe("atomic hero reveal without Next.js hydration", () => {
    it("waits for both image load and decode before revealing streamed content", async () => {
        initialize();
        const hero = createHero();
        await flush();
        expect(
            document.documentElement.hasAttribute("data-hero-reveal-enabled"),
        ).toBe(true);
        expect(hero.section.dataset.heroReveal).toBe("pending");
        expect(hero.decode).not.toHaveBeenCalled();
        hero.image.dispatchEvent(new Event("load"));
        expect(hero.section.dataset.heroReveal).toBe("pending");
        hero.decoded();
        await flush();
        expect(hero.section.dataset.heroReveal).toBe("ready");
    });

    it("handles an already cached image without waiting for another load event", async () => {
        const hero = createHero({ cached: true });
        initialize();
        expect(hero.decode).toHaveBeenCalledOnce();
        hero.decoded();
        await flush();
        expect(hero.section.dataset.heroReveal).toBe("ready");
    });

    it("releases text on an image error", async () => {
        initialize();
        const hero = createHero();
        await flush();
        hero.image.dispatchEvent(new Event("error"));
        expect(hero.section.dataset.heroReveal).toBe("error");
    });

    it("releases text on a decoding error", async () => {
        initialize();
        const hero = createHero();
        hero.image.decode = vi
            .fn()
            .mockRejectedValue(new Error("Invalid image"));
        await flush();
        hero.image.dispatchEvent(new Event("load"));
        await flush();
        expect(hero.section.dataset.heroReveal).toBe("error");
    });

    it("falls back after a stalled request and never reveals a late photo", async () => {
        initialize();
        const hero = createHero();
        await flush();
        vi.advanceTimersByTime(8000);
        expect(hero.section.dataset.heroReveal).toBe("error");
        hero.image.dispatchEvent(new Event("load"));
        expect(hero.decode).not.toHaveBeenCalled();
        expect(hero.section.dataset.heroReveal).toBe("error");
    });

    it("watches a newly inserted route and ignores the previous source's decode", async () => {
        initialize();
        const hero = createHero();
        await flush();
        hero.image.dispatchEvent(new Event("load"));
        const decodedPrevious = hero.decoded;
        // Keep a separate reference to the pending decode's resolver.
        const firstDecode = hero.decode.mock.results[0].value;
        hero.image.src = "/next-hero.webp";
        await flush();
        decodedPrevious();
        await firstDecode;
        await flush();
        expect(hero.section.dataset.heroReveal).toBe("pending");
        hero.image.dispatchEvent(new Event("load"));
        hero.decoded();
        await flush();
        expect(hero.section.dataset.heroReveal).toBe("ready");

        const nextRoute = createHero({ cached: true });
        await flush();
        nextRoute.decoded();
        await flush();
        expect(nextRoute.section.dataset.heroReveal).toBe("ready");
    });
});
