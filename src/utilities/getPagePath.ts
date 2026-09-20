import type { Page } from "@/payload-types";

export const getPagePath = ({
    slug,
    pageType,
}: {
    slug?: string | null;
    pageType?: Page["pageType"] | null;
}) => {
    if (!slug) return "/";
    if (pageType === "branch") return `/kontakt/${encodeURIComponent(slug)}`;
    return slug === "home" ? "/" : `/${encodeURIComponent(slug)}`;
};
