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
            "relative flex size-16 shrink-0 items-center justify-center rounded-md bg-brand-200 transition-colors duration-base group-hover:bg-border-light",
            className,
        )}
    >
        {/* Recolor uploaded icons to #0E0E0EBF while preserving transparency. */}
        <MediaAsset
            alt=""
            className="size-8 object-contain transition-[filter] duration-base group-hover:[filter:brightness(0)_invert(0.054902)_opacity(0.74902)]"
            resource={resource}
            sizes="32px"
        />
    </span>
);
