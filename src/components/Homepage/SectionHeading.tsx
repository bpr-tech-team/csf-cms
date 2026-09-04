import React from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/utilities/ui";

type SectionHeadingProps = {
    align?: "center" | "left";
    className?: string;
    eyebrow?: null | string;
    heading: string;
    headingClassName?: string;
    highlightedText?: null | string;
    showRule?: boolean;
    size?: "compact" | "default";
    tone?: "default" | "inverse";
};

export const SectionHeading = ({
    align = "left",
    className,
    eyebrow,
    heading,
    headingClassName,
    highlightedText,
    showRule = true,
    size = "default",
    tone = "default",
}: SectionHeadingProps) => {
    const content = (
        <div className={cn(align === "center" && "text-center")}>
            {eyebrow ? (
                <Eyebrow
                    align={align}
                    tone={tone === "inverse" ? "inverse" : "neutral"}
                >
                    {eyebrow}
                </Eyebrow>
            ) : null}
            <h2
                className={cn(
                    "leading-tight font-bold tracking-tight whitespace-pre-line",
                    size === "compact"
                        ? "text-3xl md:text-heading-lg"
                        : "text-4xl md:text-heading-xl",
                    eyebrow && (size === "compact" ? "mt-5" : "mt-4"),
                    tone === "inverse" ? "text-paper-0" : "text-ink-950",
                    align === "center" && "text-balance",
                    headingClassName,
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
