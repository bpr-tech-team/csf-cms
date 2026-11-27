import { Navigation } from "lucide-react";
import Image from "next/image";

import { BlockSection } from "@/components/BlockSection";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import type { BranchesGridBlock as Props } from "@/payload-types";
import { CardIcon } from "@/components/CardIcon";
import { CMSLink } from "@/components/Link";
import { MediaAsset } from "@/components/MediaAsset";
import { SectionHeading } from "@/components/SectionHeading";
import { BranchOpeningHours } from "@/components/BranchOpeningHours";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import {
    getBranches,
    type BranchDirectoryEntry,
} from "@/utilities/getBranches";
import { getPagePath } from "@/utilities/getPagePath";
import {
    branchLabels,
    isGoogleMapsEmbedURL,
    phoneHref,
} from "@/utilities/branchData";
import { getGalleryImages } from "@/utilities/gallery";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

import { BranchCardMedia } from "./BranchCardMedia";

const linkClassName =
    "hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export const BranchesGridBlock = async ({
    sectionSpacing,
    spacingTop,
    spacingBottom,
    anchorId,
    heading,
    highlightedTexts,
    items,
    locale = defaultLocale,
    draft = false,
}: Props & BlockSpacingProps & { locale?: AppLocale; draft?: boolean }) => {
    const ids = Array.from(
        new Set(
            items
                .map(({ branch }) =>
                    typeof branch === "object" ? branch?.id : branch,
                )
                .filter((id): id is number => typeof id === "number"),
        ),
    );
    const branches = await getBranches(ids, locale, draft);
    const byId = new Map(branches.map((branch) => [branch.id, branch]));

    return (
        <BlockSection
            blockType="branchesGrid"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            className="scroll-mt-24 text-ink-950"
            id={anchorId || undefined}
        >
            <div className="container">
                <SectionHeading
                    heading={heading}
                    highlightedTexts={highlightedTexts}
                    locale={locale}
                    showRule={false}
                />
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-6 xl:gap-8">
                    {items.map((item, index) => {
                        const branch = byId.get(
                            (typeof item.branch === "object"
                                ? item.branch?.id
                                : item.branch) ?? -1,
                        );
                        return branch ? (
                            <BranchCard
                                branch={branch}
                                key={item.id ?? index}
                                locale={locale}
                                showOpeningHours={item.showOpeningHours}
                                width={item.width}
                            />
                        ) : null;
                    })}
                </div>
            </div>
        </BlockSection>
    );
};

const BranchCard = ({
    branch,
    locale,
    showOpeningHours,
    width,
}: {
    branch: BranchDirectoryEntry;
    locale: AppLocale;
    showOpeningHours: Props["items"][number]["showOpeningHours"];
    width: Props["items"][number]["width"];
}) => {
    const labels = branchLabels[locale];
    if (!branch.branchInfo) return null;
    const info = branch.branchInfo;
    const href = getPagePath(branch, locale);
    const isWide = width === "wide";
    const [photo] = getGalleryImages(info.images);
    const embedUrl = info.mapEmbedUrl?.trim();
    const mapUrl =
        embedUrl && isGoogleMapsEmbedURL(embedUrl) ? embedUrl : undefined;
    const hours = info.openingHours ?? [];
    const showHours = showOpeningHours !== false && hours.length > 0;
    const address = info.address?.trim();

    return (
        <article
            className={cn(
                "group/branch flex min-w-0 flex-col overflow-hidden rounded-xl border border-border-light bg-white transition-[border-color,box-shadow] hover:border-brand-500/35 hover:shadow-lg",
                isWide ? "xl:col-span-3" : "xl:col-span-2",
            )}
        >
            {(photo || mapUrl) && (
                <BranchCardMedia
                    branchName={branch.title}
                    locale={locale}
                    mapUrl={mapUrl}
                    photo={
                        photo && (
                            <MediaAsset
                                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/branch:scale-[1.04]"
                                fill
                                resource={photo.image}
                                sizes={
                                    isWide
                                        ? "(min-width: 768px) 50vw, 100vw"
                                        : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                }
                            />
                        )
                    }
                    fallback={
                        photo ? undefined : (
                            <div className="grid h-full place-items-center">
                                <CardIcon icon={info.icon} />
                            </div>
                        )
                    }
                />
            )}
            <div className="flex flex-1 flex-col p-6 xl:px-10 xl:pt-8 xl:pb-9">
                <div
                    className={cn(
                        "grid gap-5",
                        isWide && showHours && "xl:grid-cols-2 xl:gap-8",
                    )}
                >
                    <div>
                        {!photo && !mapUrl && (
                            <div className="mb-5">
                                <CardIcon icon={info.icon} />
                            </div>
                        )}
                        <h3 className="text-xl leading-snug font-bold uppercase">
                            <CMSLink
                                type="custom"
                                url={href}
                                label={branch.title}
                                locale={locale}
                                className={linkClassName}
                            />
                        </h3>
                        <address className="mt-3 text-sm leading-relaxed text-neutral-secondary not-italic wrap-anywhere">
                            <p className="whitespace-pre-line">
                                {applyTypography(address, {
                                    locale,
                                })}
                            </p>
                            <p>
                                {labels.phone}:{" "}
                                {info.phones?.map(({ number, id }, i) => (
                                    <span key={id ?? i}>
                                        {i > 0 && ", "}
                                        <a
                                            className={cn(
                                                linkClassName,
                                                "whitespace-nowrap underline underline-offset-2",
                                            )}
                                            href={phoneHref(number)}
                                        >
                                            {number}
                                        </a>
                                    </span>
                                ))}
                            </p>
                            <p>
                                {labels.email}:{" "}
                                <a
                                    className={cn(
                                        linkClassName,
                                        "underline underline-offset-2",
                                    )}
                                    href={`mailto:${info.email}`}
                                >
                                    {info.email}
                                </a>
                            </p>
                        </address>
                    </div>
                    {showHours && (
                        <div className="text-neutral-secondary">
                            <h4 className="mb-2 text-sm font-semibold">
                                {labels.hours}
                            </h4>
                            <BranchOpeningHours hours={hours} locale={locale} />
                        </div>
                    )}
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm font-medium">
                    <CMSLink
                        type="custom"
                        url={href}
                        label={labels.details}
                        locale={locale}
                        className={cn(
                            linkClassName,
                            "inline-flex min-h-8 items-center gap-1.5",
                        )}
                    >
                        <Image
                            alt=""
                            className="shrink-0"
                            height={16}
                            src="/icons/branches/detail-arrow.svg"
                            unoptimized
                            width={16}
                        />
                    </CMSLink>
                    {address && (
                        <a
                            className={cn(
                                linkClassName,
                                "inline-flex min-h-8 items-center gap-1.5",
                            )}
                            href={`https://www.google.com/maps/dir/?${new URLSearchParams(
                                {
                                    api: "1",
                                    destination: address.replace(
                                        /\s*\n\s*/g,
                                        ", ",
                                    ),
                                    dir_action: "navigate",
                                },
                            )}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {labels.directions}
                            <Navigation
                                aria-hidden="true"
                                className="size-4 text-brand-600"
                            />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};
