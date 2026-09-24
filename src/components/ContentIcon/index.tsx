import type { CSSProperties } from "react";
import { cn } from "@/utilities/ui";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import {
    fontAwesomeURL,
    iconScale,
    type ContentIconValue,
} from "@/utilities/contentIcon";

export function ContentIcon({
    icon,
    className,
    style,
}: {
    icon?: ContentIconValue | null;
    className?: string;
    style?: CSSProperties;
}) {
    const media =
        icon?.source === "image" && typeof icon.image === "object"
            ? icon.image
            : null;
    const url =
        icon?.source === "fontawesome"
            ? fontAwesomeURL(icon.fontAwesome)
            : media?.url
              ? getMediaUrl(media.url, media.updatedAt)
              : null;
    if (!url) return null;
    const monochrome =
        icon?.source === "fontawesome" || icon?.imageColor === "monochrome";
    const artworkStyle: CSSProperties = {
        width: "100%",
        height: "100%",
        display: "block",
        transform: `scale(${iconScale(icon?.scale)})`,
        ...(monochrome
            ? {
                  backgroundColor: "currentColor",
                  maskImage: `url(${JSON.stringify(url)})`,
                  maskSize: "contain",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: `url(${JSON.stringify(url)})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
              }
            : {}),
    };
    return (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex shrink-0 items-center justify-center",
                className,
            )}
            style={{
                display: "inline-flex",
                flexShrink: 0,
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
        >
            {monochrome ? (
                <span style={artworkStyle} />
            ) : (
                // Preserve the original file, including SVGs and transparent PNGs.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={url}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ ...artworkStyle, objectFit: "contain" }}
                />
            )}
        </span>
    );
}
