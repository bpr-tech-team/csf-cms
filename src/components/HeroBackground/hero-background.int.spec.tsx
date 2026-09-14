import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { HeroBackground } from "@/components/HeroBackground";
import { HomepageHero } from "@/blocks/HomepageHero/Component";
import type { HomepageHeroBlock, Media } from "@/payload-types";

class MediaPreference extends EventTarget {
    matches = false;

    set(matches: boolean) {
        this.matches = matches;
        this.dispatchEvent(new Event("change"));
    }
}

let reducedMotion: MediaPreference;
let hidden = false;
let observers: {
    callback: IntersectionObserverCallback;
    disconnect: ReturnType<typeof vi.fn>;
}[];

beforeEach(() => {
    reducedMotion = new MediaPreference();
    hidden = false;
    observers = [];
    vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
    vi.stubGlobal("matchMedia", () => reducedMotion);
    vi.stubGlobal(
        "IntersectionObserver",
        class {
            disconnect = vi.fn();
            observe = vi.fn();

            constructor(callback: IntersectionObserverCallback) {
                observers.push({ callback, disconnect: this.disconnect });
            }
        },
    );
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
});

const intersect = (isIntersecting: boolean) =>
    act(() => {
        const observer = observers.at(-1)!;
        observer.callback(
            [{ isIntersecting } as IntersectionObserverEntry],
            observer as unknown as IntersectionObserver,
        );
    });

const changeVisibility = (isHidden: boolean) =>
    act(() => {
        hidden = isHidden;
        document.dispatchEvent(new Event("visibilitychange"));
    });

const mountHero = () => {
    const onAutoplayChange = vi.fn();
    const result = render(
        <section aria-label="Hero">
            <HeroBackground onAutoplayChange={onAutoplayChange} />
            <button type="button">Contact</button>
        </section>,
    );
    const motion =
        result.container.querySelector<HTMLDivElement>("[data-running]")!;
    return { ...result, motion, onAutoplayChange };
};

const homepage: HomepageHeroBlock = {
    autoplay: true,
    autoplayInterval: 7000,
    blockType: "homepageHero",
    intro: { heading: "About us", description: "Introduction" },
    slides: [
        { heading: "First slide", description: "First description" },
        { heading: "Second slide", description: "Second description" },
    ],
};

describe("Hero background", () => {
    test("resumes the same progress animation after the hero leaves and reenters the viewport", () => {
        const { container } = render(
            <HomepageHero {...homepage} locale="en" />,
        );
        const progress = container.querySelector<HTMLSpanElement>(
            'span[style*="--homepage-hero-progress-duration"]',
        )!;
        expect(progress.style.animationPlayState).toBe("paused");
        intersect(true);
        expect(progress.style.animationPlayState).toBe("running");
        intersect(false);
        expect(progress.style.animationPlayState).toBe("paused");
        intersect(true);
        expect(progress.style.animationPlayState).toBe("running");
        expect(
            container.querySelector(
                'span[style*="--homepage-hero-progress-duration"]',
            ),
        ).toBe(progress);
        expect(
            screen.getByRole("heading", { name: "First slide" }),
        ).toBeTruthy();
        fireEvent.animationEnd(progress);
        expect(
            screen.getByRole("heading", { name: "Second slide" }),
        ).toBeTruthy();
    });

    test("only animates a visible hero in a visible tab, respecting live motion preferences", () => {
        const { motion, onAutoplayChange } = mountHero();
        expect(motion.dataset.running).toBe("false");

        intersect(true);
        expect(motion.dataset.running).toBe("true");
        expect(onAutoplayChange).toHaveBeenLastCalledWith(true);

        changeVisibility(true);
        expect(motion.dataset.running).toBe("false");
        intersect(false);
        changeVisibility(false);
        expect(motion.dataset.running).toBe("false");
        intersect(true);
        expect(motion.dataset.running).toBe("true");

        act(() => reducedMotion.set(true));
        expect(motion.dataset.running).toBe("false");
        changeVisibility(true);
        changeVisibility(false);
        expect(motion.dataset.running).toBe("false");
        act(() => reducedMotion.set(false));
        expect(motion.dataset.running).toBe("true");
    });

    test("removes subscriptions on unmount", () => {
        const { onAutoplayChange, unmount } = mountHero();
        intersect(true);

        unmount();
        onAutoplayChange.mockClear();
        changeVisibility(true);
        act(() => reducedMotion.set(true));
        expect(onAutoplayChange).not.toHaveBeenCalled();
        expect(
            observers.every(
                ({ disconnect }) => disconnect.mock.calls.length === 1,
            ),
        ).toBe(true);
    });

    test("keeps autoplay running on hover and pauses only slide changes on focus", () => {
        const { motion, onAutoplayChange } = mountHero();
        intersect(true);
        const hero = screen.getByRole("region", { name: "Hero" });
        const link = screen.getByRole("button", { name: "Contact" });

        fireEvent.mouseEnter(hero);
        expect(motion.dataset.running).toBe("true");
        expect(onAutoplayChange).toHaveBeenLastCalledWith(true);
        act(() => link.focus());
        expect(motion.dataset.running).toBe("true");
        expect(onAutoplayChange).toHaveBeenLastCalledWith(false);
        fireEvent.mouseLeave(hero);
        expect(motion.dataset.running).toBe("true");
        expect(onAutoplayChange).toHaveBeenLastCalledWith(false);
        act(() => link.blur());
        expect(motion.dataset.running).toBe("true");
        expect(onAutoplayChange).toHaveBeenLastCalledWith(true);
    });

    test("loads the decorative cover eagerly with responsive sources and lower quality", () => {
        const resource: Media = {
            id: 1,
            alt: "An image description from the CMS",
            mimeType: "image/webp",
            url: "/api/media/file/hero.webp",
            width: 1600,
            height: 900,
            createdAt: "2026-09-14T00:00:00.000Z",
            updatedAt: "2026-09-14T00:00:00.000Z",
        };
        const { container } = render(
            <section>
                <HeroBackground isPageIntro resource={resource} />
            </section>,
        );
        const image = container.querySelector("img")!;
        expect(image.alt).toBe("");
        expect(image.closest('[aria-hidden="true"]')).not.toBeNull();
        expect(image.getAttribute("loading")).toBe("eager");
        expect(image.getAttribute("fetchpriority")).toBe("high");
        expect(image.sizes).toBe("100vw");
        expect(image.srcset).toContain("q=75");
        expect(screen.queryByRole("img")).toBeNull();
    });

    test("keeps particles moving while selecting slides and resumes autoplay after focus leaves", () => {
        const { container } = render(
            <HomepageHero {...homepage} locale="en" />,
        );
        const motion =
            container.querySelector<HTMLDivElement>("[data-running]")!;
        intersect(true);

        const slideButton = screen.getByRole("button", { name: "Slide 2" });
        act(() => slideButton.focus());
        fireEvent.click(slideButton);
        expect(container.querySelector("[data-running]")).toBe(motion);
        expect(motion.dataset.running).toBe("true");
        const progress = container.querySelector<HTMLSpanElement>(
            'span[style*="--homepage-hero-progress-duration"]',
        )!;
        expect(progress.style.animationPlayState).toBe("paused");
        expect(
            screen.getByRole("heading", { name: "Second slide" }),
        ).toBeTruthy();

        act(() => slideButton.blur());
        expect(progress.style.animationPlayState).toBe("running");
        fireEvent.animationEnd(progress);
        expect(
            screen.getByRole("heading", { name: "First slide" }),
        ).toBeTruthy();
    });
});
