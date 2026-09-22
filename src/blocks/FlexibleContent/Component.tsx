import type {
    FlexibleContentBlock as FlexibleContentProps,
    FlexibleMediaElement,
} from "@/payload-types";
import { CMSLink } from "@/components/Link";
import { MediaAsset } from "@/components/MediaAsset";
import RichText from "@/components/RichText";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

import { sanitizeFlexibleHTML } from "./sanitizeHTML";

const horizontalClasses = {
    left: "items-start text-left [&_iframe]:ml-0 [&_iframe]:mr-auto",
    center: "items-center text-center [&_iframe]:mx-auto",
    right: "items-end text-right [&_iframe]:ml-auto [&_iframe]:mr-0",
};
const desktopHorizontalClasses = {
    left: "lg:items-start lg:text-left lg:[&_iframe]:ml-0 lg:[&_iframe]:mr-auto",
    center: "lg:items-center lg:text-center lg:[&_iframe]:mx-auto",
    right: "lg:items-end lg:text-right lg:[&_iframe]:ml-auto lg:[&_iframe]:mr-0",
};
const verticalClasses = {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end",
};
const aspectClasses = {
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    wide: "aspect-video",
};
const positionClasses = {
    topLeft: "object-top-left",
    top: "object-top",
    topRight: "object-top-right",
    left: "object-left",
    center: "object-center",
    right: "object-right",
    bottomLeft: "object-bottom-left",
    bottom: "object-bottom",
    bottomRight: "object-bottom-right",
};
const richTextClasses =
    "w-full max-w-none text-body-md leading-7 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0";

const FlexibleMedia = ({
    media,
    aspectRatio = "original",
    fit = "cover",
    position = "center",
    sizes,
}: FlexibleMediaElement & { sizes: string }) => {
    if (!media || typeof media !== "object") return null;

    const cropped = aspectRatio && aspectRatio !== "original";
    const className = cn(
        cropped ? "absolute inset-0 size-full" : "block h-auto w-full",
        fit === "contain" ? "object-contain" : "object-cover",
        positionClasses[position || "center"],
    );

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-lg",
                cropped && aspectClasses[aspectRatio],
            )}
        >
            {media.mimeType?.startsWith("video/") ? (
                <video
                    aria-label={media.alt || undefined}
                    className={className}
                    controls
                    playsInline
                    preload="metadata"
                >
                    <source
                        src={getMediaUrl(media.url, media.updatedAt)}
                        type={media.mimeType}
                    />
                </video>
            ) : (
                <MediaAsset
                    className={className}
                    fill={Boolean(cropped)}
                    resource={media}
                    sizes={sizes}
                />
            )}
        </div>
    );
};

export const FlexibleContentBlock = ({
    anchorId,
    heading,
    intro,
    columns = [],
    mobileColumnOrder,
    theme = "light",
    locale = defaultLocale,
}: FlexibleContentProps & { locale?: AppLocale }) => {
    const twoColumns = columns.length === 2;
    const isDark = theme === "dark";
    const themedRichTextClasses = cn(
        richTextClasses,
        isDark
            ? "text-neutral-inverse-muted [&_a]:text-paper-0"
            : "text-neutral-secondary [&_a]:text-ink-950",
    );

    return (
        <section
            className={cn(
                "scroll-mt-24 py-20 md:py-24 xl:py-28",
                isDark ? "bg-ink-950 text-paper-0" : "bg-paper-0 text-ink-950",
            )}
            data-theme={isDark ? "dark" : "light"}
            id={anchorId || undefined}
        >
            <div className="container">
                {heading ? (
                    <h2 className="text-4xl leading-tight font-bold tracking-normal whitespace-pre-line md:text-heading-xl">
                        {applyTypography(heading, { locale })}
                    </h2>
                ) : null}
                {intro ? (
                    <RichText
                        className={cn(themedRichTextClasses, heading && "mt-6")}
                        data={intro}
                        enableGutter={false}
                        locale={locale}
                    />
                ) : null}
                <div
                    className={cn(
                        "grid grid-cols-1 items-stretch gap-10 lg:gap-16",
                        twoColumns && "lg:grid-cols-2",
                        (heading || intro) && "mt-12 md:mt-16",
                    )}
                >
                    {columns.map((column, columnIndex) => (
                        <div
                            className={cn(
                                "flex min-w-0 flex-col gap-6 break-words",
                                horizontalClasses[
                                    column.mobileHorizontalAlign &&
                                    column.mobileHorizontalAlign !== "inherit"
                                        ? column.mobileHorizontalAlign
                                        : column.horizontalAlign || "left"
                                ],
                                desktopHorizontalClasses[
                                    column.horizontalAlign || "left"
                                ],
                                verticalClasses[column.verticalAlign || "top"],
                                twoColumns &&
                                    mobileColumnOrder === "reverse" &&
                                    (columnIndex === 0
                                        ? "order-2 lg:order-1"
                                        : "order-1 lg:order-2"),
                            )}
                            key={column.id ?? columnIndex}
                        >
                            {(column.elements || []).map((element, index) => {
                                const key = element.id ?? index;
                                switch (element.blockType) {
                                    case "flexHeading":
                                        return (
                                            <h3
                                                key={key}
                                                className="w-full text-heading-md leading-tight font-bold whitespace-pre-line"
                                            >
                                                {applyTypography(
                                                    element.heading,
                                                    { locale },
                                                )}
                                            </h3>
                                        );
                                    case "flexText":
                                        return (
                                            <RichText
                                                key={key}
                                                className={
                                                    themedRichTextClasses
                                                }
                                                data={element.richText}
                                                enableGutter={false}
                                                locale={locale}
                                            />
                                        );
                                    case "flexButton":
                                        return (
                                            <CMSLink
                                                key={key}
                                                {...element.link}
                                                appearance={
                                                    element.link.appearance ||
                                                    "default"
                                                }
                                                className={cn(
                                                    "max-w-full whitespace-normal text-center",
                                                    element.link.appearance ===
                                                        "outline" &&
                                                        (isDark
                                                            ? "border-border-dark hover:bg-olive-900 hover:text-paper-0"
                                                            : "border-border-light hover:bg-brand-100 hover:text-ink-950"),
                                                )}
                                                locale={locale}
                                            />
                                        );
                                    case "flexMedia":
                                        return (
                                            <FlexibleMedia
                                                key={key}
                                                {...element}
                                                sizes={
                                                    twoColumns
                                                        ? "(max-width: 1023px) 100vw, 50vw"
                                                        : "100vw"
                                                }
                                            />
                                        );
                                    case "flexHtml":
                                        return (
                                            <div
                                                key={key}
                                                className="w-full overflow-x-auto [&_iframe]:max-w-full [&_img]:max-w-full"
                                                dangerouslySetInnerHTML={{
                                                    __html: sanitizeFlexibleHTML(
                                                        element.html,
                                                    ),
                                                }}
                                            />
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
