import { BlockSection } from "@/components/BlockSection";
import type { SectionSpacing } from "@/utilities/blockSpacing";
import type { ReactNode } from "react";

import { HeroBackground } from "@/components/HeroBackground";
import type { Media } from "@/payload-types";
import { isImageMedia } from "@/utilities/isImageMedia";
import { cn } from "@/utilities/ui";

import styles from "./styles.module.css";

type HeroSectionProps = {
    backgroundMedia?: Media | number | null;
    children: ReactNode;
    spacing?: SectionSpacing;
    isPageIntro?: boolean;
    label?: string;
    onAutoplayChange?: (running: boolean) => void;
    variant?: "default" | "pageIntro";
};

export const HeroSection = ({
    spacing,
    backgroundMedia,
    children,
    isPageIntro = false,
    label,
    onAutoplayChange,
    variant = "default",
}: HeroSectionProps) => (
    <BlockSection
        blockType="hero"
        isPageIntro={isPageIntro}
        spacing={spacing}
        aria-label={label}
        className={cn(
            "relative isolate min-h-120 overflow-hidden text-paper-0",
            variant === "pageIntro" && styles.pageIntro,
        )}
        data-hero-reveal={
            isPageIntro && isImageMedia(backgroundMedia) ? "pending" : undefined
        }
        data-theme="dark"
        // The parser-time script owns only this element's reveal attribute.
        suppressHydrationWarning={isPageIntro && isImageMedia(backgroundMedia)}
    >
        <HeroBackground
            isPageIntro={isPageIntro}
            onAutoplayChange={onAutoplayChange}
            resource={backgroundMedia}
        />
        <div className="container relative z-10">{children}</div>
    </BlockSection>
);
