import { HeroContent } from "@/components/HeroContent";
import { HeroSection } from "@/components/HeroSection";
import type { AppLocale } from "@/i18n/config";
import type { HeroBlock as HeroBlockProps } from "@/payload-types";

export const HeroBlock = ({
    backgroundMedia,
    isPageIntro,
    ...content
}: HeroBlockProps & { isPageIntro?: boolean; locale?: AppLocale }) => (
    <HeroSection backgroundMedia={backgroundMedia} isPageIntro={isPageIntro}>
        <HeroContent {...content} isPageIntro={isPageIntro} />
    </HeroSection>
);
