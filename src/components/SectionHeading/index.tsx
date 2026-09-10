import { defaultLocale, type AppLocale } from "@/i18n/config";
import React from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { cn } from "@/utilities/ui";
import { applyTypographyToSegments } from "@/utilities/typographySegments";

type SectionHeadingProps = {
    align?: "center" | "left";
    className?: string;
    eyebrow?: null | string;
    heading: string;
    headingClassName?: string;
    highlightedTexts?: HighlightedFragment[] | null;
    showRule?: boolean;
    size?: "compact" | "default";
    tone?: "default" | "inverse";
    typography?: boolean;
    locale?: AppLocale;
};

export const SectionHeading = ({
    align = "left",
    className,
    eyebrow,
    heading,
    headingClassName,
    highlightedTexts,
    showRule = true,
    size = "default",
    tone = "default",
    typography = true,
    locale = defaultLocale,
}: SectionHeadingProps) => {
    const content = (
        <div className={cn(align === "center" && "text-center")}>
            {eyebrow ? (
                <Eyebrow
                    locale={locale}
                    typography={typography}
                    align={align}
                    tone={tone === "inverse" ? "inverse" : "neutral"}
                >
                    {eyebrow}
                </Eyebrow>
            ) : null}
            <h2
                className={cn(
                    "leading-tight font-bold tracking-normal whitespace-pre-line",
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
                    locale={locale}
                    typography={typography}
                    highlightedTexts={highlightedTexts}
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
                "grid items-center gap-8 xl:grid-cols-[45fr_55fr]",
                className,
            )}
        >
            {content}
            <span aria-hidden className="hidden h-px bg-brand-500 xl:block" />
        </div>
    );
};

export const HighlightedText = ({
    highlightedTexts,
    text,
    typography = true,
    locale = defaultLocale,
}: {
    highlightedTexts?: HighlightedFragment[] | null;
    text: string;
    typography?: boolean;
    locale?: AppLocale;
}) => {
    const fragments = Array.from(
        new Set(
            highlightedTexts
                ?.map(({ text: fragment }) => fragment.trim())
                .filter(Boolean),
        ),
    ).sort((first, second) => second.length - first.length);

    const highlightedFragments = new Set(fragments);
    const pattern = fragments.map(escapeRegExp).join("|");
    const parts = fragments.length
        ? text.split(new RegExp(`(${pattern})`, "g"))
        : [text];
    const formattedParts = applyTypographyToSegments(parts, {
        locale,
        enabled: typography,
    });

    if (parts.length === 1) return formattedParts[0];

    return (
        <>
            {parts.map((part, index) =>
                highlightedFragments.has(part) ? (
                    <span className="text-brand-500" key={index}>
                        {formattedParts[index]}
                    </span>
                ) : (
                    formattedParts[index]
                ),
            )}
        </>
    );
};

type HighlightedFragment = {
    text: string;
};

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
