import type { AppLocale } from "@/i18n/config";
import { localeLanguages } from "@/i18n/config";

export const formatDateTime = (
    timestamp: string,
    locale: AppLocale = "cs",
): string => {
    const date = timestamp ? new Date(timestamp) : new Date();

    return new Intl.DateTimeFormat(localeLanguages[locale], {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};
