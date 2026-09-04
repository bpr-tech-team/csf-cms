import type { CompanyTimelineBlock as CompanyTimelineBlockProps } from "@/payload-types";

import { SectionHeading } from "@/components/Homepage/SectionHeading";
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
                <SectionHeading
                    heading={heading}
                    headingClassName="leading-snug text-balance"
                    highlightedText={highlightedText}
                    showRule={false}
                />
            </div>

            <ol className="mx-auto mt-20 flex max-w-[87rem] flex-col gap-12 md:mt-28 md:gap-15 md:px-8 xl:px-0">
                {items.map((item, index) => {
                    const alignRight = index % 2 === 1;

                    return (
                        <li
                            className={cn(
                                "relative w-full max-w-xl",
                                alignRight ? "self-end" : "self-start",
                            )}
                            key={item.id ?? index}
                        >
                            <div>
                                <div
                                    className={cn(
                                        "relative mb-4 grid md:mb-2 md:flex md:min-h-20 md:items-end md:gap-4",
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
                                            "shrink-0 text-5xl leading-none font-bold tracking-[-0.04em] text-brand-500 md:text-display-xl",
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
                                            "row-start-2 text-center text-4xl leading-relaxed font-bold tracking-tight whitespace-nowrap md:mx-0 md:pb-1 md:text-heading-md xl:text-heading-lg",
                                            alignRight ? "ml-11" : "mr-11",
                                        )}
                                    >
                                        {item.title}
                                    </h3>
                                </div>

                                <div
                                    className={cn(
                                        "min-h-36 border border-border-light bg-ink-950/[0.02] p-5 backdrop-blur-sm md:min-h-30 md:px-10 md:py-6",
                                        alignRight
                                            ? "ml-11 rounded-l-2xl md:ml-0 md:rounded-2xl"
                                            : "mr-11 rounded-r-2xl md:mr-0 md:rounded-2xl",
                                    )}
                                >
                                    <p className="text-body-md leading-6 font-normal md:text-body-lg">
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
