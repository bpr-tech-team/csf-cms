import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Conditions = { desktop: boolean; motion: boolean };
type Timeline = {
    from: ReturnType<typeof vi.fn>;
    progress: ReturnType<
        typeof vi.fn<
            (progress?: number, suppressEvents?: boolean) => number | Timeline
        >
    >;
    eventCallback: ReturnType<typeof vi.fn>;
    play: ReturnType<typeof vi.fn>;
    value: number;
    callbacks: Record<string, (() => void) | undefined>;
};

const animation = vi.hoisted(() => ({
    desktop: true,
    motion: true,
    top: 1000,
    bottom: 1400,
    timelines: [] as Timeline[],
    contexts: [] as {
        setup: (context: { conditions: Conditions }) => void;
        revert: ReturnType<typeof vi.fn>;
    }[],
    timeline: vi.fn(),
    create: vi.fn(),
}));

vi.mock("gsap", () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: animation.timeline,
        matchMedia: () => {
            const revert = vi.fn();
            return {
                add: (
                    _queries: unknown,
                    setup: (context: { conditions: Conditions }) => void,
                ) => {
                    animation.contexts.push({ setup, revert });
                    setup({
                        conditions: {
                            desktop: animation.desktop,
                            motion: animation.motion,
                        },
                    });
                },
                revert,
            };
        },
    },
}));
vi.mock("gsap/ScrollTrigger", () => ({
    ScrollTrigger: { create: animation.create },
}));
vi.mock("@/components/BlockSection", () => ({
    BlockSection: ({ children }: React.ComponentPropsWithRef<"section">) => (
        <section>{children}</section>
    ),
}));
vi.mock("@/components/SectionHeading", () => ({
    SectionHeading: ({ heading }: { heading: string }) => <h2>{heading}</h2>,
}));
vi.mock("@/utilities/typography", () => ({
    applyTypography: (text: string) => text,
}));

import { ProcessStepsAutoBlock } from "./Component";

const mount = () =>
    render(
        <ProcessStepsAutoBlock
            blockType="processStepsAuto"
            heading="Procesní kroky"
            description="How it works"
            items={[
                { title: "First", description: "First description" },
                { title: "Second" },
            ]}
        />,
    );

