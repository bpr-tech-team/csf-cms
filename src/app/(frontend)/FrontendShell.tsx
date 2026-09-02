import type { Metadata } from "next";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import type { AppLocale } from "@/i18n/config";
import { localeLanguages } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { getCanonicalUrl, getSiteUrl, seoConfig } from "@/seo/config";
import {
    JsonLd,
    organizationJsonLd,
    professionalServiceJsonLd,
    websiteJsonLd,
} from "@/seo/structuredData";
import { cn } from "@/utilities/ui";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { draftMode } from "next/headers";
import React from "react";
import { GeistMono } from "geist/font/mono";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    display: "swap",
    subsets: ["latin", "latin-ext"],
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700", "800"],
});

export async function FrontendShell({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale: AppLocale;
}) {
    const { isEnabled } = await draftMode();

    return (
        <html
            className={cn(poppins.variable, GeistMono.variable)}
            lang={localeLanguages[locale]}
            suppressHydrationWarning
        >
            <head>
                <InitTheme />
                <link href="/favicon.ico" rel="icon" sizes="any" />
                <JsonLd data={organizationJsonLd()} />
                <JsonLd data={websiteJsonLd(locale)} />
                <JsonLd data={professionalServiceJsonLd()} />
            </head>
            <body>
                <Providers>
                    <AdminBar
                        adminBarProps={{
                            preview: isEnabled,
                        }}
                        locale={locale}
                    />

                    <Header locale={locale} />
                    {children}
                    <Footer locale={locale} />
                </Providers>
            </body>
        </html>
    );
}

export const getFrontendMetadata = (locale: AppLocale): Metadata => {
    const messages = frontendMessages[locale];

    return {
        alternates: {
            canonical: getCanonicalUrl(locale === "cs" ? "/" : `/${locale}`),
        },
        description: messages.defaultDescription,
        metadataBase: new URL(getSiteUrl()),
        openGraph: mergeOpenGraph(
            {
                description: messages.defaultDescription,
                title: messages.defaultTitle,
            },
            locale,
        ),
        title: {
            default: messages.defaultTitle,
            template: `%s${seoConfig.titleSuffix}`,
        },
        twitter: {
            card: "summary_large_image",
            description: messages.defaultDescription,
            images: [getCanonicalUrl(seoConfig.defaultOgImagePath)],
            title: messages.defaultTitle,
        },
    };
};
