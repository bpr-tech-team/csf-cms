"use client";

import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import { subscribeToAnchorNavigation } from "@/utilities/anchorNavigation";
import type { ProcessStepsBlock as ProcessStepsBlockProps } from "@/payload-types";

import { SectionHeading } from "@/components/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

export const ProcessStepsBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    locale = defaultLocale,
    description,
    eyebrow,
    heading,
    highlightedTexts,
    items,
}: ProcessStepsBlockProps & BlockSpacingProps & { locale?: AppLocale }) => {
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
                const advance = (progress: number, smooth = !canFreeze) => {
                    // Small deltas may sum to 0.999999... even when the rendered
                    // timeline is complete; snap the endpoint to release the page.
                    const nextProgress = progress >= 1 - 1e-6 ? 1 : progress;
                    if (nextProgress <= furthestProgress) return;
                    furthestProgress = nextProgress;
                    if (!smooth || (!canFreeze && furthestProgress === 1)) {
                        smoothProgress.tween.pause();
                        timeline.progress(furthestProgress);
                    } else {
                        // Direct touch/trackpad updates may have moved the timeline
                        // since quickTo last ran; always start at the visible progress.
                        smoothProgress(furthestProgress, timeline.progress());
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
                let momentum: gsap.core.Tween | undefined;
                const stopMomentum = () => {
                    momentum?.kill();
                    momentum = undefined;
                };
                let trigger: ScrollTrigger | undefined = undefined;
                const viewportHeight = window.innerHeight;
                const viewportWidth = window.innerWidth;
                const inputDistance =
                    viewportHeight * Math.max(0.4, items.length / 4);
                const progressDistance = inputDistance * 2;
                const stopSmoothing = () => {
                    smoothProgress.tween.pause();
                    furthestProgress = timeline.progress();
                };
                const finish = () => {
                    stopMomentum();
                    smoothProgress.tween.pause();
                    furthestProgress = 1;
                    timeline.progress(1);
                    unlock?.();
                    trigger?.kill();
                };
                smoothProgress.tween.eventCallback("onComplete", () => {
                    if (furthestProgress === 1) finish();
                });
                const consumeScroll = (delta: number, smooth = false) => {
                    stopMomentum();
                    if (delta < 0) {
                        // Let the user leave upwards without reversing the steps.
                        unlock?.();
                        window.scrollBy({ top: delta, behavior: "instant" });
                        return;
                    }
                    advance(
                        furthestProgress + delta / progressDistance,
                        smooth,
                    );
                    if (furthestProgress === 1 && !smooth) finish();
                };
                const coast = (velocity: number) => {
                    if (!unlock || velocity <= 0) return;
                    // For power2.out, distance = initial velocity * duration / 3.
                    // Only the timeline coasts; the page stays fixed throughout.
                    const duration = Math.min(
                        0.8,
                        Math.max(0.2, velocity / 3000),
                    );
                    const state = { progress: furthestProgress };
                    momentum = gsap.to(state, {
                        progress:
                            furthestProgress +
                            (velocity * duration) / (3 * progressDistance),
                        duration,
                        ease: "power2.out",
                        onUpdate: () => {
                            advance(state.progress);
                            if (furthestProgress === 1) finish();
                        },
                    });
                };
                const onKeyDown = (event: KeyboardEvent) => {
                    if (
                        !unlock ||
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
                            event.key === "ArrowDown"
                                ? 80
                                : progressDistance / 2,
                        );
                    }
                };
                const freeze = (self: ScrollTrigger) => {
                    if (unlock || furthestProgress === 1) return;
                    const bounds = section.getBoundingClientRect();
                    if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
                        // A fast scroll or anchor jump may skip the visible block.
                        finish();
                        return;
                    }

                    const incomingVelocity = self.getVelocity();
                    const root = document.documentElement;
                    const body = document.body;
                    const overflow = root.style.overflow;
                    const bodyStyles = {
                        position: body.style.position,
                        top: body.style.top,
                        left: body.style.left,
                        width: body.style.width,
                    };
                    const scrollX = window.scrollX;
                    const scrollY = window.scrollY;
                    const bodyWidth = body.getBoundingClientRect().width;
                    unlock = () => {
                        // Restore once, rather than correcting every native scroll event.
                        unlock = undefined;
                        stopMomentum();
                        stopSmoothing();
                        Object.assign(body.style, bodyStyles);
                        root.style.overflow = overflow;
                        window.scrollTo({
                            left: scrollX,
                            top: scrollY,
                            behavior: "instant",
                        });
                        trigger?.enable(false, false);
                    };
                    // A fixed body also stops Safari's in-flight momentum scrolling.
                    trigger?.disable(false);
                    Object.assign(body.style, {
                        position: "fixed",
                        top: `${-scrollY}px`,
                        left: `${-scrollX}px`,
                        width: `${bodyWidth}px`,
                    });
                    root.style.overflow = "hidden";
                    if (!observer.isPressed) coast(incomingVelocity);
                };

                const unsubscribeAnchorNavigation = subscribeToAnchorNavigation(
                    (target) => {
                        const wasLocked = Boolean(unlock);
                        // Complete every steps block before/containing the target,
                        // so a smooth anchor scroll cannot be intercepted en route.
                        // Blocks after the target keep their normal animation.
                        if (
                            section.contains(target) ||
                            section.compareDocumentPosition(target) &
                                Node.DOCUMENT_POSITION_FOLLOWING
                        ) {
                            finish();
                        } else {
                            unlock?.();
                        }
                        return wasLocked;
                    },
                );
                if (furthestProgress === 1) return unsubscribeAnchorNavigation;

                let touchY: number | undefined;
                // Track the gesture before entering the section, so the current swipe
                // can continue driving the animation when the page becomes locked.
                const observer = ScrollTrigger.observe({
                    target: window,
                    type: "wheel,touch",
                    lockAxis: true,
                    tolerance: 1,
                    preventDefault: false,
                    ignoreCheck: (event) => {
                        if (
                            (event as WheelEvent).ctrlKey ||
                            (event.target instanceof HTMLElement &&
                                event.target.closest(
                                    "a, button, input, textarea, select, [contenteditable]",
                                )) ||
                            ("touches" in event &&
                                (event as TouchEvent).touches.length > 1)
                        ) {
                            touchY = undefined;
                            unlock?.();
                            return true;
                        }
                        if (
                            unlock &&
                            event.cancelable &&
                            event.type !== "touchend"
                        ) {
                            event.preventDefault();
                        }
                        return false;
                    },
                    onPress: ({ event }) => {
                        stopMomentum();
                        stopSmoothing();
                        touchY = (event as TouchEvent).touches?.[0]?.screenY;
                        // GSAP's iOS recommendation: cancel touchstart as well as moves.
                        if (unlock && event.cancelable) event.preventDefault();
                    },
                    onChangeY: ({ deltaY, event }) => {
                        const point = (event as TouchEvent).touches?.[0];
                        const delta =
                            point && touchY !== undefined
                                ? touchY - point.screenY
                                : event.type === "wheel"
                                  ? deltaY
                                  : -deltaY;
                        if (point) touchY = point.screenY;
                        if (unlock) {
                            // Keep input smoothing independent of animation speed,
                            // so slowing progress cannot turn wheel impulses into jumps.
                            const smooth =
                                event.type === "wheel" &&
                                ((delta / inputDistance) * timeline.duration() >
                                    0.1 ||
                                    smoothProgress.tween.isActive());
                            consumeScroll(delta, smooth);
                        }
                    },
                    onRelease: (self, wasDragging = false) => {
                        touchY = undefined;
                        if (!unlock || !wasDragging || self.axis === "x")
                            return;
                        coast(-self.velocityY);
                    },
                });
                const onResize = () => {
                    // Safari's address bar changes height during a swipe; keep the lock.
                    if (window.innerWidth !== viewportWidth) unlock?.();
                };
                window.addEventListener("keydown", onKeyDown);
                window.addEventListener("resize", onResize);
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
                else if (unlock) trigger.disable(false);

                return () => {
                    unsubscribeAnchorNavigation();
                    unlock?.();
                    stopMomentum();
                    observer.kill();
                    window.removeEventListener("keydown", onKeyDown);
                    window.removeEventListener("resize", onResize);
                };
            },
        );

        return () => media.revert();
    }, [items.length]);

    return (
        <BlockSection
            blockType="processSteps"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            ref={sectionRef}
        >
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
        </BlockSection>
    );
};
