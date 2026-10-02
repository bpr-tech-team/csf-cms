import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { HeroContent } from "@/components/HeroContent";
import { HeroSection } from "@/components/HeroSection";
import type { AppLocale } from "@/i18n/config";
import type { HeroBlock as HeroBlockProps } from "@/payload-types";

export const HeroBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    backgroundMedia,
    isPageIntro,
    ...content
}: HeroBlockProps &
    BlockSpacingProps & { isPageIntro?: boolean; locale?: AppLocale }) => (
    <HeroSection
        spacing={sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }}
        backgroundMedia={backgroundMedia}
        isPageIntro={isPageIntro}
    >
        <HeroContent {...content} isPageIntro={isPageIntro} />
    </HeroSection>
);
