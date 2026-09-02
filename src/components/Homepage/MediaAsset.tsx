import type { Media as MediaType } from "@/payload-types";

import { Media } from "@/components/Media";
import NextImage from "next/image";
import React from "react";

type MediaAssetProps = {
    alt?: string;
    className: string;
    fallback?: string;
    fill?: boolean;
    height?: number;
    priority?: boolean;
    resource?: MediaType | number | null;
    sizes?: string;
    width?: number;
};

export const MediaAsset = ({
    alt = "",
    className,
    fallback,
    fill = false,
    height = 64,
    priority = false,
    resource,
    sizes,
    width = 64,
}: MediaAssetProps) => {
    if (resource && typeof resource === "object") {
        return (
            <Media
                alt={alt}
                fill={fill}
                htmlElement={null}
                imgClassName={className}
                priority={priority}
                resource={resource}
                size={sizes}
            />
        );
    }

    if (!fallback) return null;

    if (fill) {
        return (
            <NextImage
                alt={alt}
                className={className}
                fill
                priority={priority}
                sizes={sizes ?? "100vw"}
                src={fallback}
            />
        );
    }

    return (
        <NextImage
            alt={alt}
            className={className}
            height={height}
            src={fallback}
            width={width}
        />
    );
};
