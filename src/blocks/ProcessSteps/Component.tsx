import type { ProcessStepsBlock as ProcessStepsBlockProps } from "@/payload-types";

import { SectionHeading } from "@/components/Homepage/SectionHeading";
import React from "react";

export const ProcessStepsBlock = ({
    description,
    eyebrow,
    heading,
    highlightedText,
    items,
}: ProcessStepsBlockProps) => {
    return (
        <section className="bg-paper-0 py-20 md:py-24">
            <div className="container">
                <SectionHeading
                    align="center"
                    eyebrow={eyebrow}
                    heading={heading}
                    highlightedText={highlightedText}
                    showRule={false}
                />
                {description && (
                    <p className="mx-auto mt-5 max-w-[46rem] text-center text-body-md text-neutral-secondary">
                        {description}
                    </p>
                )}

                <ol className="relative mx-auto mt-16 grid max-w-[62rem] gap-8 md:grid-cols-4 md:gap-4">
                    <span
                        aria-hidden
                        className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-0.5 bg-brand-500 md:block"
                    />
                    {items.map((item, index) => (
                        <li
                            className="relative grid grid-cols-[2.5rem_1fr] items-start gap-4 md:block md:text-center"
                            key={item.id ?? index}
                        >
                            <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-brand-500 text-body-sm font-bold text-ink-950 md:mx-auto">
                                {index + 1}
                            </span>
                            <span className="pt-2 md:block md:pt-5">
                                <span className="block text-body-sm font-bold text-ink-950">
                                    {item.title}
                                </span>
                                {item.description && (
                                    <span className="mt-1 block text-xs font-bold text-brand-600">
                                        {item.description}
                                    </span>
                                )}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};
