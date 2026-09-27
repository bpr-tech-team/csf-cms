import { defaultLocale, type AppLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { seoConfig } from "./config";

export function getSeoTitle(
    title?: string | null,
    locale: AppLocale = defaultLocale,
) {
    const name = title?.trim();
    if (!name) return frontendMessages[locale].defaultTitle;

    return name.endsWith(seoConfig.titleSuffix)
        ? name
        : `${name}${seoConfig.titleSuffix}`;
}
