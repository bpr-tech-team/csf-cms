import { BlockSection } from "@/components/BlockSection";
import type { SectionSpacing } from "@/utilities/blockSpacing";
import type { ReactNode } from "react";

import { HeroBackground } from "@/components/HeroBackground";
import type { Media } from "@/payload-types";

type HeroSectionProps = {
    backgroundMedia?: Media | number | null;
    children: ReactNode;
    spacing?: SectionSpacing;
    isPageIntro?: boolean;
    label?: string;
    onAutoplayChange?: (running: boolean) => void;
};

export const HeroSection = ({
    spacing,
    backgroundMedia,
    children,
    isPageIntro = false,
    label,
    onAutoplayChange,
}: HeroSectionProps) => (
    <BlockSection
        blockType="hero"
        isPageIntro={isPageIntro}
        spacing={spacing}
        aria-label={label}
        className="relative isolate min-h-120 overflow-hidden text-paper-0"
        data-theme="dark"
    >
        <HeroBackground
            isPageIntro={isPageIntro}
            onAutoplayChange={onAutoplayChange}
            resource={backgroundMedia}
        />
        <div className="container relative z-10">{children}</div>
    </BlockSection>
);
