import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import type { CenteredCtaBlock as CenteredCtaBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { SectionHeading } from "@/components/SectionHeading";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import React from "react";

export const CenteredCTABlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    backgroundMedia,
    heading,
    link,
    locale = defaultLocale,
}: CenteredCtaBlockProps & BlockSpacingProps & { locale?: AppLocale }) => {
    return (
        <BlockSection
            blockType="centeredCta"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            className="relative overflow-hidden border-b border-border-dark text-center text-paper-0"
            data-theme="dark"
        >
            {backgroundMedia && (
                <MediaAsset
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-20"
                    fill
                    resource={backgroundMedia}
                    sizes="100vw"
                />
            )}
            <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgb(175_203_8/0.09),transparent_32%)]"
            />
            <div className="container relative z-10">
                <SectionHeading
                    locale={locale}
                    align="center"
                    className="mx-auto max-w-[60rem]"
                    heading={heading}
                    showRule={false}
                    tone="inverse"
                />
                {link && (
                    <CMSLink
                        {...link}
                        appearance="default"
                        className="mt-12"
                        locale={locale}
                        size="lg"
                    />
                )}
            </div>
        </BlockSection>
    );
};
