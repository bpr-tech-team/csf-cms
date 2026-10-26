import { hasBranchInfo } from "@/utilities/blockSpacing";
import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import type { BranchDetailsBlock as Props, Page } from "@/payload-types";
import { BranchOpeningHours } from "@/components/BranchOpeningHours";
import { Gallery } from "@/components/Gallery";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import {
    branchLabels,
    isGoogleMapsEmbedURL,
    phoneHref,
} from "@/utilities/branchData";
import { getGalleryImages } from "@/utilities/gallery";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

export const BranchDetailsBlock = ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    anchorId,
    contactHeading,
    hoursHeading,
    showControls,
    page,
    locale = defaultLocale,
}: Props & BlockSpacingProps & { page?: Page; locale?: AppLocale }) => {
    if (!hasBranchInfo(page)) return null;
    const info = page.branchInfo;
    const labels = branchLabels[locale];
    const billing = [
        info.companyName,
        info.companyId && `IČ: ${info.companyId}`,
        info.vatId && `DIČ: ${info.vatId}`,
    ]
        .filter(Boolean)
        .join(", ");
    const hours = info.openingHours ?? [];
    const hasHours = hours.length > 0;
    const images = info.images ?? [];
    const hasImages = getGalleryImages(images).length > 0;
    const mapUrl = info.mapEmbedUrl?.trim();
    const hasMap = Boolean(mapUrl && isGoogleMapsEmbedURL(mapUrl));
    const hasBoth = hasImages && hasMap;
    const linkClassName =
        "underline underline-offset-4 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

    return (
        <BlockSection
            blockType="branchDetails"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            className="scroll-mt-24 text-ink-950"
            id={anchorId || undefined}
        >
            <div className="container space-y-12 lg:space-y-16">
                <div
                    className={cn(
                        "grid items-start gap-10 lg:gap-20",
                        hasHours && "lg:grid-cols-2",
                    )}
                >
                    {hasHours && (
                        <div data-branch-hours>
                            <h2 className="mb-8 text-3xl font-bold md:text-heading-lg">
                                {applyTypography(hoursHeading || labels.hours, {
                                    locale,
                                })}
                            </h2>
                            <BranchOpeningHours hours={hours} locale={locale} />
                        </div>
                    )}
                    <div data-branch-contacts>
                        <h2 className="text-3xl font-bold md:text-heading-lg">
                            {applyTypography(
                                contactHeading || labels.contacts,
                                {
                                    locale,
                                },
                            )}
                        </h2>
                        <dl className="mt-8 space-y-2 text-body-md wrap-anywhere">
                            <div>
                                <dt className="inline font-medium">
                                    {labels.address}:{" "}
                                </dt>
                                <dd className="inline whitespace-pre-line">
                                    {applyTypography(info.address, { locale })}
                                </dd>
                            </div>
                            <div>
                                <dt className="inline font-medium">
                                    {labels.phone}:{" "}
                                </dt>
                                <dd className="inline">
                                    {info.phones?.map(
                                        ({ number, id }, index) => (
                                            <span key={id ?? index}>
                                                {index > 0 && ", "}
                                                <a
                                                    href={phoneHref(number)}
                                                    className={linkClassName}
                                                >
                                                    {number}
                                                </a>
                                            </span>
                                        ),
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="inline font-medium">
                                    {labels.email}:{" "}
                                </dt>
                                <dd className="inline">
                                    <a
                                        href={`mailto:${info.email}`}
                                        className={linkClassName}
                                    >
                                        {info.email}
                                    </a>
                                </dd>
                            </div>
                            {billing && (
                                <div>
                                    <dt className="inline font-medium">
                                        {labels.billing}:{" "}
                                    </dt>
                                    <dd className="inline">
                                        {applyTypography(billing, { locale })}
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
                {(hasImages || hasMap) && (
                    <div
                        className={cn(
                            "grid items-start gap-6",
                            hasBoth && "lg:grid-cols-2",
                        )}
                        data-branch-media
                    >
                        {hasImages && (
                            <div className="min-w-0" data-branch-gallery>
                                <Gallery
                                    images={images}
                                    aspectRatio={hasBoth ? "8/7" : "21/9"}
                                    autoplay={false}
                                    showControls={showControls}
                                    sizes={
                                        hasBoth
                                            ? "(min-width: 80rem) 37.25rem, (min-width: 64rem) 29.25rem, (min-width: 48rem) 44rem, (min-width: 40rem) 37.5rem, calc(100vw - 2.5rem)"
                                            : "(min-width: 80rem) 76rem, (min-width: 64rem) 60rem, (min-width: 48rem) 44rem, (min-width: 40rem) 37.5rem, calc(100vw - 2.5rem)"
                                    }
                                    locale={locale}
                                />
                            </div>
                        )}
                        {hasMap && (
                            <div
                                className={cn(
                                    "relative min-w-0 overflow-hidden rounded-[1.25rem] bg-paper-0",
                                    hasBoth
                                        ? "aspect-[8/7]"
                                        : "aspect-[21/9] min-h-[280px]",
                                )}
                                data-branch-map
                            >
                                <iframe
                                    src={mapUrl}
                                    title={`${labels.map} — ${page.title}`}
                                    className="absolute inset-0 size-full border-0"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </BlockSection>
    );
};
