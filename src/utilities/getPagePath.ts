import type { Page } from "@/payload-types";
import { defaultLocale, withLocalePrefix, type AppLocale } from "@/i18n/config";

export type PageType = Page["pageType"];

export const pagePathPrefixes = {
    standard: { cs: "", en: "" },
    service: { cs: "sluzby", en: "services" },
    computer: { cs: "pocitace", en: "computers" },
    branch: { cs: "kontakt", en: "contact" },
} satisfies Record<PageType, Record<AppLocale, string>>;

// These routes used to render copies. Keep them only as redirect entry points.
const legacyPrefixes = {
    standard: { cs: ["sluzby", "pocitace"], en: [] },
    service: { cs: ["", "pocitace"], en: [""] },
    computer: { cs: ["", "sluzby"], en: [""] },
    branch: { cs: [], en: ["kontakt"] },
} satisfies Record<PageType, Record<AppLocale, string[]>>;

export const getPageRoutePrefixes = (pageType: PageType, locale: AppLocale) => [
    pagePathPrefixes[pageType][locale],
    ...legacyPrefixes[pageType][locale],
];

type PagePathInput = {
    slug?: string | null;
    pageType?: Page["pageType"] | null;
};

export const getPagePath = (
    { slug, pageType }: PagePathInput,
    locale: AppLocale = defaultLocale,
) => {
    const type = pageType ?? "standard";
    const prefix = pagePathPrefixes[type][locale];
    const path =
        !slug || (type === "standard" && slug === "home")
            ? "/"
            : `/${prefix ? `${prefix}/` : ""}${encodeURIComponent(slug)}`;
    return withLocalePrefix(path, locale);
};

// Include cached redirects as well as the canonical page when invalidating.
export const getPageRoutePaths = (
    { slug, pageType }: PagePathInput,
    locale: AppLocale,
) => {
    if (!slug) return [];
    return [
        ...new Set([
            getPagePath({ slug, pageType }, locale),
            ...getPageRoutePrefixes(pageType ?? "standard", locale).map(
                (prefix) =>
                    withLocalePrefix(
                        `/${prefix ? `${prefix}/` : ""}${encodeURIComponent(slug)}`,
                        locale,
                    ),
            ),
        ]),
    ];
};
