import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const animation = vi.hoisted(() => ({
    progress: 0,
    timeline: {
        from: vi.fn(),
        progress: vi.fn(),
        duration: () => 1.85,
    },
    smoothProgress: vi.fn(),
    smoothTween: {
        pause: vi.fn(),
        isActive: vi.fn(),
        eventCallback: vi.fn(),
    },
    tween: { kill: vi.fn() },
    observer: { kill: vi.fn(), isPressed: true },
    trigger: { disable: vi.fn(), enable: vi.fn(), kill: vi.fn() },
    create: vi.fn(),
    observe: vi.fn(),
    to: vi.fn(),
    motion: true,
    dispose: undefined as (() => void) | undefined,
}));
vi.mock("gsap", () => ({
    default: {
        registerPlugin: vi.fn(),
        timeline: () => animation.timeline,
        quickTo: () =>
            Object.assign(animation.smoothProgress, {
                tween: animation.smoothTween,
            }),
        to: animation.to,
        matchMedia: () => ({
            add: (
                _queries: unknown,
                setup: (context: unknown) => (() => void) | undefined,
            ) => {
                animation.dispose = setup({
                    conditions: { desktop: false, motion: animation.motion },
                });
            },
            revert: () => animation.dispose?.(),
        }),
    },
}));
vi.mock("gsap/ScrollTrigger", () => ({
    ScrollTrigger: { create: animation.create, observe: animation.observe },
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
const enter = (velocity = 0) =>
    animation.create.mock.calls[0][0].onEnter({ getVelocity: () => velocity });
const observer = () => animation.observe.mock.calls[0][0];
const touch = (type: string, screenY: number) => {
    const event = new Event(type, { cancelable: true });
    Object.defineProperty(event, "touches", { value: [{ screenY }] });
    return event;
};
const press = (y: number) =>
    observer().onPress({ event: touch("touchstart", y) });
const move = (y: number) =>
    observer().onChangeY({ deltaY: -100, event: touch("touchmove", y) });
const wheel = (deltaY: number) => {
    const event = new WheelEvent("wheel", { deltaY, cancelable: true });
    observer().ignoreCheck(event);
    observer().onChangeY({ deltaY, event });
    return event;
};
const completeSmoothing = (progress = 1) => {
    animation.progress = progress;
    animation.smoothTween.isActive.mockReturnValue(false);
    animation.smoothTween.eventCallback.mock.calls[0][1]();
};

beforeEach(() => {
    vi.clearAllMocks();
    animation.progress = 0;
    animation.motion = true;
    animation.observer.isPressed = true;
    animation.timeline.from.mockReturnValue(animation.timeline);
    animation.timeline.progress.mockImplementation((progress?: number) => {
        if (progress === undefined) return animation.progress;
        animation.progress = progress;
        return animation.timeline;
    });
    animation.smoothTween.isActive.mockReturnValue(false);
    animation.smoothTween.pause.mockImplementation(() => {
        animation.smoothTween.isActive.mockReturnValue(false);
    });
    animation.smoothProgress.mockImplementation(() => {
        animation.smoothTween.isActive.mockReturnValue(true);
    });
    animation.create.mockReturnValue(animation.trigger);
    animation.observe.mockReturnValue(animation.observer);
    animation.to.mockReturnValue(animation.tween);
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
        innerHeight: { configurable: true, value: 800 },
        innerWidth: { configurable: true, value: 390 },
        scrollY: { configurable: true, value: 600 },
    });
});
afterEach(() => {
    cleanup();
    document.body.removeAttribute("style");
    document.documentElement.removeAttribute("style");
    vi.restoreAllMocks();
});

describe("ProcessSteps page lock with animation momentum", () => {
    it("smooths a coarse wheel impulse without jumping the visible animation", () => {
        mount();
        enter();
        expect(wheel(120).defaultPrevented).toBe(true);
        expect(animation.smoothProgress).toHaveBeenLastCalledWith(0.15, 0);
        expect(animation.progress).toBe(0);
        expect(document.body.style.position).toBe("fixed");
        expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("accumulates wheel impulses and keeps smoothing their fine trailing deltas", () => {
        mount();
        enter();
        wheel(120);
        animation.progress = 0.05;
        wheel(120);
        expect(animation.smoothProgress).toHaveBeenLastCalledWith(0.3, 0.05);
        wheel(4);
        expect(animation.smoothProgress).toHaveBeenLastCalledWith(0.305, 0.05);
        expect(animation.progress).toBe(0.05);
    });

    it("keeps smoothing wheel impulses that only exceed the threshold at the original speed", () => {
        mount();
        enter();
        wheel(30);
        expect(animation.smoothProgress).toHaveBeenCalledWith(0.0375, 0);
        expect(animation.progress).toBe(0);
        expect(document.body.style.position).toBe("fixed");
    });

    it("preserves direct tracking of fine trackpad deltas", () => {
        mount();
        enter();
        wheel(4);
        wheel(4);
        expect(animation.progress).toBe(0.01);
        expect(animation.smoothProgress).not.toHaveBeenCalled();
        expect(document.body.style.position).toBe("fixed");
    });

    it("finishes after many fine trackpad deltas without trapping the page on floating-point residue", () => {
        mount();
        enter();
        for (let index = 0; index < 400; index++) wheel(2);
        expect(animation.progress).toBe(1);
        expect(document.body.style.position).toBe("");
        expect(document.documentElement.style.overflow).toBe("");
        expect(window.scrollTo).toHaveBeenCalledTimes(1);
    });

    it("starts a coarse wheel transition from the progress already shown by the trackpad", () => {
        mount();
        enter();
        wheel(4);
        wheel(120);
        expect(animation.smoothProgress).toHaveBeenLastCalledWith(0.155, 0.005);
        expect(animation.progress).toBe(0.005);
    });

    it("requires twice the original scroll distance and waits for the final transition before unlocking", () => {
        mount();
        enter();
        wheel(400);
        expect(animation.smoothProgress).toHaveBeenCalledWith(0.5, 0);
        completeSmoothing(0.5);
        expect(document.body.style.position).toBe("fixed");
        expect(window.scrollTo).not.toHaveBeenCalled();
        wheel(400);
        wheel(120);
        expect(animation.smoothProgress).toHaveBeenCalledTimes(2);
        expect(animation.smoothProgress).toHaveBeenLastCalledWith(1, 0.5);
        animation.progress = 0.9;
        expect(document.body.style.position).toBe("fixed");
        expect(window.scrollTo).not.toHaveBeenCalled();
        completeSmoothing();
        expect(document.body.style.position).toBe("");
        expect(window.scrollTo).toHaveBeenCalledTimes(1);
        expect(animation.trigger.kill).toHaveBeenCalled();
    });

    it("pauses wheel smoothing on upward exit and resumes from the visible progress", () => {
        mount();
        enter();
        wheel(120);
        animation.progress = 0.1;
        wheel(-40);
        expect(animation.smoothTween.isActive()).toBe(false);
        expect(document.body.style.position).toBe("");
        expect(window.scrollBy).toHaveBeenCalledWith({
            top: -40,
            behavior: "instant",
        });
        enter();
        wheel(4);
        expect(animation.progress).toBeCloseTo(0.105);
    });

    it("lets a touch gesture take over from an unfinished wheel transition", () => {
        mount();
        enter();
        wheel(120);
        animation.progress = 0.1;
        press(700);
        move(660);
        expect(animation.smoothTween.isActive()).toBe(false);
        expect(animation.progress).toBeCloseTo(0.15);
        expect(document.body.style.position).toBe("fixed");
    });

    it("allows Escape to finish immediately during the final wheel transition", () => {
        mount();
        enter();
        wheel(800);
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
        expect(animation.progress).toBe(1);
        expect(document.body.style.position).toBe("");
        expect(animation.smoothTween.isActive()).toBe(false);
    });

    it("stops an unfinished wheel transition and restores the page on unmount", () => {
        const view = mount();
        enter();
        wheel(120);
        view.unmount();
        expect(animation.smoothTween.isActive()).toBe(false);
        expect(document.body.style.position).toBe("");
        expect(document.documentElement.style.overflow).toBe("");
        expect(animation.observer.kill).toHaveBeenCalled();
    });

    it("continues an existing swipe while the whole page remains fixed", () => {
        mount();
        press(700);
        move(650);
        enter();
        expect(document.body.style.position).toBe("fixed");
        expect(document.body.style.top).toBe("-600px");
        move(550);
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(0.125);
        window.dispatchEvent(new Event("scroll"));
        expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("coasts the animation after release and unlocks only when the final step is revealed", () => {
        mount();
        press(700);
        enter();
        move(600);
        observer().onRelease({ velocityY: -2000, axis: "y" }, true);
        const [state, tween] = animation.to.mock.calls[0];
        expect(tween.progress).toBeCloseTo(0.680556);
        expect(tween.duration).toBeGreaterThan(0);
        state.progress = 0.7;
        tween.onUpdate();
        expect(animation.timeline.progress).toHaveBeenLastCalledWith(0.7);
        expect(document.body.style.position).toBe("fixed");
        expect(window.scrollTo).not.toHaveBeenCalled();
        state.progress = 1.05;
        tween.onUpdate();
        expect(animation.progress).toBe(1);
        expect(document.body.style.position).toBe("");
        expect(window.scrollTo).toHaveBeenCalledTimes(1);
        expect(animation.trigger.kill).toHaveBeenCalled();
    });

    it("transfers an incoming native flick to animation momentum without needing another swipe", () => {
        mount();
        animation.observer.isPressed = false;
        enter(2000);
        expect(animation.to).toHaveBeenCalledTimes(1);
        expect(animation.to.mock.calls[0][1].progress).toBeCloseTo(0.555556);
        expect(document.body.style.position).toBe("fixed");
        expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it("interrupts inertia on a new touch and releases immediately upwards without reversing steps", () => {
        mount();
        press(700);
        enter();
        move(600);
        observer().onRelease({ velocityY: -1200, axis: "y" }, true);
        press(500);
        expect(animation.tween.kill).toHaveBeenCalled();
        move(550);
        expect(document.body.style.position).toBe("");
        expect(animation.progress).toBe(0.125);
        expect(window.scrollBy).toHaveBeenCalledWith({
            top: -50,
            behavior: "instant",
        });
    });

    it("cancels touchstart while locked, but allows normal gestures before entering", () => {
        mount();
        const before = touch("touchstart", 700);
        observer().ignoreCheck(before);
        expect(before.defaultPrevented).toBe(false);
        enter();
        const locked = touch("touchstart", 700);
        observer().onPress({ event: locked });
        expect(locked.defaultPrevented).toBe(true);
    });

    it("keeps the lock across toolbar resizes and restores styles and kills inertia on unmount", () => {
        document.body.style.position = "relative";
        document.body.style.width = "90%";
        const view = mount();
        press(700);
        enter();
        move(600);
        observer().onRelease({ velocityY: -1200, axis: "y" }, true);
        Object.defineProperty(window, "innerHeight", { value: 700 });
        window.dispatchEvent(new Event("resize"));
        expect(document.body.style.position).toBe("fixed");
        view.unmount();
        expect(document.body.style.position).toBe("relative");
        expect(document.body.style.width).toBe("90%");
        expect(animation.tween.kill).toHaveBeenCalled();
        expect(animation.observer.kill).toHaveBeenCalled();
    });

    it("allows pinch zoom and ctrl-wheel without trapping the page", () => {
        mount();
        enter();
        const wheel = new WheelEvent("wheel", {
            ctrlKey: true,
            cancelable: true,
        });
        expect(observer().ignoreCheck(wheel)).toBe(true);
        expect(wheel.defaultPrevented).toBe(false);
        expect(document.body.style.position).toBe("");
    });

    it("does not trap sections taller than the screen", () => {
        vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(
            900,
        );
        mount();
        expect(animation.observe).not.toHaveBeenCalled();
        expect(animation.create.mock.calls[0][0].start).toBe("top 85%");
    });

    it("allows links and controls to release the lock without cancelling their touch", () => {
        mount();
        enter();
        const link = document.createElement("a");
        const event = touch("touchstart", 700);
        Object.defineProperty(event, "target", { value: link });
        expect(observer().ignoreCheck(event)).toBe(true);
        expect(event.defaultPrevented).toBe(false);
        expect(document.body.style.position).toBe("");
    });

    it("respects reduced motion", () => {
        animation.motion = false;
        mount();
        expect(animation.create).not.toHaveBeenCalled();
        expect(animation.observe).not.toHaveBeenCalled();
    });
});
