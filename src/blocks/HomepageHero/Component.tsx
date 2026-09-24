"use client";
import { applyTypography } from "@/utilities/typography";

import type { CSSProperties } from "react";

import { ContentIcon } from "@/components/ContentIcon";
import { MediaAsset } from "@/components/MediaAsset";
import { HeroContent } from "@/components/HeroContent";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import type { HomepageHeroBlock } from "@/payload-types";
import { cn } from "@/utilities/ui";
import React, { useMemo, useState } from "react";

import styles from "./styles.module.css";

type HomepageHeroProps = HomepageHeroBlock & {
    isPageIntro?: boolean;
    locale?: AppLocale;
};

type QuickLink = NonNullable<HomepageHeroBlock["quickLinks"]>[number];

export const HomepageHero: React.FC<HomepageHeroProps> = ({
    autoplay = true,
    autoplayInterval = 7000,
    backgroundMedia,
    intro,
    isPageIntro = false,
    locale = defaultLocale,
    quickLinks,
    slides,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoplayRunning, setIsAutoplayRunning] = useState(false);
    const availableSlides = useMemo(() => slides ?? [], [slides]);
    const slideCount = availableSlides.length;
    const activeSlide = slideCount
        ? availableSlides[activeIndex % slideCount]
        : null;
    const interval = Math.min(Math.max(autoplayInterval ?? 7000, 3000), 20000);
    const messages = frontendMessages[locale];

    if (!activeSlide) return null;

    const progressStyle = {
        "--homepage-hero-progress-duration": `${interval}ms`,
        // Inline state takes precedence over the CSS module's animation shorthand.
        animationPlayState:
            autoplay && isAutoplayRunning ? "running" : "paused",
    } as CSSProperties;

    return (
        <HeroSection
            backgroundMedia={backgroundMedia}
            isPageIntro={isPageIntro}
            label={messages.heroPresentation}
            onAutoplayChange={setIsAutoplayRunning}
        >
            <div aria-live="polite">
                <div
                    className={styles.slide}
                    key={activeSlide.id ?? activeIndex}
                >
                    <HeroContent
                        {...activeSlide}
                        isPageIntro={isPageIntro}
                        locale={locale}
                    />
                </div>
            </div>

            {slideCount > 1 && (
                <div
                    aria-label={messages.selectSlide}
                    className="mt-14 flex items-center gap-3"
                    role="group"
                >
                    <div className="relative h-1 flex-1 overflow-hidden bg-[#282828]">
                        <span
                            className={cn(
                                styles.progress,
                                "absolute inset-y-0 left-0 w-full origin-left bg-brand-500",
                            )}
                            key={`progress-${activeIndex}-${interval}`}
                            onAnimationEnd={() =>
                                setActiveIndex(
                                    (current) => (current + 1) % slideCount,
                                )
                            }
                            style={progressStyle}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        {availableSlides.map((slide, index) => (
                            <button
                                aria-current={
                                    index === activeIndex ? "true" : undefined
                                }
                                aria-label={`${messages.slide} ${index + 1}`}
                                className={cn(
                                    "size-3.5 rounded-full border border-paper-0/70 transition-colors duration-fast",
                                    index === activeIndex &&
                                        "border-brand-500 bg-brand-500",
                                )}
                                key={slide.id ?? index}
                                onClick={() => setActiveIndex(index)}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
            )}

            {intro && (
                <div className="mx-auto mt-14 max-w-[62rem] text-center">
                    <SectionHeading
                        locale={locale}
                        align="center"
                        eyebrow={intro.eyebrow}
                        heading={intro.heading}
                        highlightedTexts={intro.highlightedTexts}
                        showRule={false}
                        size="compact"
                        tone="inverse"
                    />
                    <p className="mx-auto mt-5 max-w-[59rem] text-body-md font-normal text-paper-0/80 md:text-body-lg md:leading-8">
                        {applyTypography(intro.description, { locale })}
                    </p>
                </div>
            )}

            {Array.isArray(quickLinks) && quickLinks.length > 0 && (
                <div className="mt-12 grid gap-4 lg:mt-15 lg:grid-cols-3">
                    {quickLinks.map((item, index) => (
                        <QuickLinkCard
                            item={item}
                            key={item.id ?? index}
                            locale={locale}
                        />
                    ))}
                </div>
            )}
        </HeroSection>
    );
};

const QuickLinkCard = ({
    item,
    locale,
}: {
    item: QuickLink;
    locale: AppLocale;
}) => {
    const link = item.links?.[0]?.link;
    const content = (
        <>
            <MediaAsset
                className="absolute inset-0 size-full object-cover grayscale"
                fill
                resource={item.image}
                sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgb(0_0_0/0.54),rgb(0_0_0/0.72)),radial-gradient(circle_at_70%_20%,rgb(175_203_8/0.22),transparent_58%)] transition-colors duration-base group-hover:bg-[linear-gradient(rgb(0_0_0/0.42),rgb(0_0_0/0.64)),radial-gradient(circle_at_70%_20%,rgb(175_203_8/0.3),transparent_58%)]"
            />
            <span className="relative z-10 flex flex-col items-center gap-5">
                <ContentIcon
                    icon={item.icon}
                    className="size-11 text-brand-600"
                />
                <span className="text-heading-md font-medium text-paper-0">
                    {applyTypography(item.title, { locale })}
                </span>
            </span>
        </>
    );

    const className =
        "group relative flex min-h-56 items-center justify-center overflow-hidden rounded-lg border border-brand-500/30 bg-olive-900 p-8 text-center transition-[border-color,transform] duration-base hover:-translate-y-0.5 hover:border-brand-500/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 lg:min-h-64";

    if (!link) {
        return <div className={className}>{content}</div>;
    }

    return (
        <CMSLink
            {...link}
            appearance="inline"
            className={className}
            label={null}
            locale={locale}
        >
            {content}
        </CMSLink>
    );
};
