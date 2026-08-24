export const defaultLocale = "cs" as const;

export const locales = ["cs", "en"] as const;

export type AppLocale = (typeof locales)[number];

export const localeLabels: Record<AppLocale, string> = {
    cs: "Čeština",
    en: "English",
};

export const localeLanguages: Record<AppLocale, string> = {
    cs: "cs-CZ",
    en: "en",
};

export const localeOpenGraphLocales: Record<AppLocale, string> = {
    cs: "cs_CZ",
    en: "en_US",
};

export const isLocale = (locale?: string): locale is AppLocale =>
    locales.includes(locale as AppLocale);

export const getLocalePrefix = (locale: AppLocale) =>
    locale === defaultLocale ? "" : `/${locale}`;

export const stripLocalePrefix = (path: string) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const locale = normalizedPath.split("/")[1];

    if (!isLocale(locale)) {
        return normalizedPath;
    }

    const strippedPath = normalizedPath.replace(`/${locale}`, "") || "/";

    return strippedPath.startsWith("/") ? strippedPath : `/${strippedPath}`;
};

export const withLocalePrefix = (path: string, locale: AppLocale) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const [, pathname = "/", suffix = ""] =
        normalizedPath.match(/^([^?#]*)([?#].*)?$/) || [];
    const pathWithoutLocale = stripLocalePrefix(pathname);
    const prefix = getLocalePrefix(locale);

    if (pathWithoutLocale === "/") {
        return prefix || "/";
    }

    return `${prefix}${pathWithoutLocale}${suffix}`;
};

export const getAlternateLocale = (locale: AppLocale): AppLocale =>
    locale === "cs" ? "en" : "cs";
