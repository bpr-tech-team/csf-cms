import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/config";
import { localeOpenGraphLocales } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { getCanonicalUrl, seoConfig } from "@/seo/config";

const defaultOpenGraph: Metadata["openGraph"] = {
    type: "website",
    description: seoConfig.defaultDescription,
    images: [
        {
            url: getCanonicalUrl(seoConfig.defaultOgImagePath),
            width: 1200,
            height: 630,
            alt: seoConfig.defaultTitle,
        },
    ],
    locale: seoConfig.locale,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
};

export const mergeOpenGraph = (
    og?: Metadata["openGraph"],
    locale: AppLocale = "cs",
): Metadata["openGraph"] => {
    const messages = frontendMessages[locale];

    return {
        ...defaultOpenGraph,
        description: messages.defaultDescription,
        title: messages.defaultTitle,
        ...og,
        images: og?.images ? og.images : defaultOpenGraph.images,
        locale: localeOpenGraphLocales[locale],
    };
};
