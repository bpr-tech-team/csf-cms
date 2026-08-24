import type { Metadata } from "next";

import { cn } from "@/utilities/ui";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import React from "react";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { draftMode } from "next/headers";

import "./globals.css";
import { getCanonicalUrl, getSiteUrl, seoConfig } from "@/seo/config";
import {
    JsonLd,
    organizationJsonLd,
    professionalServiceJsonLd,
    websiteJsonLd,
} from "@/seo/structuredData";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isEnabled } = await draftMode();

    return (
        <html
            className={cn(GeistSans.variable, GeistMono.variable)}
            lang={seoConfig.language}
            suppressHydrationWarning
        >
            <head>
                <InitTheme />
                <link href="/favicon.ico" rel="icon" sizes="32x32" />
                <link href="/favicon.ico" rel="icon" type="image/svg+xml" />
                <JsonLd data={organizationJsonLd()} />
                <JsonLd data={websiteJsonLd()} />
                <JsonLd data={professionalServiceJsonLd()} />
            </head>
            <body>
                <Providers>
                    <AdminBar
                        adminBarProps={{
                            preview: isEnabled,
                        }}
                    />

                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    alternates: {
        canonical: getCanonicalUrl(),
    },
    description: seoConfig.defaultDescription,
    metadataBase: new URL(getSiteUrl()),
    openGraph: mergeOpenGraph(),
    title: {
        default: seoConfig.defaultTitle,
        template: `%s${seoConfig.titleSuffix}`,
    },
    twitter: {
        card: "summary_large_image",
        description: seoConfig.defaultDescription,
        images: [getCanonicalUrl(seoConfig.defaultOgImagePath)],
        title: seoConfig.defaultTitle,
    },
};
