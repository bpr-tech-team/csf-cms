import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { MetricsStripBlock as MetricsStripBlockProps } from "@/payload-types";

import { Eyebrow } from "@/components/Eyebrow";
import React from "react";
import { AnimatedMetric } from "./AnimatedMetric";

export const MetricsStripBlock = ({
    locale = defaultLocale,
    heading,
    items,
}: MetricsStripBlockProps & { locale?: AppLocale }) => {
    return (
        <section className="bg-ink-950 py-16 text-paper-0" data-theme="dark">
            <div className="container">
                <h2 className="text-center text-heading-lg font-bold">
                    {applyTypography(heading, { locale })}
                </h2>
                <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 xl:grid-cols-4">
                    {items.map((item, index) => (
                        <div
                            className="flex flex-col text-center"
                            key={item.id ?? index}
                        >
                            <Eyebrow
                                locale={locale}
                                align="center"
                                as="dt"
                                className="order-1 mt-3"
                                tone="inverse"
                            >
                                {item.label}
                            </Eyebrow>
                            <dd className="text-4xl leading-none font-bold tracking-normal text-brand-500 sm:text-5xl md:text-metric">
                                <AnimatedMetric
                                    value={item.value}
                                    prefix={item.prefix}
                                    suffix={item.suffix}
                                />
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};
