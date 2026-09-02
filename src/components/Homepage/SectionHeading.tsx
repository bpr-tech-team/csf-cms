import React from "react";

import { cn } from "@/utilities/ui";

type SectionHeadingProps = {
    align?: "center" | "left";
    className?: string;
    eyebrow?: null | string;
    heading: string;
    highlightedText?: null | string;
    showRule?: boolean;
};

export const SectionHeading = ({
    align = "left",
    className,
    eyebrow,
    heading,
    highlightedText,
    showRule = true,
}: SectionHeadingProps) => {
    const content = (
        <div className={cn(align === "center" && "text-center")}>
            {eyebrow && (
                <p className="text-eyebrow uppercase text-neutral-secondary">
                    {eyebrow}
                </p>
            )}
            <h2
                className={cn(
                    "mt-4 whitespace-pre-line text-[2.25rem] leading-[1.22] font-bold tracking-[-0.03em] text-ink-950 md:text-heading-xl",
                    align === "center" && "text-balance",
                )}
            >
                <HighlightedText
                    highlightedText={highlightedText}
                    text={heading}
                />
            </h2>
        </div>
    );

    if (align === "center" || !showRule) {
        return <div className={className}>{content}</div>;
    }

    return (
        <div
            className={cn(
                "grid items-center gap-8 lg:grid-cols-[minmax(0,32rem)_1fr] lg:gap-24",
                className,
            )}
        >
            {content}
            <span aria-hidden className="hidden h-px bg-brand-500 lg:block" />
        </div>
    );
};

export const HighlightedText = ({
    highlightedText,
    text,
}: {
    highlightedText?: null | string;
    text: string;
}) => {
    if (!highlightedText) return text;

    const index = text.indexOf(highlightedText);
    if (index < 0) return text;

    return (
        <>
            {text.slice(0, index)}
            <span className="text-brand-500">{highlightedText}</span>
            {text.slice(index + highlightedText.length)}
        </>
    );
};
