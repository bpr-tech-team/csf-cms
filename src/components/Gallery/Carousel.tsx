"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";

import { MediaAsset } from "@/components/MediaAsset";
import type { AppLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import type { getGalleryImages } from "@/utilities/gallery";
import { cn } from "@/utilities/ui";

import { GalleryLightbox } from "./Lightbox";
import {
    GalleryArrow,
    GalleryDots,
    galleryFocusClasses as focusClasses,
} from "./controls";
import { useSelectedSlide } from "./useSelectedSlide";

type GalleryCarouselProps = {
    slides: ReturnType<typeof getGalleryImages>;
    autoplay: boolean;
    autoplayInterval: number;
    compact: boolean;
    theme: "light" | "dark";
    sizes: string;
    locale: AppLocale;
};

export const GalleryCarousel = ({
    slides,
    autoplay,
    autoplayInterval,
    compact,
    theme,
    sizes,
    locale,
}: GalleryCarouselProps) => {
    const messages = frontendMessages[locale].gallery;
    const [paused, setPaused] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const zoomRef = useRef<HTMLButtonElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const openedFromPhoto = useRef(false);
    const delay = Math.max(1, autoplayInterval) * 1000;
    const plugins = useMemo(
        () => [
            Autoplay({
                delay,
                active: autoplay && !paused,
                playOnInit: false,
                stopOnInteraction: true,
                stopOnFocusIn: false,
                breakpoints: {
                    "(prefers-reduced-motion: reduce)": { active: false },
                },
            }),
        ],
        [delay, autoplay, paused],
    );
    const [viewportRef, api] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            breakpoints: {
                "(prefers-reduced-motion: reduce)": { duration: 0 },
            },
        },
        plugins,
    );
    const selectedIndex = useSelectedSlide(api);

    useEffect(() => {
        if (!api || !autoplay || paused || lightboxOpen) return;
        const root = api.rootNode().closest<HTMLElement>("[data-gallery]");
        if (!root) return;
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const hover = window.matchMedia("(hover: hover)");
        const player = api.plugins().autoplay;
        let inView = false;
        let disposed = false;
        // Keep every resume path subject to the same interaction/preferences checks.
        const syncPlayback = () => {
            if (disposed) return;
            const canPlay =
                inView &&
                !document.hidden &&
                !reducedMotion.matches &&
                !(hover.matches && root.matches(":hover")) &&
                !root.contains(document.activeElement);
            if (canPlay) {
                if (!player.isPlaying()) player.play();
            } else player.stop();
        };
        const afterFocus = () => queueMicrotask(syncPlayback);
        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            syncPlayback();
        });
        observer.observe(root);
        root.addEventListener("mouseenter", syncPlayback);
        root.addEventListener("mouseleave", syncPlayback);
        root.addEventListener("focusin", syncPlayback);
        root.addEventListener("focusout", afterFocus);
        document.addEventListener("visibilitychange", syncPlayback);
        reducedMotion.addEventListener("change", syncPlayback);
        api.on("pointerUp", syncPlayback).on("reInit", syncPlayback);
        return () => {
            disposed = true;
            player.stop();
            observer.disconnect();
            root.removeEventListener("mouseenter", syncPlayback);
            root.removeEventListener("mouseleave", syncPlayback);
            root.removeEventListener("focusin", syncPlayback);
            root.removeEventListener("focusout", afterFocus);
            document.removeEventListener("visibilitychange", syncPlayback);
            reducedMotion.removeEventListener("change", syncPlayback);
            api.off("pointerUp", syncPlayback).off("reInit", syncPlayback);
        };
    }, [api, autoplay, paused, plugins, lightboxOpen]);

    const selectSlide = (index: number) => {
        api?.scrollTo(index);
        api?.plugins().autoplay.reset();
    };
    const openLightbox = (fromPhoto: boolean) => {
        api?.plugins().autoplay.stop();
        openedFromPhoto.current = fromPhoto;
        setLightboxOpen(true);
    };
    const closeLightbox = (index: number) => {
        api?.scrollTo(index, true);
        setLightboxOpen(false);
    };
    const restoreFocus = () => {
        const target = openedFromPhoto.current
            ? galleryRef.current?.querySelector<HTMLButtonElement>(
                  `[data-gallery-image="${api?.selectedScrollSnap() ?? 0}"]`,
              )
            : zoomRef.current;
        target?.focus({ preventScroll: true });
    };

    return (
        <>
            <div
                aria-label={messages.label}
                aria-roledescription={messages.carousel}
                className="w-full min-w-0"
                data-gallery
                ref={galleryRef}
                role="region"
                onKeyDown={(event) => {
                    if (lightboxOpen) return;
                    const nextIndex = {
                        ArrowLeft:
                            (selectedIndex - 1 + slides.length) % slides.length,
                        ArrowRight: (selectedIndex + 1) % slides.length,
                        Home: 0,
                        End: slides.length - 1,
                    }[event.key];
                    if (nextIndex === undefined) return;
                    event.preventDefault();
                    selectSlide(nextIndex);
                }}
            >
                <div className="relative">
                    <div
                        className={cn(
                            "aspect-[15/11] overflow-hidden rounded-[1.25rem] bg-ink-950",
                            !compact && "md:aspect-[1377/500]",
                        )}
                        ref={viewportRef}
                    >
                        <div
                            aria-live={!autoplay || paused ? "polite" : "off"}
                            className="flex h-full touch-pan-y touch-pinch-zoom gap-5"
                        >
                            {slides.map(({ id, image }, index) => (
                                <div
                                    aria-hidden={index !== selectedIndex}
                                    aria-label={`${index + 1} / ${slides.length}`}
                                    aria-roledescription={messages.slide}
                                    className="relative h-full min-w-0 shrink-0 basis-full"
                                    inert={index !== selectedIndex}
                                    key={id}
                                    role="group"
                                >
                                    <button
                                        aria-label={`${messages.openImage}: ${image.alt || `${messages.slide} ${index + 1}`}`}
                                        className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-500"
                                        data-gallery-image={index}
                                        onClick={() => openLightbox(true)}
                                        type="button"
                                    >
                                        <MediaAsset
                                            className="pointer-events-none size-full object-cover"
                                            fill
                                            resource={image}
                                            sizes={sizes}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        aria-label={messages.openImage}
                        className={cn(
                            "absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-paper-0/90 text-ink-950 transition-transform hover:scale-105 xl:size-10",
                            focusClasses,
                        )}
                        onClick={() => openLightbox(false)}
                        ref={zoomRef}
                        type="button"
                    >
                        <Search
                            aria-hidden
                            className="pointer-events-none size-4 xl:size-5"
                        />
                    </button>
                    <GalleryArrow
                        direction="left"
                        label={messages.previous}
                        className={cn(
                            "right-14 bottom-4 size-8 xl:right-16 xl:size-10 [&_svg]:size-4 xl:[&_svg]:size-5",
                            !compact &&
                                "md:top-1/2 md:right-auto md:bottom-auto md:left-4 md:-translate-y-1/2 xl:right-auto",
                        )}
                        onClick={() =>
                            selectSlide(
                                (selectedIndex - 1 + slides.length) %
                                    slides.length,
                            )
                        }
                    />
                    <GalleryArrow
                        direction="right"
                        label={messages.next}
                        className={cn(
                            "right-4 bottom-4 size-8 xl:size-10 [&_svg]:size-4 xl:[&_svg]:size-5",
                            !compact &&
                                "md:top-1/2 md:bottom-auto md:-translate-y-1/2",
                        )}
                        onClick={() =>
                            selectSlide((selectedIndex + 1) % slides.length)
                        }
                    />
                </div>
                <div
                    aria-label={frontendMessages[locale].selectSlide}
                    className={cn(
                        "mt-5 flex flex-wrap items-center justify-center gap-2",
                        !compact && "md:mt-6",
                    )}
                    role="group"
                >
                    <GalleryDots
                        slides={slides}
                        selectedIndex={selectedIndex}
                        onSelect={selectSlide}
                        locale={locale}
                        theme={theme}
                    />
                    {autoplay ? (
                        <button
                            className={cn(
                                "sr-only rounded-full px-4 py-2 focus:not-sr-only",
                                theme === "dark"
                                    ? "text-paper-0"
                                    : "text-ink-950",
                                focusClasses,
                            )}
                            onClick={() => setPaused((value) => !value)}
                            type="button"
                        >
                            {paused ? messages.play : messages.pause}
                        </button>
                    ) : null}
                </div>
            </div>
            {lightboxOpen ? (
                <GalleryLightbox
                    slides={slides}
                    initialIndex={selectedIndex}
                    locale={locale}
                    onClose={closeLightbox}
                    onRestoreFocus={restoreFocus}
                />
            ) : null}
        </>
    );
};
