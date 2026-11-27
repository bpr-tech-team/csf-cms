import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import type { CenteredCtaBlock as CenteredCtaBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { SectionHeading } from "@/components/SectionHeading";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { cn } from "@/utilities/ui";
import React from "react";

export const CenteredCTABlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    backgroundMedia,
    heading,
    link,
    theme,
    locale = defaultLocale,
}: CenteredCtaBlockProps & BlockSpacingProps & { locale?: AppLocale }) => {
    const isLight = theme === "light";

    return (
        <BlockSection
            blockType="centeredCta"
            theme={theme}
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            className={cn(
                "relative overflow-hidden border-b text-center",
                isLight
                    ? "border-border-light text-ink-950"
                    : "border-border-dark text-paper-0",
            )}
            data-theme={isLight ? "light" : "dark"}
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
                    tone={isLight ? "default" : "inverse"}
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
