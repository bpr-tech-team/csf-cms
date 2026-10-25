import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { HeroContent } from "@/components/HeroContent";
import { HeroSection } from "@/components/HeroSection";
import { BranchHeroSection } from "@/components/BranchHeroSection";
import type { AppLocale } from "@/i18n/config";
import type { HeroBlock as HeroBlockProps, Page } from "@/payload-types";

export const HeroBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    backgroundMedia,
    isPageIntro,
    page,
    ...content
}: HeroBlockProps &
    BlockSpacingProps & {
        isPageIntro?: boolean;
        locale?: AppLocale;
        page?: Pick<Page, "pageType" | "branchInfo">;
    }) => {
    const spacing = sectionSpacing ?? {
        top: spacingTop,
        bottom: spacingBottom,
    };
    const heroContent = <HeroContent {...content} isPageIntro={isPageIntro} />;

    if (page?.pageType === "branch") {
        return (
            <BranchHeroSection
                highlightedPoint={page.branchInfo?.mapPosition}
                isPageIntro={isPageIntro}
                spacing={spacing}
            >
                {heroContent}
            </BranchHeroSection>
        );
    }

    return (
        <HeroSection
            spacing={spacing}
            backgroundMedia={backgroundMedia}
            isPageIntro={isPageIntro}
            variant={isPageIntro ? "pageIntro" : "default"}
        >
            {heroContent}
        </HeroSection>
    );
};
