import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteCursor } from "@/components/SiteCursor";
import { AdminBar } from "@/components/AdminBar";
import { InitHeroReveal } from "@/components/HeroSection/InitHeroReveal";
import { Footer } from "@/globals/Footer/Component";
import { Header } from "@/globals/Header/Component";
import type { AppLocale } from "@/i18n/config";
import {
    defaultLocale,
    localeLanguages,
    withLocalePrefix,
} from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { defaultTheme } from "@/providers/Theme/shared";
import { getCanonicalUrl, getSiteUrl, seoConfig } from "@/seo/config";
import {
    JsonLd,
    organizationJsonLd,
    professionalServiceJsonLd,
    websiteJsonLd,
} from "@/seo/structuredData";
import { cn } from "@/utilities/ui";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getBranchDirectory } from "@/utilities/getBranches";
import { draftMode } from "next/headers";
import React from "react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    display: "swap",
    // Let CSS request the weights/subsets used by this page instead of preloading all 12.
    preload: false,
    subsets: ["latin", "latin-ext"],
    variable: "--font-poppins",
    weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = localFont({
    src: "../../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
    variable: "--font-geist-mono",
    weight: "100 900",
    display: "swap",
    preload: false,
    adjustFontFallback: false,
    fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export async function FrontendShell({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale: AppLocale;
}) {
    const [{ isEnabled }, footerData, contactDetails, branches] =
        await Promise.all([
            draftMode(),
            getCachedGlobal("footer", 1, locale, "layout-v4")(),
            getCachedGlobal(
                "contact-details",
                1,
                defaultLocale,
                "head-office-v1",
            )(),
            getBranchDirectory(locale),
        ]);
    const headOfficeId =
        typeof contactDetails.headOffice === "object"
            ? contactDetails.headOffice?.id
            : contactDetails.headOffice;
    const headOffice = branches.find((branch) => branch.id === headOfficeId);

    return (
        <html
            className={cn(poppins.variable, geistMono.variable)}
            data-theme={defaultTheme}
            lang={localeLanguages[locale]}
            suppressHydrationWarning
        >
            <head>
                <InitTheme />
                <InitHeroReveal />
                <link href="/favicon.ico" rel="icon" sizes="any" />
                <JsonLd data={organizationJsonLd(contactDetails, headOffice)} />
                <JsonLd data={websiteJsonLd(locale)} />
                <JsonLd
                    data={professionalServiceJsonLd(contactDetails, {
                        branches,
                        headOffice,
                        locale,
                    })}
                />
            </head>
            <body className="[--site-header-height:--spacing(18)] xl:[--site-header-height:--spacing(26)]">
                <SiteCursor />
                <Providers locale={locale}>
                    <AdminBar
                        adminBarProps={{
                            preview: isEnabled,
                        }}
                        locale={locale}
                    />
                    <Header locale={locale} />
                    {children}
                    <Footer
                        contacts={contactDetails}
                        data={footerData}
                        locale={locale}
                    />
                </Providers>
                {(process.env.VERCEL_ENV === "preview" ||
                    process.env.VERCEL_ENV === "production") && (
                    <SpeedInsights />
                )}
                {process.env.VERCEL_ENV === "production" && !isEnabled && (
                    <Analytics />
                )}
            </body>
        </html>
    );
}

export const getFrontendMetadata = (locale: AppLocale): Metadata => {
    const messages = frontendMessages[locale];

    return {
        alternates: {
            canonical: getCanonicalUrl(withLocalePrefix("/", locale)),
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
        title: messages.defaultTitle,
        twitter: {
            card: "summary_large_image",
            description: messages.defaultDescription,
            images: [getCanonicalUrl(seoConfig.defaultOgImagePath)],
            title: messages.defaultTitle,
        },
    };
};