beforeEach(() => {
    vi.clearAllMocks();
    animation.desktop = true;
    animation.motion = true;
    animation.top = 1000;
    animation.bottom = 1400;
    animation.timelines.length = 0;
    animation.contexts.length = 0;
    animation.timeline.mockImplementation(() => {
        const timeline: Timeline = {
            from: vi.fn(),
            progress: vi.fn(),
            eventCallback: vi.fn(),
            play: vi.fn(),
            value: 0,
            callbacks: {},
        };
        timeline.from.mockReturnValue(timeline);
        timeline.play.mockReturnValue(timeline);
        timeline.progress.mockImplementation(
            (progress?: number, suppressEvents = false) => {
                if (progress === undefined) return timeline.value;
                timeline.value = progress;
                if (!suppressEvents) {
                    timeline.callbacks.onUpdate?.();
                    if (progress === 1) timeline.callbacks.onComplete?.();
                }
                return timeline;
            },
        );
        timeline.eventCallback.mockImplementation(
            (event: string, callback: () => void) => {
                timeline.callbacks[event] = callback;
                return timeline;
            },
        );
        animation.timelines.push(timeline);
        return timeline;
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
        () =>
            ({
                top: animation.top,
                bottom: animation.bottom,
            }) as DOMRect,
    );
    Object.defineProperty(window, "innerHeight", {
        configurable: true,
        value: 800,
    });
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("ProcessStepsAuto viewport playback", () => {
    it("waits for the steps to enter, then plays once without controlling page scrolling", () => {
        const view = mount();
        const timeline = animation.timelines[0];
        const trigger = animation.create.mock.calls[0][0];
        expect(timeline.play).not.toHaveBeenCalled();
        expect(trigger).toMatchObject({
            trigger: view.getByRole("list"),
            start: "top 85%",
            once: true,
        });
        expect(trigger.pin).toBeUndefined();
        expect(trigger.scrub).toBeUndefined();
        expect(trigger.onUpdate).toBeUndefined();
        expect(trigger.onLeave).toBeUndefined();

        trigger.onEnter();
        trigger.onEnter();
        expect(timeline.play).toHaveBeenCalledTimes(1);

        const wheel = new WheelEvent("wheel", {
            deltaY: 120,
            cancelable: true,
        });
        window.dispatchEvent(wheel);
        expect(wheel.defaultPrevented).toBe(false);
        expect(document.body.style.position).toBe("");
        expect(document.documentElement.style.overflow).toBe("");
    });

    it("plays immediately if the steps are already visible on initial load", () => {
        animation.top = 100;
        animation.bottom = 500;
        mount();

        expect(animation.timelines[0].play).toHaveBeenCalledTimes(1);
        animation.create.mock.calls[0][0].onEnter();
        expect(animation.timelines[0].play).toHaveBeenCalledTimes(1);
    });

    it("keeps content visible when scroll restoration starts below the block", () => {
        animation.top = -500;
        animation.bottom = -100;
        const view = mount();

        expect(view.getByText("First description")).toBeDefined();
        expect(view.getByText("Second")).toBeDefined();
        expect(animation.timeline).not.toHaveBeenCalled();
        expect(animation.create).not.toHaveBeenCalled();
    });

    it("shows all content without animation for reduced motion", () => {
        animation.motion = false;
        const view = mount();

        expect(view.getAllByRole("listitem")).toHaveLength(2);
        expect(view.getByText("How it works")).toBeDefined();
        expect(animation.timeline).not.toHaveBeenCalled();
        expect(animation.create).not.toHaveBeenCalled();

        animation.contexts[0].setup({
            conditions: { desktop: false, motion: true },
        });
        expect(animation.timeline).not.toHaveBeenCalled();
    });

    it("resumes at the same progress with the correct connector axis after a breakpoint change", () => {
        const view = mount();
        const firstTimeline = animation.timelines[0];
        animation.create.mock.calls[0][0].onEnter();
        firstTimeline.progress(0.45);

        animation.contexts[0].setup({
            conditions: { desktop: false, motion: true },
        });

        const resumedTimeline = animation.timelines[1];
        expect(resumedTimeline.progress).toHaveBeenCalledWith(0.45, true);
        expect(resumedTimeline.play).toHaveBeenCalledTimes(1);
        expect(firstTimeline.from).toHaveBeenCalledWith(
            view.container.querySelector("[data-step-line]"),
            expect.objectContaining({ scaleX: 0 }),
        );
        expect(resumedTimeline.from).toHaveBeenCalledWith(
            view.container.querySelector("[data-step-line]"),
            expect.objectContaining({ scaleY: 0 }),
        );
        expect(animation.create).toHaveBeenCalledTimes(1);
    });

    it("never rebuilds a completed sequence when the breakpoint changes", () => {
        mount();
        animation.create.mock.calls[0][0].onEnter();
        animation.timelines[0].progress(1);

        animation.contexts[0].setup({
            conditions: { desktop: false, motion: true },
        });
        expect(animation.timeline).toHaveBeenCalledTimes(1);
        expect(animation.create).toHaveBeenCalledTimes(1);
    });

    it("starts each block independently and reverts each GSAP context on unmount", () => {
        const firstView = mount();
        const secondView = mount();
        animation.create.mock.calls[0][0].onEnter();

        expect(animation.timelines[0].play).toHaveBeenCalledTimes(1);
        expect(animation.timelines[1].play).not.toHaveBeenCalled();

        firstView.unmount();
        expect(animation.contexts[0].revert).toHaveBeenCalledTimes(1);
        expect(animation.contexts[1].revert).not.toHaveBeenCalled();

        animation.create.mock.calls[1][0].onEnter();
        expect(animation.timelines[1].play).toHaveBeenCalledTimes(1);
        secondView.unmount();
        expect(animation.contexts[1].revert).toHaveBeenCalledTimes(1);
    });
});
