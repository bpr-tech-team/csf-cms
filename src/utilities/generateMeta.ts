import type { Metadata } from "next";

import type { Media, Page, Post, Config } from "../payload-types";

import type { AppLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { mergeOpenGraph } from "./mergeOpenGraph";
import { getAbsoluteUrl, getCanonicalUrl, seoConfig } from "@/seo/config";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
    let url = getCanonicalUrl(seoConfig.defaultOgImagePath);

    if (image && typeof image === "object" && "url" in image) {
        const ogUrl = image.sizes?.og?.url;

        url = getAbsoluteUrl(
            ogUrl || image.url || seoConfig.defaultOgImagePath,
        );
    }

    return url;
};

export const generateMeta = async (args: {
    doc: Partial<Page> | Partial<Post> | null;
    locale?: AppLocale;
    path?: string;
}): Promise<Metadata> => {
    const { doc, locale = "cs", path = "/" } = args;
    const messages = frontendMessages[locale];

    const ogImage = getImageURL(doc?.meta?.image);
    const description = doc?.meta?.description || messages.defaultDescription;

    const pageTitle = doc?.meta?.title || messages.defaultTitle;
    const socialTitle = doc?.meta?.title
        ? `${doc.meta.title}${seoConfig.titleSuffix}`
        : messages.defaultTitle;
    const canonical = getCanonicalUrl(path);

    return {
        alternates: {
            canonical,
        },
        description,
        openGraph: mergeOpenGraph(
            {
                description,
                images: ogImage
                    ? [
                          {
                              url: ogImage,
                              width: 1200,
                              height: 630,
                          },
                      ]
                    : undefined,
                title: socialTitle,
                url: canonical,
            },
            locale,
        ),
        title: pageTitle,
        twitter: {
            card: "summary_large_image",
            description,
            images: [ogImage],
            title: socialTitle,
        },
    };
};
