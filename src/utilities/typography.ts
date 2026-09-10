import { fixTypos, type TypopoLocale } from "typopo";

import { defaultLocale, type AppLocale } from "@/i18n/config";

export type TypographyOptions = {
    enabled?: boolean;
    locale?: AppLocale;
};

const typopoLocales: Record<AppLocale, TypopoLocale> = {
    cs: "cs",
    en: "en-us",
};

/** Typopo owns all typography rules. Keep edge whitespace for inline composition. */
export function applyTypography(
    text: string | null | undefined,
    { enabled = true, locale = defaultLocale }: TypographyOptions = {},
): string {
    if (!text) return "";
    if (!enabled) return text;
    const [, before, content, after] = text.match(/^(\s*)([\s\S]*?)(\s*)$/)!;
    return (
        before +
        fixTypos(content, typopoLocales[locale], { removeLines: false }) +
        after
    );
}
