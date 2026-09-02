import type { ProductsGridBlock as ProductsGridBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/Homepage/MediaAsset";
import { SectionHeading } from "@/components/Homepage/SectionHeading";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { cn } from "@/utilities/ui";
import React from "react";

const imageFallbacks = [
    undefined,
    "/media/homepage/products/image-05.png",
    "/media/homepage/products/image-02.jpg",
    "/media/homepage/products/image-04.png",
    "/media/homepage/products/image-03.png",
    "/media/homepage/products/image-06.png",
];

const iconFallbacks = [
    "/media/homepage/products/vector-01.svg",
    "/media/homepage/products/vector-02.svg",
    "/media/homepage/products/vector-03.svg",
    "/media/homepage/products/vector-01.svg",
    "/media/homepage/products/vector-02.svg",
    "/media/homepage/products/vector-03.svg",
];

const framedIcons = new Set([1, 4]);

export const ProductsGridBlock = ({
    eyebrow,
    heading,
    highlightedText,
    items,
    locale = defaultLocale,
}: ProductsGridBlockProps & { locale?: AppLocale }) => {
    return (
        <section
            className="bg-paper-0 py-20 md:py-28 xl:py-[7.5rem]"
            id="produkty"
        >
            <div className="container">
                <SectionHeading
                    eyebrow={eyebrow}
                    heading={heading}
                    highlightedText={highlightedText}
                />

                <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
                    {items.map((item, index) => (
                        <ProductCard
                            fallbackIcon={
                                iconFallbacks[index % iconFallbacks.length]
                            }
                            fallbackImage={
                                imageFallbacks[index % imageFallbacks.length]
                            }
                            framedIcon={framedIcons.has(index)}
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
    fallbackIcon,
    fallbackImage,
    framedIcon,
    item,
    locale,
}: {
    fallbackIcon: string;
    fallbackImage?: string;
    framedIcon: boolean;
    item: ProductsGridBlockProps["items"][number];
    locale: AppLocale;
}) => {
    const content = (
        <>
            <span className="relative block h-40 overflow-hidden rounded-sm bg-paper-50">
                {(item.image || fallbackImage) && (
                    <MediaAsset
                        alt=""
                        className="size-full object-cover grayscale"
                        fallback={fallbackImage}
                        fill
                        resource={item.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                )}
            </span>
            <span
                className={cn(
                    "relative mt-7 flex size-16 items-center justify-center rounded-md",
                    !framedIcon && "bg-brand-200",
                )}
            >
                <MediaAsset
                    alt=""
                    className={
                        framedIcon
                            ? "size-16 object-contain"
                            : "size-8 object-contain"
                    }
                    fallback={fallbackIcon}
                    height={framedIcon ? 64 : 38}
                    resource={item.icon}
                    width={framedIcon ? 64 : 38}
                />
            </span>
            <h3 className="mt-6 text-heading-md font-medium text-ink-950">
                {item.title}
            </h3>
            <p className="mt-3 text-body-md text-ink-950">{item.description}</p>
        </>
    );
    const className =
        "group flex min-h-[28rem] flex-col rounded-lg border border-border-light bg-ink-950/[0.02] p-6 backdrop-blur-[5px] transition-[border-color,transform] duration-base hover:-translate-y-0.5 hover:border-brand-500/40";

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
