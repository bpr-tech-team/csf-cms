import type { Media as MediaType } from "@/payload-types";

import { Media } from "@/components/Media";
import React from "react";

type MediaAssetProps = {
    alt?: string;
    className: string;
    fill?: boolean;
    priority?: boolean;
    resource?: MediaType | number | null;
    sizes?: string;
};

export const MediaAsset = ({
    alt = "",
    className,
    fill = false,
    priority = false,
    resource,
    sizes,
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

    return null;
};
