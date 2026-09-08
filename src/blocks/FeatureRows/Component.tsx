import type { FeatureRowsBlock as FeatureRowsBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/Homepage/MediaAsset";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/ui";
import React from "react";

export const FeatureRowsBlock = ({
    anchorId,
    heading,
    items,
}: FeatureRowsBlockProps) => {
    return (
        <section
            className="scroll-mt-24 border-b border-brand-500 bg-paper-0 py-20 md:py-24 xl:py-28"
            id={anchorId || undefined}
        >
            <div className="container">
                <h2 className="text-4xl leading-tight font-bold tracking-normal text-ink-950 md:text-heading-xl">
                    {heading}
                </h2>

                <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
                    {items.map((item, index) => {
                        const isMediaLeft = item.mediaPosition === "left";

                        return (
                            <article
                                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24"
                                key={item.id ?? index}
                            >
                                <RichText
                                    className={cn(
                                        "text-body-md leading-7 text-neutral-secondary [&_li]:my-2 [&_ul]:my-0",
                                        isMediaLeft
                                            ? "lg:order-2"
                                            : "lg:order-1",
                                    )}
                                    data={item.richText}
                                    enableGutter={false}
                                />
                                <div
                                    className={cn(
                                        "relative aspect-[4/3] overflow-hidden rounded-lg border border-border-light bg-paper-50 lg:aspect-[16/10]",
                                        isMediaLeft
                                            ? "lg:order-1"
                                            : "lg:order-2",
                                    )}
                                >
                                    <MediaAsset
                                        className="absolute inset-0 size-full object-cover object-center"
                                        fill
                                        resource={item.media}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
