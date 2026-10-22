import type { Media as MediaType } from "@/payload-types";

import { Media } from "@/components/Media";
import React from "react";

type MediaAssetProps = {
    alt?: string;
    className: string;
    fill?: boolean;
    fetchPriority?: "high" | "low" | "auto";
    loading?: "lazy" | "eager";
    priority?: boolean;
    quality?: number;
    resource?: MediaType | number | null;
    sizes?: string;
};

export const MediaAsset = ({
    alt = "",
    className,
    fill = false,
    fetchPriority,
    loading,
    priority = false,
    quality,
    resource,
    sizes,
}: MediaAssetProps) => {
    if (resource && typeof resource === "object") {
        return (
            <Media
                alt={alt}
                fill={fill}
                fetchPriority={fetchPriority}
                htmlElement={null}
                imgClassName={className}
                pictureClassName={
                    fill ? "absolute inset-0 size-full" : undefined
                }
                priority={priority}
                loading={loading}
                quality={quality}
                resource={resource}
                size={sizes}
                videoClassName={className}
            />
        );
    }

    return null;
};
