import { applyTypography } from "@/utilities/typography";
import type { ServicesGridBlock as ServicesGridBlockProps } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { CardIcon } from "@/components/CardIcon";
import { SectionHeading } from "@/components/SectionHeading";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import React from "react";

export const ServicesGridBlock = ({
    eyebrow,
    heading,
    highlightedTexts,
    items,
    locale = defaultLocale,
}: ServicesGridBlockProps & { locale?: AppLocale }) => {
    return (
        <section className="bg-paper-0 py-20 md:py-28 xl:py-30" id="sluzby">
            <div className="container">
                <SectionHeading
                    locale={locale}
                    eyebrow={eyebrow}
                    heading={heading}
                    highlightedTexts={highlightedTexts}
                />

                <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-6">
                    {items.map((item, index) => {
                        const content = (
                            <>
                                <CardIcon resource={item.icon} />
                                <h3 className="mt-6 text-heading-md font-medium text-ink-950">
                                    {applyTypography(item.title, { locale })}
                                </h3>
                                <p className="mt-3 text-body-md font-normal text-ink-950">
                                    {applyTypography(item.description, {
                                        locale,
                                    })}
                                </p>
                            </>
                        );

                        return (
                            <article
                                className="flex min-h-80 flex-col rounded-lg border border-border-light bg-ink-950/[0.02] p-6 backdrop-blur-sm"
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
