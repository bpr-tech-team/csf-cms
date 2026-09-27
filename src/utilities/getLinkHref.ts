import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import type { Page, Post } from "@/payload-types";
import { getPagePath } from "./getPagePath";

type LinkTarget = {
    type?: "custom" | "reference" | null;
    url?: string | null;
    reference?: {
        relationTo: "pages" | "posts";
        value: Page | Post | string | number;
    } | null;
};

export function getLinkHref(
    link?: LinkTarget | null,
    locale: AppLocale = defaultLocale,
) {
    if (!link) return null;
    const href =
        link.type === "reference"
            ? typeof link.reference?.value === "object" &&
              link.reference.value.slug
                ? link.reference.relationTo === "pages"
                    ? getPagePath(link.reference.value as Page, locale)
                    : `/posts/${link.reference.value.slug}`
                : null
            : link.url;
    return href?.startsWith("/") && !href.startsWith("//")
        ? withLocalePrefix(href, locale)
        : href || null;
}

export function isCurrentLink(pathname: string, href?: string | null) {
    if (!href?.startsWith("/") || href.startsWith("//") || href.includes("#"))
        return false;
    const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    const current = pathname.replace(/\/$/, "") || "/";
    return current === path;
}
