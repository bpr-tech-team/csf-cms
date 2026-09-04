import type { CompanyTimelineBlock as CompanyTimelineBlockProps } from "@/payload-types";

import { HighlightedText } from "@/components/Homepage/SectionHeading";
import { cn } from "@/utilities/ui";
import React from "react";

export const CompanyTimelineBlock = ({
    heading,
    highlightedText,
    items,
}: CompanyTimelineBlockProps) => {
    return (
        <section className="overflow-hidden bg-paper-0 py-20 text-ink-900 md:pt-24 md:pb-28">
            <div className="container">
                <h2 className="text-4xl leading-snug font-bold tracking-tight text-balance md:text-heading-xl">
                    <HighlightedText
                        highlightedText={highlightedText}
                        text={heading}
                    />
                </h2>
            </div>

            <ol className="mx-auto mt-20 flex max-w-[87rem] flex-col gap-12 px-5 md:mt-28 md:gap-15 md:px-8 xl:px-0">
                {items.map((item, index) => {
                    const alignRight = index % 2 === 1;

                    return (
                        <li
                            className={cn(
                                "relative w-full max-w-lg",
                                alignRight ? "self-end" : "self-start",
                            )}
                            key={item.id ?? index}
                        >
                            <div
                                className={
                                    alignRight
                                        ? "ml-11 md:ml-0"
                                        : "mr-11 md:mr-0"
                                }
                            >
                                <div
                                    className={cn(
                                        "relative mb-4 flex min-h-16 items-end gap-4 md:mb-2 md:min-h-20",
                                        alignRight
                                            ? "flex-row-reverse justify-between text-right"
                                            : "justify-between",
                                    )}
                                >
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "absolute top-1/2 h-0.5 w-screen -translate-y-1/2 bg-brand-500",
                                            alignRight
                                                ? "left-full"
                                                : "right-full",
                                        )}
                                    />

                                    <time
                                        className={cn(
                                            "shrink-0 text-5xl leading-none font-bold tracking-[-0.04em] text-brand-500 md:text-display-xl",
                                            alignRight ? "mr-8" : "ml-8",
                                        )}
                                        dateTime={item.year}
                                    >
                                        {item.year}
                                    </time>
                                    <h3 className="pb-1 text-3xl leading-tight font-bold tracking-tight md:text-heading-lg">
                                        {item.title}
                                    </h3>
                                </div>

                                <div
                                    className={cn(
                                        "min-h-36 border border-border-light bg-ink-950/[0.02] p-5 backdrop-blur-sm md:min-h-30 md:px-10 md:py-6",
                                        alignRight
                                            ? "rounded-l-2xl md:rounded-2xl"
                                            : "rounded-r-2xl md:rounded-2xl",
                                    )}
                                >
                                    <p className="text-body-md leading-6 md:text-body-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
};
