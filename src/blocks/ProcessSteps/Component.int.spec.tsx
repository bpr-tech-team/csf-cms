import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const animation = vi.hoisted(() => {
    const timeline = { from: vi.fn(), progress: vi.fn() };
    const trigger = { disable: vi.fn(), enable: vi.fn(), kill: vi.fn() };
    return {
        timeline,
        trigger,
        create: vi.fn(),
        dispose: undefined as (() => void) | undefined,
    };
});

vi.mock("gsap", () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: () => animation.timeline,
        quickTo: () => Object.assign(vi.fn(), { tween: { pause: vi.fn() } }),
        matchMedia: () => ({
            add: (
                _queries: unknown,
                setup: (context: unknown) => () => void,
            ) => {
                animation.dispose = setup({
                    conditions: { desktop: false, motion: true },
                });
            },
            revert: () => animation.dispose?.(),
        }),
    },
}));
vi.mock("gsap/ScrollTrigger", () => ({
    ScrollTrigger: { create: animation.create },
}));
vi.mock("@/components/BlockSection", () => ({
    BlockSection: ({
        children,
        ref,
    }: React.ComponentPropsWithRef<"section">) => (
        <section ref={ref}>{children}</section>
    ),
}));
vi.mock("@/components/SectionHeading", () => ({ SectionHeading: () => null }));
vi.mock("@/utilities/typography", () => ({
    applyTypography: (text: string) => text,
}));

import { ProcessStepsBlock } from "./Component";

const touchEvent = (
    type: string,
    screenY: number,
    count = 1,
    cancelable = true,
) => {
    const event = new Event(type, { cancelable });
    Object.defineProperty(event, "touches", {
        value: Array.from({ length: count }, (_, identifier) => ({
            identifier,
            screenY,
            // Deliberately unreliable viewport coordinates, as reported on iOS.
            clientY: screenY + 1000,
        })),
    });
    window.dispatchEvent(event);
    return event;
};
const mount = () =>
    render(
        <ProcessStepsBlock
            blockType="processSteps"
            heading="Procesní kroky"
            items={[{ title: "First" }, { title: "Second" }]}
        />,
    );
const enter = () => animation.create.mock.calls[0][0].onEnter();

beforeEach(() => {
    vi.clearAllMocks();
    animation.timeline.from.mockReturnValue(animation.timeline);
    animation.create.mockReturnValue(animation.trigger);
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(400);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 100,
        bottom: 500,
        left: 0,
        right: 390,
        width: 390,
        height: 400,
        x: 0,
        y: 100,
        toJSON: () => ({}),
    });
    Object.defineProperties(window, {
        innerWidth: { configurable: true, value: 390 },
        innerHeight: { configurable: true, value: 800 },
        scrollY: { configurable: true, value: 600 },
    });
});
afterEach(() => {
    cleanup();
    document.body.removeAttribute("style");
    document.documentElement.removeAttribute("style");
    vi.restoreAllMocks();
});

describe("ProcessSteps mobile scroll lock", () => {
    it("continues the swipe that entered the block, without correcting native scroll events", () => {
        mount();
        touchEvent("touchstart", 700);
        touchEvent("touchmove", 650);
        enter();
        expect(document.body.style.position).toBe("fixed");
        expect(document.body.style.top).toBe("-600px");
        window.dispatchEvent(new Event("scroll"));
        expect(window.scrollTo).not.toHaveBeenCalled();

        expect(touchEvent("touchmove", 550).defaultPrevented).toBe(true);
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(0.25);
        touchEvent("touchmove", 250);
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(1);
        expect(document.body.style.position).toBe("");
        expect(window.scrollTo).toHaveBeenCalledTimes(1);
        expect(window.scrollTo).toHaveBeenCalledWith({
            left: 0,
            top: 600,
            behavior: "instant",
        });
        expect(animation.trigger.kill).toHaveBeenCalled();
    });

    it("keeps the lock when Safari's toolbar changes viewport height", () => {
        mount();
        enter();
        Object.defineProperty(window, "innerHeight", { value: 700 });
        window.dispatchEvent(new Event("resize"));
        expect(document.body.style.position).toBe("fixed");
        expect(window.scrollTo).not.toHaveBeenCalled();
        Object.defineProperty(window, "innerWidth", { value: 800 });
        window.dispatchEvent(new Event("resize"));
        expect(document.body.style.position).toBe("");
    });

    it("advances an already scrolling gesture even when touchmove cannot be cancelled", () => {
        mount();
        touchEvent("touchstart", 700);
        enter();
        touchEvent("touchmove", 600, 1, false);
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(0.25);
        expect(document.body.style.position).toBe("fixed");
        expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("allows leaving upwards without reversing the revealed steps", () => {
        mount();
        touchEvent("touchstart", 500);
        enter();
        touchEvent("touchmove", 400);
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(0.25);
        touchEvent("touchmove", 450);
        expect(document.body.style.position).toBe("");
        expect(window.scrollBy).toHaveBeenCalledWith({
            top: -50,
            behavior: "instant",
        });
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(0.25);
    });

    it("releases the lock for pinch zoom and restores existing styles on unmount", () => {
        document.body.style.position = "relative";
        document.body.style.width = "90%";
        document.documentElement.style.overflow = "clip";
        const view = mount();
        enter();
        touchEvent("touchstart", 500, 2);
        expect(document.body.style.position).toBe("relative");
        enter();
        view.unmount();
        expect(document.body.style.position).toBe("relative");
        expect(document.body.style.width).toBe("90%");
        expect(document.documentElement.style.overflow).toBe("clip");
        const wheel = new WheelEvent("wheel", {
            deltaY: 100,
            cancelable: true,
        });
        window.dispatchEvent(wheel);
        expect(wheel.defaultPrevented).toBe(false);
    });
});
