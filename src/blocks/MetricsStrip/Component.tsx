import type { MetricsStripBlock as MetricsStripBlockProps } from "@/payload-types";

import React from "react";

export const MetricsStripBlock = ({
    heading,
    items,
}: MetricsStripBlockProps) => {
    return (
        <section className="bg-ink-950 py-16 text-paper-0" data-theme="dark">
            <div className="container">
                <h2 className="text-center text-heading-lg font-bold tracking-[-0.03em]">
                    {heading}
                </h2>
                <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
                    {items.map((item, index) => (
                        <div
                            className="flex flex-col text-center"
                            key={item.id ?? index}
                        >
                            <dt className="order-1 mt-3 text-eyebrow uppercase text-paper-0/85">
                                {item.label}
                            </dt>
                            <dd className="text-[2.75rem] leading-none font-bold tracking-[-0.03em] text-brand-500 md:text-metric">
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
