"use client";

import type { CSSProperties } from "react";

import { MediaAsset } from "@/components/Homepage/MediaAsset";
import { SectionHeading } from "@/components/Homepage/SectionHeading";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import type { Page } from "@/payload-types";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { cn } from "@/utilities/ui";
import NextImage from "next/image";
import React, { useEffect, useMemo, useState } from "react";

import styles from "./styles.module.css";

type HomepageHeroProps = Page["hero"] & {
    locale?: AppLocale;
};

type QuickLink = NonNullable<Page["hero"]["quickLinks"]>[number];

const quickLinkFallbacks = [
    {
        icon: "/media/homepage/hero/vector-04.svg",
        image: "/media/homepage/hero/image-02.png",
    },
    {
        icon: "/media/homepage/hero/vector-05.svg",
        image: "/media/homepage/hero/image-01.jpg",
    },
    {
        icon: "/media/homepage/hero/vector-06.svg",
        image: "/media/homepage/hero/image-03.png",
    },
] as const;

export const HomepageHero: React.FC<HomepageHeroProps> = ({
    autoplay = true,
    autoplayInterval = 7000,
    intro,
    locale = defaultLocale,
    quickLinks,
    slides,
}) => {
    const { setHeaderTheme } = useHeaderTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const availableSlides = useMemo(() => slides ?? [], [slides]);
    const slideCount = availableSlides.length;
    const activeSlide = slideCount
        ? availableSlides[activeIndex % slideCount]
        : null;
    const interval = Math.min(Math.max(autoplayInterval ?? 7000, 3000), 20000);

    useEffect(() => {
        setHeaderTheme("dark");
    }, [setHeaderTheme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const updatePreference = () =>
            setPrefersReducedMotion(mediaQuery.matches);

        updatePreference();
        mediaQuery.addEventListener("change", updatePreference);

        return () => mediaQuery.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
        if (!autoplay || isPaused || prefersReducedMotion || slideCount < 2) {
            return;
        }

        const timer = window.setTimeout(() => {
            setActiveIndex((current) => (current + 1) % slideCount);
        }, interval);

        return () => window.clearTimeout(timer);
    }, [
        activeIndex,
        autoplay,
        interval,
        isPaused,
        prefersReducedMotion,
        slideCount,
    ]);

    if (!activeSlide) return null;

    const progressStyle = {
        "--homepage-hero-progress-duration": `${interval}ms`,
    } as CSSProperties;

    return (
        <section
            aria-label={locale === "cs" ? "Úvodní prezentace" : "Introduction"}
            className="relative -mt-42 overflow-hidden bg-ink-900 pt-58 pb-20 text-paper-0 md:pb-24 xl:pb-21"
            data-theme="dark"
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsPaused(false);
                }
            }}
            onFocusCapture={() => setIsPaused(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <NextImage
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full object-cover object-center"
                fill
                priority
                sizes="100vw"
                src="/media/homepage/hero/vector-02.svg"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_44%_at_71%_28%,rgb(175_203_8/0.18),transparent_72%)]"
            />

            <div className="container relative z-10">
                <div aria-live="polite" className="max-w-[68rem]">
                    <div
                        className={styles.slide}
                        key={activeSlide.id ?? activeIndex}
                    >
                        <h1 className="max-w-[62rem] text-5xl leading-[1.08] font-bold tracking-[-0.035em] text-balance sm:text-6xl md:text-7xl xl:text-display-xl">
                            {activeSlide.heading}
                        </h1>
                        <p className="mt-7 max-w-3xl text-body-md leading-8 font-normal text-paper-0/90 md:mt-9 md:text-body-lg">
                            {activeSlide.description}
                        </p>

                        {Array.isArray(activeSlide.links) &&
                            activeSlide.links.length > 0 && (
                                <ul className="mt-8 flex flex-wrap gap-3 md:mt-10">
                                    {activeSlide.links.map(
                                        ({ id, link }, index) => (
                                            <li key={id ?? index}>
                                                <CMSLink
                                                    {...link}
                                                    appearance={
                                                        link.appearance ??
                                                        "default"
                                                    }
                                                    className={cn(
                                                        "h-13 px-7",
                                                        link.appearance ===
                                                            "outline" &&
                                                            "border-brand-500/50 text-paper-0 hover:border-brand-500 hover:bg-brand-100 hover:text-paper-0",
                                                    )}
                                                    locale={locale}
                                                    size="lg"
                                                />
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                    </div>
                </div>

                {slideCount > 1 && (
                    <div
                        aria-label={
                            locale === "cs" ? "Přepnout snímek" : "Select slide"
                        }
                        className="mt-14 flex items-center gap-3"
                        role="group"
                    >
                        <div className="relative h-1 flex-1 overflow-hidden bg-[#282828]">
                            <span
                                className={cn(
                                    styles.progress,
                                    "absolute inset-y-0 left-0 w-full origin-left bg-brand-500",
                                    (!autoplay ||
                                        isPaused ||
                                        prefersReducedMotion) &&
                                        "[animation-play-state:paused]",
                                )}
                                key={`progress-${activeIndex}`}
                                style={progressStyle}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            {availableSlides.map((slide, index) => (
                                <button
                                    aria-current={
                                        index === activeIndex
                                            ? "true"
                                            : undefined
                                    }
                                    aria-label={`${locale === "cs" ? "Snímek" : "Slide"} ${index + 1}`}
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
                            align="center"
                            eyebrow={intro.eyebrow}
                            heading={intro.heading}
                            highlightedText={intro.highlightedText}
                            showRule={false}
                            size="compact"
                            tone="inverse"
                        />
                        <p className="mx-auto mt-5 max-w-[59rem] text-body-md font-normal text-paper-0/80 md:text-body-lg md:leading-8">
                            {intro.description}
                        </p>
                    </div>
                )}

                {Array.isArray(quickLinks) && quickLinks.length > 0 && (
                    <div className="mt-12 grid gap-4 lg:mt-15 lg:grid-cols-3">
                        {quickLinks.map((item, index) => (
                            <QuickLinkCard
                                fallback={
                                    quickLinkFallbacks[
                                        index % quickLinkFallbacks.length
                                    ]
                                }
                                item={item}
                                key={item.id ?? index}
                                locale={locale}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const QuickLinkCard = ({
    fallback,
    item,
    locale,
}: {
    fallback: (typeof quickLinkFallbacks)[number];
    item: QuickLink;
    locale: AppLocale;
}) => {
    const link = item.links?.[0]?.link;
    const content = (
        <>
            <MediaAsset
                className="absolute inset-0 size-full object-cover grayscale"
                fallback={fallback.image}
                fill
                resource={item.image}
                sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgb(0_0_0/0.54),rgb(0_0_0/0.72)),radial-gradient(circle_at_70%_20%,rgb(175_203_8/0.22),transparent_58%)] transition-colors duration-base group-hover:bg-[linear-gradient(rgb(0_0_0/0.42),rgb(0_0_0/0.64)),radial-gradient(circle_at_70%_20%,rgb(175_203_8/0.3),transparent_58%)]"
            />
            <span className="relative z-10 flex flex-col items-center gap-5">
                <span className="relative block size-11">
                    <MediaAsset
                        className="size-full object-contain"
                        fallback={fallback.icon}
                        resource={item.icon}
                    />
                </span>
                <span className="text-heading-md font-medium text-paper-0">
                    {item.title}
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
