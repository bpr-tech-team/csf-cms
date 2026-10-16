import React from "react";
import gsap from "gsap";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const scroll = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("gsap/ScrollTrigger", () => ({
    ScrollTrigger: { create: scroll.create },
}));

import { ContentReveal } from "./index";

type Trigger = {
    trigger: Element;
    onEnter?: () => void;
};
const triggers: Trigger[] = [];
let reduced = false;
const mount = () =>
    render(
        <ContentReveal>
            <div data-content-heading>
                <h3 data-reveal="heading">
                    <span data-content-heading-text>Heading</span>
                </h3>
                <span data-content-line />
                <span data-content-icon />
            </div>
            <div data-reveal="image" />
            <div data-reveal="text">
                <ul>
                    <li>First</li>
                    <li>Second</li>
                    <li>Third</li>
                </ul>
            </div>
            <div data-reveal="button">
                <a href="#target">Continue</a>
            </div>
        </ContentReveal>,
    );

beforeEach(() => {
    reduced = false;
    triggers.length = 0;
    scroll.create.mockImplementation((options: Trigger) => {
        triggers.push(options);
        return { kill: vi.fn() };
    });
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: query.includes("reduced-motion")
            ? reduced
            : query.includes("min-width"),
        media: query,
        addListener: vi.fn(),
        removeListener: vi.fn(),
    }));
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 1200,
        bottom: 1800,
        left: 0,
        right: 600,
        width: 600,
        height: 600,
        x: 0,
        y: 1200,
        toJSON: () => ({}),
    });
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

describe("content reveal behavior", () => {
    it("draws the line automatically after a single entry and reveals the icon only after it completes", () => {
        const { container } = mount();
        const title = container.querySelector("h3")!;
        const line = container.querySelector("[data-content-line]")!;
        const icon = container.querySelector("[data-content-icon]")!;
        expect(triggers).toHaveLength(1);
        const entry = triggers.find((trigger) => trigger.onEnter)!;
        entry.onEnter!();
        const timeline = gsap.getTweensOf(title)[0].parent!;
        timeline.time(0.25);
        expect(gsap.getProperty(line, "scaleX")).toBe(0);
        timeline.time(0.55);
        expect(gsap.getProperty(line, "scaleX")).toBeCloseTo(0.5);
        expect(gsap.getProperty(icon, "opacity")).toBe(0);
        timeline.time(0.85);
        expect(gsap.getProperty(line, "scaleX")).toBe(1);
        expect(gsap.getProperty(icon, "opacity")).toBe(0);
        timeline.time(1.15);
        expect(gsap.getProperty(icon, "opacity")).toBe(1);
        entry.onEnter!();
        expect(gsap.getProperty(line, "scaleX")).toBe(1);
        expect(gsap.getProperty(icon, "opacity")).toBe(1);
    });

    it("fits a wrapped desktop title to its longest rendered line and removes the override on unmount", () => {
        vi.spyOn(HTMLElement.prototype, "getClientRects").mockReturnValue([
            new DOMRect(0, 0, 150, 30),
            new DOMRect(0, 30, 241.25, 30),
        ] as unknown as DOMRectList);
        const view = mount();
        const title = view.container.querySelector("h3")!;
        expect(title.style.getPropertyValue("--content-heading-width")).toBe(
            "242px",
        );
        view.unmount();
        expect(title.style.getPropertyValue("--content-heading-width")).toBe(
            "",
        );
    });

    it("uses simultaneous fades with no displacement or scale in reduced motion and leaves decorations visible", () => {
        reduced = true;
        const { container } = mount();
        const title = container.querySelector("h3")!;
        const image = container.querySelector('[data-reveal="image"]')!;
        const line = container.querySelector("[data-content-line]")!;
        const icon = container.querySelector("[data-content-icon]")!;
        expect(triggers).toHaveLength(1);
        expect(gsap.getProperty(line, "scaleX")).toBe(1);
        expect(gsap.getProperty(icon, "opacity")).toBe(1);
        expect(gsap.getProperty(title, "y")).toBe(0);
        expect(gsap.getProperty(image, "scaleX")).toBe(1);
        const timeline = gsap.getTweensOf(title)[0].parent!;
        expect(timeline.duration()).toBe(0.3);
        timeline.progress(1);
        expect(gsap.getProperty(title, "opacity")).toBe(1);
    });

    it("makes a keyboard-focused control and its content visible immediately", () => {
        const { container, getByRole } = mount();
        const button = container.querySelector('[data-reveal="button"]')!;
        expect(gsap.getProperty(button, "opacity")).toBe(0);
        fireEvent.focusIn(getByRole("link", { name: "Continue" }));
        expect(gsap.getProperty(button, "opacity")).toBe(1);
        expect(
            gsap.getProperty(container.querySelector("h3")!, "opacity"),
        ).toBe(1);
    });
});
