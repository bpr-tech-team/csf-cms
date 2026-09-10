import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { SplitContentBlock as SplitContentBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { HighlightedText } from "@/components/SectionHeading";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";
import React from "react";

export const SplitContentBlock = ({
    locale = defaultLocale,
    anchorId,
    heading,
    highlightedTexts,
    media,
    mediaPosition,
    richText,
    sectionHeading,
    theme,
}: SplitContentBlockProps & { locale?: AppLocale }) => {
    const isDark = theme === "dark";
    const isMediaLeft = mediaPosition === "left";

    return (
        <section
            className={cn(
                "scroll-mt-24 py-20 md:py-24 xl:py-28",
                isDark ? "bg-ink-950 text-paper-0" : "bg-paper-0 text-ink-950",
            )}
            data-theme={isDark ? "dark" : undefined}
            id={anchorId || undefined}
        >
            <div className="container">
                {sectionHeading ? (
                    <div className="mb-12 md:mb-16">
                        <h2 className="text-4xl leading-tight font-bold tracking-normal whitespace-pre-line md:text-heading-xl">
                            <HighlightedText
                                locale={locale}
                                highlightedTexts={highlightedTexts}
                                text={sectionHeading}
                            />
                        </h2>
                        <span
                            aria-hidden
                            className="mt-8 block h-px w-full bg-brand-500"
                        />
                    </div>
                ) : null}

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
                    <div
                        className={cn(
                            isMediaLeft ? "lg:order-2" : "lg:order-1",
                        )}
                    >
                        <h3 className="text-3xl leading-tight font-bold tracking-normal md:text-heading-lg">
                            {applyTypography(heading, { locale })}
                        </h3>
                        <RichText
                            locale={locale}
                            className={cn(
                                "mt-6 text-body-md leading-7 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4 [&_li]:my-2 [&_ul]:my-0",
                                isDark
                                    ? "text-paper-0/85 [&_a]:text-paper-0"
                                    : "text-neutral-secondary [&_a]:text-ink-950",
                            )}
                            data={richText}
                            enableGutter={false}
                        />
                    </div>

                    <div
                        className={cn(
                            "relative aspect-[4/3] overflow-hidden rounded-lg border bg-paper-50 lg:aspect-square",
                            isDark
                                ? "border-border-dark bg-olive-900"
                                : "border-border-light",
                            isMediaLeft ? "lg:order-1" : "lg:order-2",
                        )}
                    >
                        <MediaAsset
                            className="absolute inset-0 size-full object-cover object-center"
                            fill
                            resource={media}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
