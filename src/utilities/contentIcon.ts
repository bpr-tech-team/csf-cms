import type { Media } from "@/payload-types";

export type ContentIconValue = {
    source?: "image" | "fontawesome" | null;
    image?: Media | number | null;
    fontAwesome?: string | null;
    imageColor?: "original" | "monochrome" | null;
    scale?: number | null;
};

export type IconStyle = "solid" | "regular" | "brands";
export type IconCatalogEntry = {
    id: string;
    name: string;
    style: IconStyle;
    search: string;
};

export const fontAwesomeURL = (value?: string | null): string | null => {
    if (!value || !/^(solid|regular|brands)\/[a-z0-9-]+$/.test(value))
        return null;
    return `/api/content-icons/${value}`;
};

export const iconScale = (scale?: number | null) =>
    typeof scale === "number" && Number.isFinite(scale)
        ? Math.min(125, Math.max(75, scale)) / 100
        : 1;
