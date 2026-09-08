import type { MetricsStripBlock as MetricsStripBlockProps } from "@/payload-types";

import { Eyebrow } from "@/components/Eyebrow";
import React from "react";

export const MetricsStripBlock = ({
    heading,
    items,
}: MetricsStripBlockProps) => {
    return (
        <section className="bg-ink-950 py-16 text-paper-0" data-theme="dark">
            <div className="container">
                <h2 className="text-center text-heading-lg font-bold">
                    {heading}
                </h2>
                <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 xl:grid-cols-4">
                    {items.map((item, index) => (
                        <div
                            className="flex flex-col text-center"
                            key={item.id ?? index}
                        >
                            <Eyebrow
                                align="center"
                                as="dt"
                                className="order-1 mt-3"
                                tone="inverse"
                            >
                                {item.label}
                            </Eyebrow>
                            <dd className="text-4xl leading-none font-bold tracking-normal text-brand-500 sm:text-5xl md:text-metric">
                                {item.prefix}
                                {new Intl.NumberFormat("cs-CZ").format(
                                    item.value,
                                )}
                                {item.suffix}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};
