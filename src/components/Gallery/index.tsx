import type { GalleryBlock } from "@/payload-types";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { getGalleryImages } from "@/utilities/gallery";

import { GalleryCarousel } from "./Carousel";

export const Gallery = ({
    images,
    autoplay,
    autoplayInterval,
    compact = false,
    theme = "light",
    sizes = "100vw",
    locale = defaultLocale,
}: Pick<GalleryBlock, "images" | "autoplay" | "autoplayInterval"> & {
    compact?: boolean;
    theme?: "light" | "dark";
    sizes?: string;
    locale?: AppLocale;
}) => {
    const slides = getGalleryImages(images);
    if (!slides.length) return null;

    return (
        <GalleryCarousel
            slides={slides}
            autoplay={autoplay ?? true}
            autoplayInterval={autoplayInterval ?? 3}
            compact={compact}
            theme={theme}
            sizes={sizes}
            locale={locale}
        />
    );
};
