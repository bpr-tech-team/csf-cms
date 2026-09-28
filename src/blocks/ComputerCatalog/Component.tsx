"use client";

import React, { useState } from "react";
import { ComputerAudienceBlock } from "@/blocks/ComputerAudience/Component";
import { ComputerProductCatalogBlock } from "@/blocks/ComputerProductCatalog/Component";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { ComputerCatalogBlock as ComputerCatalogBlockProps } from "@/payload-types";

export const ComputerCatalogBlock = ({
    anchorId,
    audiences,
    highlightedTexts,
    navigationHeading,
    locale = defaultLocale,
}: ComputerCatalogBlockProps & { locale?: AppLocale }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const selectedIndex = activeIndex < audiences.length ? activeIndex : 0;
    const audience = audiences[selectedIndex];

    if (!audience) return null;

    return (
        <section className="scroll-mt-24" id={anchorId || undefined}>
            <ComputerAudienceBlock
                blockType="computerAudience"
                items={audiences}
                locale={locale}
                activeIndex={selectedIndex}
                onActiveIndexChange={setActiveIndex}
            />
            <ComputerProductCatalogBlock
                blockType="computerProductCatalog"
                // A new audience starts at its first category and resets card disclosure/pagination.
                key={audience.id ?? selectedIndex}
                categories={audience.categories}
                highlightedTexts={highlightedTexts}
                navigationHeading={navigationHeading}
                locale={locale}
                imagePadding={false}
            />
        </section>
    );
};
