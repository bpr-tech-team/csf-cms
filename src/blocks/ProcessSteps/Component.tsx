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
    const stepsRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        const steps = stepsRef.current;
        if (!steps) return;

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
                const smoothProgress = gsap.quickTo(timeline, "progress", {
                    duration: 0.3,
                    ease: "power2.out",
                });
                const advance = ({ progress }: ScrollTrigger) => {
                    if (progress <= furthestProgress) return;
                    furthestProgress = progress;
                    smoothProgress(progress);
                };

                ScrollTrigger.create({
                    trigger: steps,
                    start: "top 85%",
                    end: conditions.desktop ? "top 20%" : "bottom 45%",
                    onUpdate: advance,
                    onRefresh: advance,
                });
            },
        );

        return () => media.revert();
    }, [items.length]);

    return (
        <section className="bg-paper-0 py-20 md:py-24">
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
