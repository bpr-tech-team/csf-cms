import type { Media } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { cn } from "@/utilities/ui";
import React from "react";

type CardIconProps = {
    className?: string;
    resource?: Media | number | null;
};

export const CardIcon = ({ className, resource }: CardIconProps) => (
    <span
        aria-hidden="true"
        className={cn(
            "relative flex size-16 shrink-0 items-center justify-center rounded-md bg-brand-200",
            className,
        )}
    >
        <MediaAsset
            alt=""
            className="size-8 object-contain"
            resource={resource}
            sizes="32px"
        />
    </span>
);
