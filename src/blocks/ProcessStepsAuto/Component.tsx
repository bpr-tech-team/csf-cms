"use client";

import { BlockSection } from "@/components/BlockSection";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { ProcessStepsAutoBlock as ProcessStepsAutoBlockProps } from "@/payload-types";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { applyTypography } from "@/utilities/typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import styles from "../ProcessSteps/styles.module.css";

export const ProcessStepsAutoBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    locale = defaultLocale,
    description,
    eyebrow,
    heading,
    highlightedTexts,
    items,
}: ProcessStepsAutoBlockProps & BlockSpacingProps & { locale?: AppLocale }) => {
    const stepsRef = useRef<HTMLOListElement>(null);
    const startedRef = useRef(false);
    const progressRef = useRef(0);

    useLayoutEffect(() => {
        const steps = stepsRef.current;
        if (!steps || !items.length) return;

        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();

        media.add(
            {
                desktop: "(min-width: 64rem)",
                motion: "(prefers-reduced-motion: no-preference)",
                reduced: "(prefers-reduced-motion: reduce)",
            },
            ({ conditions }) => {
                if (
                    !conditions?.motion ||
                    steps.getBoundingClientRect().bottom <= 0
                ) {
                    progressRef.current = 1;
                    return;
                }
                if (progressRef.current === 1) return;

                const progress = progressRef.current;
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

                // Rebuild the line direction on a breakpoint change without
                // replaying steps that have already appeared.
                timeline.progress(progress, true);
                timeline.eventCallback("onUpdate", () => {
                    progressRef.current = timeline.progress();
                });
                timeline.eventCallback("onComplete", () => {
                    progressRef.current = 1;
                });

                const play = () => {
                    if (startedRef.current) return;
                    startedRef.current = true;
                    timeline.play();
                };

                if (startedRef.current) {
                    timeline.play();
                    return;
                }

                ScrollTrigger.create({
                    trigger: steps,
                    start: "top 85%",
                    once: true,
                    onEnter: play,
                });

                // Also play above-the-fold blocks before the next scroll event.
                if (
                    steps.getBoundingClientRect().top <=
                    window.innerHeight * 0.85
                )
                    play();
            },
            steps,
        );

        return () => media.revert();
    }, [items.length]);

    return (
        <BlockSection
            blockType="processStepsAuto"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
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
