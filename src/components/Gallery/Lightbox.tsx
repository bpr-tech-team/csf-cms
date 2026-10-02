"use client";

import useEmblaCarousel from "embla-carousel-react";
import { X } from "lucide-react";

import { MediaAsset } from "@/components/MediaAsset";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import type { AppLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import type { getGalleryImages } from "@/utilities/gallery";
import { cn } from "@/utilities/ui";

import { GalleryArrow, GalleryDots, galleryFocusClasses } from "./controls";
import { useSelectedSlide } from "./useSelectedSlide";

export const GalleryLightbox = ({
    slides,
    initialIndex,
    locale,
    onClose,
    onRestoreFocus,
}: {
    slides: ReturnType<typeof getGalleryImages>;
    initialIndex: number;
    locale: AppLocale;
    onClose: (index: number) => void;
    onRestoreFocus: () => void;
}) => {
    const messages = frontendMessages[locale].gallery;
    const [viewportRef, api] = useEmblaCarousel({
        loop: true,
        startIndex: initialIndex,
        breakpoints: {
            "(prefers-reduced-motion: reduce)": { duration: 0 },
        },
    });
    const selectedIndex = useSelectedSlide(api, initialIndex);
    const selectSlide = (index: number) => api?.scrollTo(index);

    return (
        <Dialog
            open
            onOpenChange={(value) => {
                if (!value) onClose(selectedIndex);
            }}
        >
            <DialogContent
                aria-describedby={undefined}
                className="z-70 flex h-dvh w-full max-w-none flex-col gap-3 overflow-hidden rounded-none border-0 bg-ink-950 p-0 shadow-none duration-0 sm:rounded-none md:h-[calc(100dvh-7.5rem)] md:w-[calc(100%-5rem)] md:max-w-6xl md:rounded-2xl"
                overlayClassName="z-70 bg-ink-950/92 duration-0"
                showCloseButton={false}
                onCloseAutoFocus={(event) => {
                    event.preventDefault();
                    onRestoreFocus();
                }}
                onKeyDown={(event) => {
                    const nextIndex = {
                        ArrowLeft:
                            (selectedIndex - 1 + slides.length) % slides.length,
                        ArrowRight: (selectedIndex + 1) % slides.length,
                        Home: 0,
                        End: slides.length - 1,
                    }[event.key];
                    if (nextIndex === undefined) return;
                    event.preventDefault();
                    event.stopPropagation();
                    selectSlide(nextIndex);
                }}
            >
                <DialogTitle className="sr-only">{messages.label}</DialogTitle>
                <div className="relative flex min-h-0 flex-1 flex-col">
                    <div
                        className="relative min-h-0 flex-1 overflow-hidden"
                        ref={viewportRef}
                    >
                        <div className="flex h-full touch-pan-y touch-pinch-zoom gap-5">
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
                                    <MediaAsset
                                        className="pointer-events-none size-full object-contain"
                                        fill
                                        resource={image}
                                        sizes="(min-width: 80rem) 72rem, 100vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogClose asChild>
                        <button
                            aria-label={messages.close}
                            className={cn(
                                "absolute top-3 right-3 flex size-12 cursor-pointer items-center justify-center rounded-full bg-paper-0/90 text-ink-950 transition-transform hover:scale-105 md:top-6 md:right-6",
                                galleryFocusClasses,
                            )}
                            type="button"
                        >
                            <X
                                aria-hidden
                                className="pointer-events-none size-6"
                            />
                        </button>
                    </DialogClose>
                    <div className="relative mt-3 h-12 shrink-0 md:absolute md:inset-0 md:mt-0 md:h-auto md:pointer-events-none">
                        <GalleryArrow
                            direction="left"
                            label={messages.previous}
                            className="right-1/2 mr-2 md:pointer-events-auto md:top-1/2 md:right-auto md:left-6 md:mr-0 md:size-14 md:-translate-y-1/2"
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
                            className="left-1/2 ml-2 md:pointer-events-auto md:top-1/2 md:right-6 md:left-auto md:ml-0 md:size-14 md:-translate-y-1/2"
                            onClick={() =>
                                selectSlide((selectedIndex + 1) % slides.length)
                            }
                        />
                    </div>
                </div>
                <div
                    aria-label={frontendMessages[locale].selectSlide}
                    className="flex max-h-16 shrink-0 flex-wrap items-center justify-center gap-2 overflow-y-auto px-4 pb-4 md:pb-6"
                    role="group"
                >
                    <GalleryDots
                        slides={slides}
                        selectedIndex={selectedIndex}
                        onSelect={selectSlide}
                        locale={locale}
                        theme="dark"
                    />
                </div>
                <p aria-live="polite" aria-atomic="true" className="sr-only">
                    {messages.slide} {selectedIndex + 1} / {slides.length}
                </p>
            </DialogContent>
        </Dialog>
    );
};
