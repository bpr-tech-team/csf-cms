import { createElement, type ComponentPropsWithRef } from "react";

import {
    getBlockPresentation,
    type BlockPresentationOptions,
    type PageBlockType,
    type SectionSpacing,
    type SectionSpacingDefaults,
    type SectionSpacingPreset,
} from "@/utilities/blockSpacing";
import { cn } from "@/utilities/ui";

// Complete Tailwind classes are intentional: the scanner must see every utility.
// Auto presets and CMS overrides use the same tokens and responsive scale.
const spacingTokens = {
    none: {
        value: "[--section-spacing-none:0px]",
        top: "[--section-space-top:var(--section-spacing-none)]",
        bottom: "[--section-space-bottom:var(--section-spacing-none)]",
    },
    compact: {
        value: "[--section-spacing-compact:--spacing(8)] md:[--section-spacing-compact:--spacing(10)] xl:[--section-spacing-compact:--spacing(12)]",
        top: "[--section-space-top:var(--section-spacing-compact)]",
        bottom: "[--section-space-bottom:var(--section-spacing-compact)]",
    },
    normal: {
        value: "[--section-spacing-normal:--spacing(16)] md:[--section-spacing-normal:--spacing(20)] xl:[--section-spacing-normal:--spacing(24)]",
        top: "[--section-space-top:var(--section-spacing-normal)]",
        bottom: "[--section-space-bottom:var(--section-spacing-normal)]",
    },
    large: {
        value: "[--section-spacing-large:--spacing(24)] md:[--section-spacing-large:--spacing(28)] xl:[--section-spacing-large:--spacing(32)]",
        top: "[--section-space-top:var(--section-spacing-large)]",
        bottom: "[--section-space-bottom:var(--section-spacing-large)]",
    },
    content: {
        value: "[--section-spacing-content:--spacing(20)] md:[--section-spacing-content:--spacing(24)] xl:[--section-spacing-content:--spacing(28)]",
        top: "[--section-space-top:var(--section-spacing-content)]",
        bottom: "[--section-space-bottom:var(--section-spacing-content)]",
    },
    standard: {
        value: "[--section-spacing-standard:--spacing(20)] md:[--section-spacing-standard:--spacing(24)]",
        top: "[--section-space-top:var(--section-spacing-standard)]",
        bottom: "[--section-space-bottom:var(--section-spacing-standard)]",
    },
    grid: {
        value: "[--section-spacing-grid:--spacing(20)] md:[--section-spacing-grid:--spacing(28)] xl:[--section-spacing-grid:--spacing(30)]",
        top: "[--section-space-top:var(--section-spacing-grid)]",
        bottom: "[--section-space-bottom:var(--section-spacing-grid)]",
    },
    intro: {
        value: "[--section-spacing-intro:--spacing(16)] md:[--section-spacing-intro:--spacing(20)]",
        top: "[--section-space-top:var(--section-spacing-intro)]",
        bottom: "[--section-space-bottom:var(--section-spacing-intro)]",
    },
    short: {
        value: "[--section-spacing-short:--spacing(16)]",
        top: "[--section-space-top:var(--section-spacing-short)]",
        bottom: "[--section-space-bottom:var(--section-spacing-short)]",
    },
    marquee: {
        value: "[--section-spacing-marquee:--spacing(9)]",
        top: "[--section-space-top:var(--section-spacing-marquee)]",
        bottom: "[--section-space-bottom:var(--section-spacing-marquee)]",
    },
    cta: {
        value: "[--section-spacing-cta:--spacing(24)] md:[--section-spacing-cta:--spacing(28)]",
        top: "[--section-space-top:var(--section-spacing-cta)]",
        bottom: "[--section-space-bottom:var(--section-spacing-cta)]",
    },
    timelineTop: {
        value: "[--section-spacing-timeline-top:--spacing(20)] xl:[--section-spacing-timeline-top:--spacing(24)]",
        top: "[--section-space-top:var(--section-spacing-timeline-top)]",
        bottom: "[--section-space-bottom:var(--section-spacing-timeline-top)]",
    },
    timelineBottom: {
        value: "[--section-spacing-timeline-bottom:--spacing(20)] xl:[--section-spacing-timeline-bottom:--spacing(28)]",
        top: "[--section-space-top:var(--section-spacing-timeline-bottom)]",
        bottom: "[--section-space-bottom:var(--section-spacing-timeline-bottom)]",
    },
    clientServiceTop: {
        value: "[--section-spacing-client-service-top:--spacing(16)] md:[--section-spacing-client-service-top:74px]",
        top: "[--section-space-top:var(--section-spacing-client-service-top)]",
        bottom: "[--section-space-bottom:var(--section-spacing-client-service-top)]",
    },
    introHero: {
        value: "[--section-spacing-intro-hero:--spacing(16)] md:[--section-spacing-intro-hero:--spacing(30)]",
        top: "[--section-space-top:var(--section-spacing-intro-hero)]",
        bottom: "[--section-space-bottom:var(--section-spacing-intro-hero)]",
    },
} satisfies Record<
    SectionSpacingPreset,
    { value: string; top: string; bottom: string }
>;

const getSectionSpacingClasses = (
    defaults: SectionSpacingDefaults,
    spacing?: SectionSpacing,
): string => {
    const top =
        !spacing?.top || spacing.top === "auto" ? defaults.top : spacing.top;
    const bottom =
        !spacing?.bottom || spacing.bottom === "auto"
            ? defaults.bottom
            : spacing.bottom;
    return [
        spacingTokens[top].value,
        spacingTokens[bottom].value,
        spacingTokens[top].top,
        spacingTokens[bottom].bottom,
    ].join(" ");
};

type BlockSectionProps = ComponentPropsWithRef<"section"> &
    BlockPresentationOptions & {
        as?: "section" | "div";
        blockType: PageBlockType;
        spacing?: SectionSpacing;
    };

export const BlockSection = ({
    as = "section",
    blockType,
    className,
    spacing,
    theme,
    appearance,
    part,
    isPageIntro,
    ...props
}: BlockSectionProps) => {
    const presentation = getBlockPresentation(blockType, {
        theme,
        appearance,
        part,
        isPageIntro,
    });
    return createElement(as, {
        ...props,
        className: cn(
            presentation.backgroundClassName,
            getSectionSpacingClasses(presentation.spacing, spacing),
            "[--section-top-inset:0px] pt-[calc(var(--section-space-top)+var(--section-top-inset))] pb-(--section-space-bottom)",
            isPageIntro &&
                presentation.surface === "hero" &&
                "-mt-[calc(var(--site-header-height)+var(--page-top-spacing))] [--section-top-inset:calc(var(--site-header-height)+var(--page-top-spacing))]",
            className,
        ),
    });
};
