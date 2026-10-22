import type { StaticImageData } from "next/image";
import type { ElementType, Ref } from "react";

import type { Media as MediaType } from "@/payload-types";

export interface Props {
    alt?: string;
    className?: string;
    fill?: boolean; // for NextImage only
    fetchPriority?: "high" | "low" | "auto";
    htmlElement?: ElementType | null;
    pictureClassName?: string;
    imgClassName?: string;
    onClick?: () => void;
    onLoad?: () => void;
    loading?: "lazy" | "eager"; // for NextImage only
    priority?: boolean; // maps to eager/high loading for NextImage
    quality?: number;
    ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
    resource?: MediaType | string | number | null; // for Payload media
    size?: string; // for NextImage only
    src?: StaticImageData; // for static media
    videoClassName?: string;
}
