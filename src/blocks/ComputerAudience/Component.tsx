"use client";

import type { ComputerAudienceBlock as ComputerAudienceBlockProps } from "@/payload-types";

import { HighlightedText } from "@/components/Homepage/SectionHeading";
import { cn } from "@/utilities/ui";
import React, { useId, useState } from "react";

export const ComputerAudienceBlock = ({
    anchorId,
    items,
}: ComputerAudienceBlockProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const componentId = useId();
    const selectedIndex = activeIndex < items.length ? activeIndex : 0;
    const activeItem = items[selectedIndex];

    if (!activeItem) return null;

    return (
        <section
            className="scroll-mt-24 bg-paper-0 py-20 md:py-24 xl:py-28"
            id={anchorId || undefined}
        >
            <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                <div
                    aria-label="Cílové skupiny"
                    className="space-y-3"
                    role="tablist"
                >
                    {items.map((item, index) => {
                        const isActive = index === selectedIndex;

                        return (
                            <button
                                aria-controls={`${componentId}-panel`}
                                aria-selected={isActive}
                                className={cn(
                                    "w-full rounded-lg border px-6 py-5 text-left transition-colors",
                                    isActive
                                        ? "border-brand-500 bg-brand-50"
                                        : "border-border-light bg-paper-50 hover:border-brand-500/50",
                                )}
                                id={`${componentId}-tab-${index}`}
                                key={item.id ?? index}
                                onClick={() => setActiveIndex(index)}
                                role="tab"
                                type="button"
                            >
                                <span className="block text-heading-md leading-tight font-bold text-ink-950">
                                    {item.title}
                                </span>
                                <span className="mt-2 block text-body-sm leading-6 text-neutral-secondary">
                                    {item.summary}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div
                    aria-labelledby={`${componentId}-tab-${selectedIndex}`}
                    id={`${componentId}-panel`}
                    role="tabpanel"
                >
                    <h2 className="text-4xl leading-tight font-bold tracking-normal whitespace-pre-line text-ink-950 md:text-heading-xl">
                        <HighlightedText
                            highlightedTexts={activeItem.highlightedTexts}
                            text={activeItem.heading}
                        />
                    </h2>
                    <p className="mt-6 max-w-2xl text-body-md leading-7 whitespace-pre-line text-neutral-secondary md:text-body-lg md:leading-8">
                        {activeItem.description}
                    </p>
                </div>
            </div>
        </section>
    );
};
