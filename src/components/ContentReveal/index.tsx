"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode } from "react";

import { cn } from "@/utilities/ui";

import styles from "./styles.module.css";

export const ContentReveal = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const startedRef = useRef(false);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        let active = true;
        const fitHeadings = () => {
            if (!active) return;
            const desktop = window.matchMedia("(min-width: 64rem)").matches;
            root.querySelectorAll<HTMLElement>(
                '[data-reveal="heading"]',
            ).forEach((title) => {
                title.style.removeProperty("--content-heading-width");
                if (!desktop) return;
                const label = title.querySelector(
                    "[data-content-heading-text]",
                );
                if (!label) return;
                // A wrapped flex item otherwise keeps blank space after its longest line.
                const width = Math.ceil(
                    Math.max(
                        0,
                        ...Array.from(
                            label.getClientRects(),
                            (rect) => rect.width,
                        ),
                    ),
                );
                if (width > 0)
                    title.style.setProperty(
                        "--content-heading-width",
                        `${width}px`,
                    );
            });
        };
        fitHeadings();
        let observedWidth = root.getBoundingClientRect().width;
        const resizeObserver =
            typeof ResizeObserver === "undefined"
                ? undefined
                : new ResizeObserver(([entry]) => {
                      if (!entry || entry.contentRect.width === observedWidth)
                          return;
                      observedWidth = entry.contentRect.width;
                      fitHeadings();
                  });
        resizeObserver?.observe(root);
        void document.fonts?.ready.then(fitHeadings);

        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add(
            {
                desktop: "(min-width: 64rem)",
                mobile: "(max-width: 63.999rem)",
                reduced: "(prefers-reduced-motion: reduce)",
            },
            ({ conditions }) => {
                fitHeadings();
                const reduced = Boolean(conditions?.reduced);
                const desktop = Boolean(conditions?.desktop);
                const images = root.querySelectorAll('[data-reveal="image"]');
                const mediaTargets = root.querySelectorAll(
                    '[data-reveal="media"]',
                );
                const headings = root.querySelectorAll(
                    '[data-reveal="heading"]',
                );
                const text = root.querySelectorAll(
                    '[data-reveal="text"] > :not(ul):not(ol), [data-reveal="text"] > ul > li, [data-reveal="text"] > ol > li',
                );
                const embeds = root.querySelectorAll('[data-reveal="embed"]');
                const buttons = root.querySelectorAll('[data-reveal="button"]');
                const headingStart = desktop && images.length > 0 ? 0.25 : 0;
                const timeline = gsap.timeline({
                    paused: true,
                    defaults: { ease: "power2.out" },
                    onStart: () => {
                        startedRef.current = true;
                    },
                });

                if (!startedRef.current) {
                    const reveal = (
                        targets: gsap.TweenTarget,
                        duration: number,
                        position: number,
                        movement = 0,
                        scale = 1,
                    ) => {
                        timeline.from(
                            targets,
                            {
                                opacity: 0,
                                y: reduced ? 0 : movement,
                                scale: reduced ? 1 : scale,
                                duration,
                                stagger: reduced ? 0 : 0.05,
                            },
                            reduced ? 0 : position,
                        );
                    };
                    if (images.length) reveal(images, 0.25, 0, 0, 0.96);
                    if (mediaTargets.length) reveal(mediaTargets, 0.25, 0);
                    if (headings.length)
                        reveal(headings, 0.3, headingStart, desktop ? 16 : 14);
                    if (!reduced) {
                        const lines = root.querySelectorAll(
                            "[data-content-line]",
                        );
                        const icons = root.querySelectorAll(
                            "[data-content-icon]",
                        );
                        if (lines.length)
                            timeline.from(
                                lines,
                                { scaleX: 0, duration: 0.6, ease: "none" },
                                headingStart,
                            );
                        if (icons.length)
                            timeline.from(
                                icons,
                                { opacity: 0, duration: 0.3 },
                                headingStart + 0.6,
                            );
                    }
                    if (text.length) reveal(text, 0.25, headingStart + 0.1, 14);
                    if (embeds.length) reveal(embeds, 0.25, headingStart + 0.1);
                    if (buttons.length)
                        reveal(
                            buttons,
                            0.25,
                            headingStart +
                                0.35 +
                                Math.max(0, text.length - 1) * 0.05,
                            14,
                        );
                    ScrollTrigger.create({
                        trigger: root,
                        start: "top 85%",
                        once: true,
                        onEnter: () => timeline.play(),
                        onLeave: () => timeline.progress(1),
                    });
                    if (root.getBoundingClientRect().bottom <= 0)
                        timeline.progress(1);
                }

                // Keyboard navigation must never focus an invisible control.
                const revealFocused = () => timeline.progress(1);
                root.addEventListener("focusin", revealFocused);
                return () => root.removeEventListener("focusin", revealFocused);
            },
            root,
        );

        return () => {
            active = false;
            resizeObserver?.disconnect();
            media.revert();
            root.querySelectorAll<HTMLElement>(
                '[data-reveal="heading"]',
            ).forEach((title) =>
                title.style.removeProperty("--content-heading-width"),
            );
        };
    }, [children]);

    return (
        <div
            ref={rootRef}
            className={cn(styles.content, className)}
            data-content-reveal
        >
            {children}
        </div>
    );
};
