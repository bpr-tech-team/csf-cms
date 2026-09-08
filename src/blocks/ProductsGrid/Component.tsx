import type { ProductsGridBlock as ProductsGridBlockProps } from "@/payload-types";

import { CardIcon } from "@/components/Homepage/CardIcon";
import { MediaAsset } from "@/components/Homepage/MediaAsset";
import { SectionHeading } from "@/components/Homepage/SectionHeading";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import React from "react";

export const ProductsGridBlock = ({
    eyebrow,
    heading,
    highlightedText,
    items,
    locale = defaultLocale,
}: ProductsGridBlockProps & { locale?: AppLocale }) => {
    return (
        <section className="bg-paper-0 py-20 md:py-28 xl:py-30" id="produkty">
            <div className="container">
                <SectionHeading
                    eyebrow={eyebrow}
                    heading={heading}
                    highlightedText={highlightedText}
                />

                <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
                    {items.map((item, index) => (
                        <ProductCard
                            item={item}
                            key={item.id ?? index}
                            locale={locale}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProductCard = ({
    item,
    locale,
}: {
    item: ProductsGridBlockProps["items"][number];
    locale: AppLocale;
}) => {
    const content = (
        <>
            <span className="relative block h-40 overflow-hidden rounded-sm bg-paper-50">
                {item.image && (
                    <MediaAsset
                        alt=""
                        className="size-full object-cover grayscale"
                        fill
                        resource={item.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                )}
            </span>
            <CardIcon className="mt-7" resource={item.icon} />
            <h3 className="mt-6 text-heading-md font-medium text-ink-950">
                {item.title}
            </h3>
            <p className="mt-3 text-body-md font-normal text-ink-950">
                {item.description}
            </p>
        </>
    );
    const className =
        "group flex min-h-112 flex-col rounded-lg border border-border-light bg-ink-950/[0.02] p-6 backdrop-blur-sm transition-[border-color,transform] duration-base hover:-translate-y-0.5 hover:border-brand-500/40";

    if (!item.link) {
        return <article className={className}>{content}</article>;
    }

    return (
        <CMSLink
            {...item.link}
            appearance="inline"
            className={className}
            label={null}
            locale={locale}
        >
            {content}
        </CMSLink>
    );
};
