import type { ProcessStepsBlock as ProcessStepsBlockProps } from "@/payload-types";

import { SectionHeading } from "@/components/Homepage/SectionHeading";
import React from "react";

export const ProcessStepsBlock = ({
    description,
    eyebrow,
    heading,
    highlightedTexts,
    items,
}: ProcessStepsBlockProps) => {
    return (
        <section className="bg-paper-0 py-20 md:py-24">
            <div className="container">
                <SectionHeading
                    align="center"
                    eyebrow={eyebrow}
                    heading={heading}
                    highlightedTexts={highlightedTexts}
                    showRule={false}
                />
                {description && (
                    <p className="mx-auto mt-5 max-w-[46rem] text-center text-body-md font-normal text-neutral-secondary">
                        {description}
                    </p>
                )}

                <ol className="relative mx-auto mt-16 grid max-w-[62rem] gap-10 lg:grid-cols-4 lg:gap-0">
                    {items.map((item, index) => (
                        <li
                            className="relative flex flex-col items-center text-center lg:px-2"
                            key={item.id ?? index}
                        >
                            <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-brand-500 text-body-sm font-bold text-ink-950">
                                {index + 1}
                            </span>
                            <span className="block pt-5">
                                <span className="block text-body-sm font-bold text-ink-950">
                                    {item.title}
                                </span>
                                {item.description && (
                                    <span className="mt-1 block text-xs font-bold text-brand-600">
                                        {item.description}
                                    </span>
                                )}
                            </span>
                            {index < items.length - 1 ? (
                                <span
                                    aria-hidden
                                    className="hidden bg-brand-500 lg:absolute lg:top-5 lg:left-1/2 lg:block lg:h-0.5 lg:w-full"
                                />
                            ) : null}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};
