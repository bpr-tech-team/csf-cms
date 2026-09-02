import type { ServicesGridBlock as ServicesGridBlockProps } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { MediaAsset } from "@/components/Homepage/MediaAsset";
import { SectionHeading } from "@/components/Homepage/SectionHeading";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { cn } from "@/utilities/ui";
import React from "react";

const iconFallbacks = Array.from(
    { length: 6 },
    (_, index) =>
        `/media/homepage/services/card-icon-${String(index + 1).padStart(2, "0")}.svg`,
);

const framedIcons = new Set([0, 1, 5]);

export const ServicesGridBlock = ({
    eyebrow,
    heading,
    highlightedText,
    items,
    locale = defaultLocale,
}: ServicesGridBlockProps & { locale?: AppLocale }) => {
    return (
        <section
            className="bg-paper-0 py-20 md:py-28 xl:py-[7.5rem]"
            id="sluzby"
        >
            <div className="container">
                <SectionHeading
                    eyebrow={eyebrow}
                    heading={heading}
                    highlightedText={highlightedText}
                />

                <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-6">
                    {items.map((item, index) => {
                        const content = (
                            <>
                                <span
                                    className={cn(
                                        "relative flex size-16 items-center justify-center rounded-md",
                                        !framedIcons.has(index) &&
                                            "bg-brand-200",
                                    )}
                                >
                                    <MediaAsset
                                        alt=""
                                        className={cn(
                                            "object-contain",
                                            framedIcons.has(index)
                                                ? "size-16"
                                                : "size-8",
                                        )}
                                        fallback={
                                            iconFallbacks[
                                                index % iconFallbacks.length
                                            ]
                                        }
                                        height={
                                            framedIcons.has(index) ? 64 : 38
                                        }
                                        resource={item.icon}
                                        width={framedIcons.has(index) ? 64 : 38}
                                    />
                                </span>
                                <h3 className="mt-8 text-heading-md font-medium text-ink-950">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-body-md text-ink-950">
                                    {item.description}
                                </p>
                            </>
                        );

                        return (
                            <article
                                className="flex min-h-[20rem] flex-col rounded-lg border border-border-light bg-ink-950/[0.02] p-6 backdrop-blur-[5px]"
                                key={item.id ?? index}
                            >
                                {content}
                                {item.link && (
                                    <CMSLink
                                        {...item.link}
                                        appearance="inline"
                                        className="mt-auto pt-8 text-body-md font-medium text-[#131409] underline underline-offset-2 transition-colors hover:text-brand-600"
                                        locale={locale}
                                    />
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
