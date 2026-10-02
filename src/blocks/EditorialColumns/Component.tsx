import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { EditorialColumnsBlock as EditorialColumnsBlockProps } from "@/payload-types";

import { HighlightedText } from "@/components/SectionHeading";
import RichText from "@/components/RichText";
import React from "react";

export const EditorialColumnsBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    locale = defaultLocale,
    anchorId,
    columns,
    heading,
    highlightedTexts,
}: EditorialColumnsBlockProps & BlockSpacingProps & { locale?: AppLocale }) => {
    return (
        <BlockSection
            blockType="editorialColumns"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            className="scroll-mt-24 text-paper-0"
            data-theme="dark"
            id={anchorId || undefined}
        >
            <div className="container">
                <h2 className="max-w-4xl text-4xl leading-tight font-bold tracking-normal whitespace-pre-line md:text-heading-xl">
                    <HighlightedText
                        locale={locale}
                        highlightedTexts={highlightedTexts}
                        text={heading}
                    />
                </h2>

                <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
                    {columns.map((column, index) => (
                        <RichText
                            locale={locale}
                            className="text-body-md leading-7 text-paper-0/75 [&_a]:text-paper-0 [&_li]:my-2 [&_p]:my-0 [&_ul]:my-0"
                            data={column.richText}
                            enableGutter={false}
                            key={column.id ?? index}
                        />
                    ))}
                </div>
            </div>
        </BlockSection>
    );
};
