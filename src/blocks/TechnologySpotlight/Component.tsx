import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { TechnologySpotlightBlock as TechnologySpotlightBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { HighlightedText } from "@/components/SectionHeading";
import React from "react";

export const TechnologySpotlightBlock = ({
    locale = defaultLocale,
    anchorId,
    description,
    heading,
    highlightedTexts,
    logos,
    supportingMedia,
}: TechnologySpotlightBlockProps & { locale?: AppLocale }) => {
    return (
        <section
            className="scroll-mt-24 bg-ink-950 py-20 text-paper-0 md:py-24 xl:py-28"
            data-theme="dark"
            id={anchorId || undefined}
        >
            <div className="container">
                <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
                    <div>
                        <h2 className="text-4xl leading-tight font-bold tracking-normal whitespace-pre-line md:text-heading-xl">
                            <HighlightedText
                                locale={locale}
                                highlightedTexts={highlightedTexts}
                                text={heading}
                            />
                        </h2>
                        {description ? (
                            <p className="mt-6 max-w-3xl text-body-md leading-7 whitespace-pre-line text-paper-0/75 md:text-body-lg md:leading-8">
                                {applyTypography(description, { locale })}
                            </p>
                        ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {logos.map((item, index) => (
                            <div
                                className="relative aspect-square overflow-hidden rounded-lg border border-border-dark bg-olive-900"
                                key={item.id ?? index}
                            >
                                <MediaAsset
                                    alt={item.name}
                                    className="absolute inset-0 size-full object-contain object-center p-6"
                                    fill
                                    resource={item.logo}
                                    sizes="(max-width: 1024px) 50vw, 20vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {supportingMedia ? (
                    <div className="relative mx-auto mt-14 aspect-[16/7] max-w-3xl overflow-hidden rounded-lg border border-border-dark bg-olive-900">
                        <MediaAsset
                            alt=""
                            className="absolute inset-0 size-full object-contain object-center p-4"
                            fill
                            resource={supportingMedia}
                            sizes="(max-width: 768px) 100vw, 48rem"
                        />
                    </div>
                ) : null}
            </div>
        </section>
    );
};
