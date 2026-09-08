"use client";

import type { ComputerProductCatalogBlock as ComputerProductCatalogBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/Homepage/MediaAsset";
import { HighlightedText } from "@/components/Homepage/SectionHeading";
import { cn } from "@/utilities/ui";
import React, { useId, useState } from "react";

export const ComputerProductCatalogBlock = ({
    anchorId,
    categories,
    highlightedTexts,
    navigationHeading,
}: ComputerProductCatalogBlockProps) => {
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
                            highlightedTexts={highlightedTexts}
                            text={navigationHeading}
                        />
                    </h2>
                    <div
                        aria-label="Kategorie produktů"
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
                                        "min-h-12 rounded-pill border px-5 py-3 text-body-sm font-bold transition-colors",
                                        isActive
                                            ? "border-brand-500 bg-brand-500 text-ink-950"
                                            : "border-brand-500/60 text-paper-0 hover:border-brand-500 hover:bg-brand-500/10",
                                    )}
                                    id={`${componentId}-tab-${index}`}
                                    key={category.id ?? index}
                                    onClick={() => setActiveIndex(index)}
                                    role="tab"
                                    type="button"
                                >
                                    {category.label}
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
            >
                <div className="container">
                    <h3 className="max-w-4xl text-4xl leading-tight font-bold tracking-normal whitespace-pre-line text-ink-950 md:text-heading-xl">
                        <HighlightedText
                            highlightedTexts={activeCategory.highlightedTexts}
                            text={activeCategory.heading}
                        />
                    </h3>

                    <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {activeCategory.products.map((product, index) => (
                            <article key={product.id ?? index}>
                                <div className="relative aspect-square overflow-hidden rounded-lg bg-ink-950">
                                    <MediaAsset
                                        alt={product.name}
                                        className="absolute inset-0 size-full object-contain object-center p-4"
                                        fill
                                        resource={product.image}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                                    />
                                </div>
                                <h4 className="mt-6 text-xl leading-7 font-bold whitespace-pre-line text-ink-950">
                                    {product.name}
                                </h4>
                                <p className="mt-5 text-body-sm leading-6 whitespace-pre-line text-neutral-secondary">
                                    {product.summary}
                                </p>

                                {product.specifications?.length ? (
                                    <dl className="mt-5 space-y-4 text-body-sm leading-6">
                                        {product.specifications.map(
                                            (
                                                specification,
                                                specificationIndex,
                                            ) => (
                                                <div
                                                    key={
                                                        specification.id ??
                                                        specificationIndex
                                                    }
                                                >
                                                    <dt className="font-bold text-ink-950">
                                                        {specification.label}
                                                    </dt>
                                                    <dd className="m-0 whitespace-pre-line text-neutral-secondary">
                                                        {specification.value}
                                                    </dd>
                                                </div>
                                            ),
                                        )}
                                    </dl>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
