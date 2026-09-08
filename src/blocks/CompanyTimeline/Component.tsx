"use client";

import type { CompanyTimelineBlock as CompanyTimelineBlockProps } from "@/payload-types";

import { SectionHeading } from "@/components/Homepage/SectionHeading";
import { cn } from "@/utilities/ui";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export const CompanyTimelineBlock = ({
    heading,
    highlightedTexts,
    items,
}: CompanyTimelineBlockProps) => {
    const pathRef = useRef<SVGPathElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineBallRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const path = pathRef.current;
        const timeline = timelineRef.current;
        const timelineBall = timelineBallRef.current;

        if (!path || !timeline || !timelineBall) return;
        if (!window.matchMedia("(min-width: 1536px)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        const headings = Array.from(
            timeline.querySelectorAll<HTMLElement>("[data-timeline-heading]"),
        );

        if (headings.length < 2) return;

        gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

        const updatePath = () => {
            const timelineBounds = timeline.getBoundingClientRect();
            const headingOffset = 24;
            const points = headings.map((heading, index) => {
                const bounds = heading.getBoundingClientRect();
                const isRight = index % 2 === 1;

                return {
                    x:
                        (isRight ? bounds.left : bounds.right) -
                        timelineBounds.left +
                        (isRight ? -headingOffset : headingOffset),
                    y: bounds.top - timelineBounds.top + bounds.height / 2,
                };
            });

            const pathData = points.reduce((value, point, index) => {
                if (index === 0) return `M ${point.x} ${point.y}`;

                const previousPoint = points[index - 1];
                const direction = point.x > previousPoint.x ? 1 : -1;
                const curveOffset = Math.min(140, timelineBounds.width * 0.12);
                const controlX = point.x + direction * curveOffset;
                const controlY = (previousPoint.y + point.y) / 2;

                return `${value} Q ${controlX} ${controlY} ${point.x} ${point.y}`;
            }, "");

            path.setAttribute("d", pathData);
        };

        updatePath();

        const context = gsap.context(() => {
            gsap.set(timelineBall, { autoAlpha: 1 });
            gsap.to(timelineBall, {
                ease: "none",
                motionPath: {
                    align: path,
                    alignOrigin: [0.5, 0.5],
                    path,
                },
                scrollTrigger: {
                    end: "center 35%",
                    endTrigger: headings.at(-1),
                    invalidateOnRefresh: true,
                    onRefreshInit: updatePath,
                    scrub: 0.35,
                    start: "center 65%",
                    trigger: headings[0],
                },
            });
        }, timeline);

        return () => context.revert();
    }, [items.length]);

    return (
        <section className="overflow-hidden bg-paper-0 py-20 text-ink-900 xl:pt-24 xl:pb-28">
            <div className="container">
                <SectionHeading
                    heading={heading}
                    headingClassName="leading-snug text-balance md:text-heading-lg xl:text-heading-xl"
                    highlightedTexts={highlightedTexts}
                    showRule={false}
                />
            </div>

            <div
                className="relative mx-auto mt-20 max-w-[87rem] md:px-8 xl:mt-28 xl:px-0"
                ref={timelineRef}
            >
                <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 size-full overflow-visible"
                >
                    <path fill="none" ref={pathRef} stroke="none" />
                </svg>
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 z-20 hidden size-5 rounded-full bg-primary opacity-0 will-change-transform 2xl:block"
                    ref={timelineBallRef}
                    style={{
                        boxShadow:
                            "0 0 12px 32px color-mix(in srgb, var(--primary) 45%, transparent)",
                    }}
                />

                <ol className="flex flex-col gap-12 xl:gap-15">
                    {items.map((item, index) => {
                        const alignRight = index % 2 === 1;

                        return (
                            <li
                                className={cn(
                                    "relative w-full max-w-xl md:max-w-lg xl:max-w-xl",
                                    alignRight ? "self-end" : "self-start",
                                )}
                                key={item.id ?? index}
                            >
                                <div>
                                    <div
                                        className={cn(
                                            "relative mb-4 grid md:mb-2 md:flex md:min-h-16 md:items-end md:gap-3 xl:min-h-20 xl:gap-4",
                                            alignRight
                                                ? "text-right md:flex-row-reverse md:justify-between"
                                                : "md:justify-between",
                                        )}
                                    >
                                        <span
                                            aria-hidden
                                            className={cn(
                                                "absolute top-6 h-px w-1/2 -translate-y-1/2 bg-brand-500 md:top-1/2 md:h-0.5 md:w-screen",
                                                alignRight
                                                    ? "right-0 md:right-auto md:left-full"
                                                    : "left-0 md:right-full md:left-auto",
                                            )}
                                        />

                                        <time
                                            className={cn(
                                                "shrink-0 text-5xl leading-none font-bold tracking-normal text-brand-500 md:text-6xl xl:text-display-xl",
                                                alignRight
                                                    ? "mr-8 ml-11 justify-self-start md:ml-0"
                                                    : "mr-11 ml-8 justify-self-end md:mr-0",
                                            )}
                                            dateTime={item.year}
                                        >
                                            {item.year}
                                        </time>
                                        <h3
                                            className={cn(
                                                "row-start-2 text-center text-4xl leading-relaxed font-bold tracking-normal md:mx-0 md:pb-1 md:text-heading-md md:whitespace-nowrap xl:text-heading-lg",
                                                alignRight ? "ml-11" : "mr-11",
                                            )}
                                            data-timeline-heading
                                        >
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div
                                        className={cn(
                                            "min-h-36 border border-border-light bg-ink-950/[0.02] p-5 backdrop-blur-sm md:min-h-28 md:px-8 md:py-5 xl:min-h-30 xl:px-10 xl:py-6",
                                            alignRight
                                                ? "ml-11 rounded-l-2xl md:ml-0 md:rounded-2xl"
                                                : "mr-11 rounded-r-2xl md:mr-0 md:rounded-2xl",
                                        )}
                                    >
                                        <p className="text-body-md leading-6 font-normal xl:text-body-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};
