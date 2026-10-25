import type { ReactNode } from "react";

import { StaticBranchesMap } from "@/components/BranchesMap/StaticBranchesMap";
import type { BranchMapPosition } from "@/components/BranchesMap/positions";
import { HeroSection } from "@/components/HeroSection";
import type { SectionSpacing } from "@/utilities/blockSpacing";

import styles from "./styles.module.css";

type BranchHeroSectionProps = {
    children: ReactNode;
    highlightedPoint?: BranchMapPosition | null;
    isPageIntro?: boolean;
    spacing?: SectionSpacing;
};

export const BranchHeroSection = ({
    children,
    highlightedPoint,
    isPageIntro = false,
    spacing,
}: BranchHeroSectionProps) => (
    <HeroSection
        isPageIntro={isPageIntro}
        spacing={spacing}
        variant={isPageIntro ? "pageIntro" : "default"}
    >
        <div className={styles.layout}>
            <div className={styles.content}>{children}</div>
            <StaticBranchesMap
                className={styles.map}
                highlightedPoint={highlightedPoint}
                loading={isPageIntro ? "eager" : "lazy"}
            />
        </div>
    </HeroSection>
);
