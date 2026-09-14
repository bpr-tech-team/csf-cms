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
let hover: MediaPreference;
let hidden = false;
let observers: {
    callback: IntersectionObserverCallback;
    disconnect: ReturnType<typeof vi.fn>;
}[];

beforeEach(() => {
    reducedMotion = new MediaPreference();
    hover = new MediaPreference();
    hidden = false;
    observers = [];
    vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
    vi.stubGlobal("matchMedia", (query: string) =>
        query.includes("prefers-reduced-motion") ? reducedMotion : hover,
    );
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
    test("resumes the remaining slide interval after the hero leaves and reenters the viewport", () => {
        vi.useFakeTimers();
        render(<HomepageHero {...homepage} locale="en" />);
        intersect(true);
        act(() => vi.advanceTimersByTime(3000));
        intersect(false);
        act(() => vi.advanceTimersByTime(10000));
        intersect(true);
        act(() => vi.advanceTimersByTime(3999));
        expect(
            screen.getByRole("heading", { name: "First slide" }),
        ).toBeTruthy();
        act(() => vi.advanceTimersByTime(1));
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

    test("keeps particles moving during hover and focus while pausing only autoplay", () => {
        hover.matches = true;
        const { motion, onAutoplayChange } = mountHero();
        intersect(true);
        const hero = screen.getByRole("region", { name: "Hero" });
        const link = screen.getByRole("button", { name: "Contact" });

        fireEvent.mouseEnter(hero);
        expect(motion.dataset.running).toBe("true");
        expect(onAutoplayChange).toHaveBeenLastCalledWith(false);
        act(() => link.focus());
        expect(motion.dataset.running).toBe("true");
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
        vi.useFakeTimers();
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
        act(() => vi.advanceTimersByTime(21000));
        expect(
            screen.getByRole("heading", { name: "Second slide" }),
        ).toBeTruthy();

        act(() => slideButton.blur());
        act(() => vi.advanceTimersByTime(7000));
        expect(
            screen.getByRole("heading", { name: "First slide" }),
        ).toBeTruthy();
    });
});
