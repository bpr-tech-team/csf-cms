"use client";

import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
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

                const canPin = section.offsetHeight <= window.innerHeight - 96;
                const smoothProgress = gsap.quickTo(timeline, "progress", {
                    duration: 0.3,
                    ease: "power2.out",
                });
                const advance = (progress: number) => {
                    if (progress <= furthestProgress) return;
                    furthestProgress = Math.min(1, progress);
                    if (furthestProgress === 1) {
                        smoothProgress.tween.pause();
                        timeline.progress(furthestProgress);
                    } else {
                        smoothProgress(furthestProgress);
                    }
                };

                // Pin only the section; native scrolling (including touch momentum)
                // drives the reveal without intercepting gestures or locking the page.
                ScrollTrigger.create({
                    trigger: canPin ? section : steps,
                    pin: canPin ? section : false,
                    pinSpacing: true,
                    anticipatePin: 1,
                    start: canPin ? "center center" : "top 85%",
                    end: canPin
                        ? () =>
                              `+=${window.innerHeight * Math.max(0.4, items.length / 4)}`
                        : conditions.desktop
                          ? "top 20%"
                          : "bottom 45%",
                    onUpdate: ({ progress }) => advance(progress),
                    onRefresh: ({ progress }) => advance(progress),
                    onLeave: () => advance(1),
                });
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
