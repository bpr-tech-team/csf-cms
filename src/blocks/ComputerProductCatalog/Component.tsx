"use client";

import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { ComputerProductCatalogBlock as ComputerProductCatalogBlockProps } from "@/payload-types";
import { MediaAsset } from "@/components/MediaAsset";
import { HighlightedText } from "@/components/SectionHeading";
import { cn } from "@/utilities/ui";
import React, { useEffect, useId, useRef, useState } from "react";

const PAGE_SIZE = 12;
const VISIBLE_SPECIFICATIONS = 8;
const disclosureClassName =
    "mt-3 min-h-11 text-left text-body-sm font-bold text-ink-950 underline decoration-brand-500 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500";
const messages = {
    cs: {
        categories: "Kategorie produktů",
        moreProducts: "Zobrazit další",
        moreSpecifications: "Všechny parametry",
        lessSpecifications: "Méně parametrů",
    },
    en: {
        categories: "Product categories",
        moreProducts: "Show more",
        moreSpecifications: "All specifications",
        lessSpecifications: "Fewer specifications",
    },
};

type Category = ComputerProductCatalogBlockProps["categories"][number];
type Product = Category["products"][number];

const ProductCard = ({
    product,
    locale,
}: {
    product: Product;
    locale: AppLocale;
}) => {
    const [expanded, setExpanded] = useState(false);
    const specificationsId = useId();
    const specifications = product.specifications ?? [];

    return (
        <article className="row-span-4 grid min-w-0 grid-rows-subgrid gap-y-0">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-ink-950">
                <MediaAsset
                    alt={product.name}
                    className="absolute inset-0 size-full object-contain object-center p-4"
                    fill
                    resource={product.image}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 20vw"
                />
            </div>
            <h4
                className="mt-6 text-xl leading-7 font-bold whitespace-pre-line text-ink-950 [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-brand-500"
                tabIndex={-1}
            >
                {applyTypography(product.name, { locale })}
            </h4>
            <p className="mt-5 text-body-sm leading-6 whitespace-pre-line text-neutral-secondary [overflow-wrap:anywhere]">
                {applyTypography(product.summary, { locale })}
            </p>
            <div className="mt-5 pb-12">
                {specifications.length > 0 && (
                    <>
                        <dl
                            className="space-y-4 text-body-sm leading-6 [overflow-wrap:anywhere]"
                            id={specificationsId}
                        >
                            {specifications.map((specification, index) => (
                                <div
                                    key={specification.id ?? index}
                                    hidden={
                                        !expanded &&
                                        index >= VISIBLE_SPECIFICATIONS
                                    }
                                >
                                    <dt className="font-bold text-ink-950">
                                        {applyTypography(specification.label, {
                                            locale,
                                        })}
                                    </dt>
                                    <dd className="m-0 whitespace-pre-line text-neutral-secondary">
                                        {applyTypography(specification.value, {
                                            locale,
                                        })}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        {specifications.length > VISIBLE_SPECIFICATIONS && (
                            <button
                                aria-controls={specificationsId}
                                aria-expanded={expanded}
                                className={disclosureClassName}
                                onClick={() => setExpanded(!expanded)}
                                type="button"
                            >
                                {expanded
                                    ? messages[locale].lessSpecifications
                                    : messages[locale].moreSpecifications}
                            </button>
                        )}
                    </>
                )}
            </div>
        </article>
    );
};

const CategoryProducts = ({
    products,
    locale,
}: {
    products: Product[];
    locale: AppLocale;
}) => {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const gridRef = useRef<HTMLDivElement>(null);
    const gridId = useId();

    useEffect(() => {
        if (visibleCount > PAGE_SIZE) {
            gridRef.current
                ?.querySelectorAll("h4")
                [visibleCount - PAGE_SIZE]?.focus();
        }
    }, [visibleCount]);

    return (
        <>
            <div
                className="mt-12 grid grid-cols-1 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                id={gridId}
                ref={gridRef}
            >
                {products.slice(0, visibleCount).map((product, index) => (
                    <ProductCard
                        key={product.id ?? index}
                        product={product}
                        locale={locale}
                    />
                ))}
            </div>
            {visibleCount < products.length && (
                <div className="mt-2 flex justify-center">
                    <button
                        aria-controls={gridId}
                        className="min-h-12 rounded-pill bg-brand-500 px-7 py-3 text-body-sm font-bold text-ink-950 transition-colors hover:bg-brand-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
                        onClick={() =>
                            setVisibleCount((count) => count + PAGE_SIZE)
                        }
                        type="button"
                    >
                        {messages[locale].moreProducts}
                    </button>
                </div>
            )}
        </>
    );
};

export const ComputerProductCatalogBlock = ({
    locale = defaultLocale,
    anchorId,
    categories,
    highlightedTexts,
    navigationHeading,
}: ComputerProductCatalogBlockProps & { locale?: AppLocale }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const componentId = useId();
    const selectedIndex = activeIndex < categories.length ? activeIndex : 0;
    const activeCategory = categories[selectedIndex];

    if (!activeCategory) return null;

    return (
        <section className="scroll-mt-24" id={anchorId || undefined}>
            <div className="bg-ink-950 py-16 text-paper-0" data-theme="dark">
                <div className="container">
                    <h2 className="text-4xl leading-tight font-bold tracking-normal whitespace-pre-line md:text-heading-xl">
                        <HighlightedText
                            locale={locale}
                            highlightedTexts={highlightedTexts}
                            text={navigationHeading}
                        />
                    </h2>
                    <div
                        aria-label={messages[locale].categories}
                        className="mt-8 grid gap-3 md:grid-cols-3"
                        role="tablist"
                    >
                        {categories.map((category, index) => {
                            const isActive = index === selectedIndex;
                            return (
                                <button
                                    aria-controls={`${componentId}-panel`}
                                    aria-selected={isActive}
                                    className={cn(
                                        "min-h-12 min-w-0 rounded-pill border px-5 py-3 text-body-sm font-bold transition-colors [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500",
                                        isActive
                                            ? "border-brand-500 bg-brand-500 text-ink-950"
                                            : "border-brand-500/60 text-paper-0 hover:border-brand-500 hover:bg-brand-500/10",
                                    )}
                                    id={`${componentId}-tab-${index}`}
                                    key={category.id ?? index}
                                    onClick={() => setActiveIndex(index)}
                                    onKeyDown={(event) => {
                                        let nextIndex: number;
                                        if (event.key === "ArrowRight")
                                            nextIndex =
                                                (index + 1) % categories.length;
                                        else if (event.key === "ArrowLeft")
                                            nextIndex =
                                                (index -
                                                    1 +
                                                    categories.length) %
                                                categories.length;
                                        else if (event.key === "Home")
                                            nextIndex = 0;
                                        else if (event.key === "End")
                                            nextIndex = categories.length - 1;
                                        else return;
                                        event.preventDefault();
                                        setActiveIndex(nextIndex);
                                        event.currentTarget.parentElement
                                            ?.querySelectorAll<HTMLButtonElement>(
                                                '[role="tab"]',
                                            )
                                            [nextIndex]?.focus();
                                    }}
                                    role="tab"
                                    tabIndex={isActive ? 0 : -1}
                                    type="button"
                                >
                                    {applyTypography(category.label, {
                                        locale,
                                    })}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div
                aria-labelledby={`${componentId}-tab-${selectedIndex}`}
                className="bg-paper-0 py-20 md:py-24 xl:py-28"
                id={`${componentId}-panel`}
                role="tabpanel"
                tabIndex={0}
            >
                <div className="container">
                    <h3
                        className="max-w-4xl text-4xl leading-tight font-bold tracking-normal whitespace-pre-line text-ink-950 md:text-heading-xl"
                        id={`${componentId}-heading`}
                    >
                        <HighlightedText
                            locale={locale}
                            highlightedTexts={activeCategory.highlightedTexts}
                            text={activeCategory.heading}
                        />
                    </h3>
                    <CategoryProducts
                        key={activeCategory.id ?? selectedIndex}
                        products={activeCategory.products}
                        locale={locale}
                    />
                </div>
            </div>
        </section>
    );
};
