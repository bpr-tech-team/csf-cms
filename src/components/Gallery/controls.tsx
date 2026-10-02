import { ChevronLeft, ChevronRight } from "lucide-react";

import type { AppLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import type { getGalleryImages } from "@/utilities/gallery";
import { cn } from "@/utilities/ui";

export const galleryFocusClasses =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500";

export const GalleryArrow = ({
    direction,
    label,
    className,
    onClick,
}: {
    direction: "left" | "right";
    label: string;
    className: string;
    onClick: () => void;
}) => (
    <button
        aria-label={label}
        className={cn(
            "absolute flex size-12 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-ink-950 shadow-[0_0.25rem_0.75rem_rgb(0_0_0/0.25)] transition-transform hover:scale-105",
            galleryFocusClasses,
            className,
        )}
        onClick={onClick}
        type="button"
    >
        {direction === "left" ? (
            <ChevronLeft aria-hidden className="pointer-events-none size-6" />
        ) : (
            <ChevronRight aria-hidden className="pointer-events-none size-6" />
        )}
    </button>
);

export const GalleryDots = ({
    slides,
    selectedIndex,
    onSelect,
    locale,
    theme,
}: {
    slides: ReturnType<typeof getGalleryImages>;
    selectedIndex: number;
    onSelect: (index: number) => void;
    locale: AppLocale;
    theme: "light" | "dark";
}) =>
    slides.map(({ id }, index) => (
        <button
            aria-current={index === selectedIndex ? "true" : undefined}
            aria-label={`${frontendMessages[locale].gallery.slide} ${index + 1}`}
            className={cn(
                "group relative flex h-4 w-2 items-center justify-center rounded-full",
                index === selectedIndex && "w-6",
                galleryFocusClasses,
            )}
            key={id}
            onClick={() => onSelect(index)}
            type="button"
        >
            <span
                aria-hidden
                className={cn(
                    "h-2 w-full rounded-full transition-colors group-hover:bg-brand-500",
                    index === selectedIndex
                        ? "bg-brand-500"
                        : theme === "dark"
                          ? "bg-paper-0/40"
                          : "bg-ink-950/25",
                )}
            />
        </button>
    ));
