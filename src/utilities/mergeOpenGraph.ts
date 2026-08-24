import type { Metadata } from "next";
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
): Metadata["openGraph"] => {
    return {
        ...defaultOpenGraph,
        ...og,
        images: og?.images ? og.images : defaultOpenGraph.images,
    };
};
