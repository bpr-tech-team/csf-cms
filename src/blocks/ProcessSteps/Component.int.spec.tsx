import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const animation = vi.hoisted(() => ({
    timeline: { from: vi.fn(), progress: vi.fn() },
    smoothProgress: Object.assign(vi.fn(), { tween: { pause: vi.fn() } }),
    create: vi.fn(),
    revert: vi.fn(),
    motion: true,
}));

vi.mock("gsap", () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: () => animation.timeline,
        quickTo: () => animation.smoothProgress,
        matchMedia: () => ({
            add: (_queries: unknown, setup: (context: unknown) => void) => {
                setup({
                    conditions: { desktop: false, motion: animation.motion },
                });
            },
            revert: animation.revert,
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

const mount = () =>
    render(
        <ProcessStepsBlock
            blockType="processSteps"
            heading="Procesní kroky"
            items={[{ title: "First" }, { title: "Second" }]}
        />,
    );
const scrollTrigger = () => animation.create.mock.calls[0][0];

beforeEach(() => {
    vi.clearAllMocks();
    animation.motion = true;
    animation.timeline.from.mockReturnValue(animation.timeline);
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(400);
    Object.defineProperty(window, "innerHeight", {
        configurable: true,
        value: 800,
    });
});
afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("ProcessSteps native scrolling", () => {
    it("keeps gestures native and advances from scroll progress after the finger is released", () => {
        const { container } = mount();
        const trigger = scrollTrigger();
        expect(trigger.pin).toBe(container.querySelector("section"));
        expect(trigger.end()).toBe("+=400");

        for (const type of [
            "touchstart",
            "touchmove",
            "touchend",
            "wheel",
            "keydown",
        ]) {
            const event = new Event(type, { cancelable: true });
            window.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(false);
        }
        // The browser continues scrolling with momentum after touchend.
        trigger.onUpdate({ progress: 0.25 });
        trigger.onUpdate({ progress: 0.75 });
        expect(animation.smoothProgress.mock.calls).toEqual([[0.25], [0.75]]);
        expect(document.body.style.position).toBe("");
        expect(document.documentElement.style.overflow).toBe("");
        expect(window.scrollTo).not.toHaveBeenCalled();
        expect(window.scrollBy).not.toHaveBeenCalled();
    });

    it("does not hide steps already revealed when scrolling back or refreshing", () => {
        mount();
        const trigger = scrollTrigger();
        trigger.onUpdate({ progress: 0.75 });
        trigger.onUpdate({ progress: 0.25 });
        trigger.onRefresh({ progress: 0.5 });
        expect(animation.smoothProgress).toHaveBeenCalledTimes(1);
        expect(animation.smoothProgress).toHaveBeenCalledWith(0.75);
        trigger.onLeave();
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(1);
        trigger.onUpdate({ progress: 0.1 });
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(1);
    });

    it("leaves tall mobile sections unpinned so all their content remains reachable", () => {
        vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(
            900,
        );
        mount();
        const trigger = scrollTrigger();
        expect(trigger.pin).toBe(false);
        expect(trigger.start).toBe("top 85%");
        expect(trigger.end).toBe("bottom 45%");
    });

    it("respects reduced motion and reverts its GSAP context on unmount", () => {
        animation.motion = false;
        const view = mount();
        expect(animation.create).not.toHaveBeenCalled();
        expect(animation.timeline.from).not.toHaveBeenCalled();
        view.unmount();
        expect(animation.revert).toHaveBeenCalledTimes(1);
    });
});
