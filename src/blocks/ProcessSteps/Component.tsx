"use client";

import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { ProcessStepsBlock as ProcessStepsBlockProps } from "@/payload-types";

import { SectionHeading } from "@/components/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export const ProcessStepsBlock = ({
    locale = defaultLocale,
    description,
    eyebrow,
    heading,
    highlightedTexts,
    items,
}: ProcessStepsBlockProps & { locale?: AppLocale }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        const steps = stepsRef.current;
        const section = sectionRef.current;
        if (!steps || !section) return;

        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        let furthestProgress = 0;

        media.add(
            {
                desktop: "(min-width: 64rem)",
                motion: "(prefers-reduced-motion: no-preference)",
            },
            ({ conditions }) => {
                if (!conditions?.motion) return;

                const axis = conditions.desktop ? "scaleX" : "scaleY";
                const timeline = gsap.timeline({
                    paused: true,
                    defaults: { ease: "power2.out" },
                });

                steps.querySelectorAll("li").forEach((item) => {
                    timeline
                        .from(item.querySelector("[data-step-circle]"), {
                            opacity: 0,
                            scale: 0,
                            duration: 0.3,
                        })
                        .from(item.querySelector("[data-step-number]"), {
                            opacity: 0,
                            duration: 0.2,
                        })
                        .from(item.querySelector("[data-step-label]"), {
                            opacity: 0,
                            y: 8,
                            duration: 0.25,
                        });

                    const line = item.querySelector("[data-step-line]");
                    if (line) {
                        timeline.from(line, {
                            [axis]: 0,
                            duration: 0.35,
                            ease: "none",
                        });
                    }
                });

                timeline.progress(furthestProgress);
                if (furthestProgress === 1) return;

                const canFreeze =
                    section.offsetHeight <= window.innerHeight - 96;
                const smoothProgress = gsap.quickTo(timeline, "progress", {
                    duration: 0.3,
                    ease: "power2.out",
                });
                const advance = (progress: number) => {
                    if (progress <= furthestProgress) return;
                    furthestProgress = Math.min(1, progress);
                    if (canFreeze || furthestProgress === 1) {
                        smoothProgress.tween.pause();
                        timeline.progress(furthestProgress);
                    } else {
                        smoothProgress(furthestProgress);
                    }
                };

                if (!canFreeze) {
                    ScrollTrigger.create({
                        trigger: steps,
                        start: "top 85%",
                        end: conditions.desktop ? "top 20%" : "bottom 45%",
                        onUpdate: ({ progress }) => advance(progress),
                        onRefresh: ({ progress }) => advance(progress),
                    });
                    return;
                }

                let unlock: (() => void) | undefined;
                let trigger: ScrollTrigger | undefined = undefined;
                const distance = () =>
                    window.innerHeight * Math.max(0.4, items.length / 4);
                const finish = () => {
                    advance(1);
                    unlock?.();
                    trigger?.kill();
                };
                const consumeScroll = (delta: number) => {
                    if (delta < 0) {
                        // Let the user leave upwards without reversing the steps.
                        unlock?.();
                        window.scrollBy({ top: delta, behavior: "instant" });
                        return;
                    }
                    advance(furthestProgress + delta / distance());
                    if (furthestProgress === 1) finish();
                };
                const onKeyDown = (event: KeyboardEvent) => {
                    if (
                        event.ctrlKey ||
                        event.metaKey ||
                        event.altKey ||
                        (event.target instanceof HTMLElement &&
                            event.target.closest(
                                "input, textarea, select, button, a, [contenteditable]",
                            ))
                    ) {
                        return;
                    }
                    if (
                        ["ArrowUp", "PageUp", "Home"].includes(event.key) ||
                        (event.key === " " && event.shiftKey)
                    ) {
                        unlock?.();
                    } else if (event.key === "Escape" || event.key === "End") {
                        finish();
                    } else if (
                        ["ArrowDown", "PageDown", " "].includes(event.key)
                    ) {
                        event.preventDefault();
                        consumeScroll(
                            event.key === "ArrowDown" ? 80 : distance() / 2,
                        );
                    }
                };
                const freeze = () => {
                    if (unlock || furthestProgress === 1) return;
                    const bounds = section.getBoundingClientRect();
                    if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
                        // A fast scroll or anchor jump may skip the visible block.
                        finish();
                        return;
                    }

                    const root = document.documentElement;
                    const overflow = root.style.overflow;
                    const paddingRight = root.style.paddingRight;
                    const touchAction = root.style.touchAction;
                    const overscrollBehavior = root.style.overscrollBehavior;
                    const scrollbarWidth = window.innerWidth - root.clientWidth;
                    const scrollY = window.scrollY;
                    root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbarWidth}px`;
                    root.style.overflow = "hidden";
                    root.style.touchAction = "pinch-zoom";
                    root.style.overscrollBehavior = "none";

                    const holdPosition = () => {
                        if (window.scrollY !== scrollY) {
                            window.scrollTo({
                                top: scrollY,
                                behavior: "instant",
                            });
                        }
                    };
                    const observer = ScrollTrigger.observe({
                        target: window,
                        type: "wheel,touch",
                        lockAxis: true,
                        allowClicks: true,
                        preventDefault: true,
                        ignoreCheck: (event) =>
                            (event as WheelEvent).ctrlKey ||
                            ("touches" in event &&
                                (event as TouchEvent).touches.length > 1),
                        onChangeY: ({ deltaY, event }) =>
                            consumeScroll(
                                event.type === "wheel" ? deltaY : -deltaY,
                            ),
                    });
                    const onResize = () => unlock?.();
                    unlock = () => {
                        observer.kill();
                        root.style.overflow = overflow;
                        root.style.paddingRight = paddingRight;
                        root.style.touchAction = touchAction;
                        root.style.overscrollBehavior = overscrollBehavior;
                        window.removeEventListener("scroll", holdPosition);
                        window.removeEventListener("keydown", onKeyDown);
                        window.removeEventListener("resize", onResize);
                        unlock = undefined;
                    };
                    window.addEventListener("scroll", holdPosition);
                    window.addEventListener("keydown", onKeyDown);
                    window.addEventListener("resize", onResize);
                };
                trigger = ScrollTrigger.create({
                    trigger: section,
                    start: "center center",
                    end: "bottom top",
                    onEnter: freeze,
                    onLeave: () => {
                        if (!unlock) finish();
                    },
                });
                if (furthestProgress === 1) trigger.kill();

                return () => unlock?.();
            },
        );

        return () => media.revert();
    }, [items.length]);

    return (
        <section ref={sectionRef} className="bg-paper-0 py-20 md:py-24">
            <div className="container">
                <SectionHeading
                    locale={locale}
                    align="center"
                    eyebrow={eyebrow}
                    heading={heading}
                    highlightedTexts={highlightedTexts}
                    showRule={false}
                />
                {description && (
                    <p className="mx-auto mt-5 max-w-[46rem] text-center text-body-md font-normal text-neutral-secondary">
                        {applyTypography(description, { locale })}
                    </p>
                )}

                <ol ref={stepsRef} className={styles.steps}>
                    {items.map((item, index) => (
                        <li className={styles.step} key={item.id ?? index}>
                            <span
                                data-step-circle
                                className={`${styles.circle} bg-brand-500 text-body-sm font-bold text-ink-950`}
                            >
                                <span data-step-number>{index + 1}</span>
                            </span>
                            <span data-step-label className={styles.label}>
                                <span className="block text-body-sm font-bold text-ink-950">
                                    {applyTypography(item.title, { locale })}
                                </span>
                                {item.description && (
                                    <span className="mt-1 block text-xs font-bold text-brand-600">
                                        {applyTypography(item.description, {
                                            locale,
                                        })}
                                    </span>
                                )}
                            </span>
                            {index < items.length - 1 ? (
                                <span
                                    aria-hidden
                                    data-step-line
                                    className={`${styles.line} bg-brand-500`}
                                />
                            ) : null}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};
