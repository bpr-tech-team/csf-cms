import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { ServiceSectionIntroBlock as ServiceSectionIntroBlockProps } from "@/payload-types";

import React from "react";
import { SectionDivider } from "@/components/SectionDivider";

export const ServiceSectionIntroBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    locale = defaultLocale,
    anchorId,
    description,
    heading,
    divider,
}: ServiceSectionIntroBlockProps &
    BlockSpacingProps & { locale?: AppLocale }) => {
    return (
        <BlockSection
            blockType="serviceSectionIntro"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            className="scroll-mt-24 [container-type:inline-size]"
            id={anchorId || undefined}
        >
            <div className="container">
                <h2 className="text-4xl leading-tight font-bold tracking-normal text-ink-950 md:text-heading-xl">
                    {applyTypography(heading, { locale })}
                </h2>
                <p className="mt-5 max-w-5xl text-body-md leading-7 text-neutral-secondary md:text-body-lg">
                    {applyTypography(description, { locale })}
                </p>
                {divider !== "none" ? (
                    <SectionDivider className="mt-10" />
                ) : null}
            </div>
        </BlockSection>
    );
};
