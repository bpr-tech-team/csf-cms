import { BlockSection } from "@/components/BlockSection";
import { Gallery } from "@/components/Gallery";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { GalleryBlock as GalleryProps } from "@/payload-types";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { getGalleryImages } from "@/utilities/gallery";

export const GalleryBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    locale = defaultLocale,
    ...props
}: GalleryProps & BlockSpacingProps & { locale?: AppLocale }) => {
    if (!getGalleryImages(props.images).length) return null;

    return (
        <BlockSection
            blockType="gallery"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
        >
            <div className="container">
                <Gallery {...props} locale={locale} />
            </div>
        </BlockSection>
    );
};
