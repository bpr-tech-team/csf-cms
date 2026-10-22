import type { StaticImageData } from "next/image";

import { cn } from "@/utilities/ui";
import NextImage from "next/image";
import React from "react";

import type { Props as MediaProps } from "../types";

import { getImageMediaUrl } from "@/utilities/getImageMediaUrl";

export const ImageMedia: React.FC<MediaProps> = (props) => {
    const {
        alt: altFromProps,
        fill,
        fetchPriority: fetchPriorityFromProps,
        pictureClassName,
        imgClassName,
        priority,
        quality = 75,
        resource,
        size: sizeFromProps,
        src: srcFromProps,
        loading: loadingFromProps,
    } = props;

    let width: number | undefined;
    let height: number | undefined;
    let alt = altFromProps;
    let src: StaticImageData | string = srcFromProps || "";

    if (!src && resource && typeof resource === "object") {
        const {
            alt: altFromResource,
            height: fullHeight,
            width: fullWidth,
        } = resource;

        width = fullWidth!;
        height = fullHeight!;
        alt = altFromProps || altFromResource || "";

        src = getImageMediaUrl(resource);
    }

    const loading = loadingFromProps ?? (priority ? "eager" : "lazy");
    const fetchPriority =
        fetchPriorityFromProps ??
        (priority ? "high" : loading === "lazy" ? "low" : undefined);
    const sizes = sizeFromProps ?? (fill ? "100vw" : undefined);

    return (
        <picture className={cn(pictureClassName)}>
            <NextImage
                alt={alt || ""}
                className={cn(imgClassName)}
                fill={fill}
                fetchPriority={fetchPriority}
                height={!fill ? height : undefined}
                quality={quality}
                loading={loading}
                sizes={sizes}
                src={src}
                width={!fill ? width : undefined}
            />
        </picture>
    );
};
