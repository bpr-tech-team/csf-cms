import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { MediaFeatureGridBlock as MediaFeatureGridBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { HighlightedText } from "@/components/SectionHeading";
import React from "react";

export const MediaFeatureGridBlock = ({
    locale = defaultLocale,
    anchorId,
    description,
    heading,
    highlightedTexts,
    items,
}: MediaFeatureGridBlockProps & { locale?: AppLocale }) => {
    return (
        <section
            className="scroll-mt-24 bg-ink-950 py-20 text-paper-0 md:py-24 xl:py-28"
            data-theme="dark"
            id={anchorId || undefined}
        >
            <div className="container">
                <h2 className="max-w-4xl text-4xl leading-tight font-bold tracking-normal whitespace-pre-line md:text-heading-xl">
                    <HighlightedText
                        locale={locale}
                        highlightedTexts={highlightedTexts}
                        text={heading}
                    />
                </h2>
                {description ? (
                    <p className="mt-6 max-w-4xl text-body-md leading-7 whitespace-pre-line text-paper-0/75 md:text-body-lg md:leading-8">
                        {applyTypography(description, { locale })}
                    </p>
                ) : null}

                <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item, index) => (
                        <article key={item.id ?? index}>
                            <div className="relative aspect-video overflow-hidden rounded-lg border border-border-dark bg-olive-900">
                                <MediaAsset
                                    alt={item.title}
                                    className="absolute inset-0 size-full object-cover object-center"
                                    fill
                                    resource={item.media}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                />
                            </div>
                            <h3 className="mt-6 text-xl leading-7 font-bold uppercase">
                                {applyTypography(item.title, { locale })}
                            </h3>
                            <p className="mt-4 text-body-sm leading-6 whitespace-pre-line text-paper-0/75">
                                {applyTypography(item.description, { locale })}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
