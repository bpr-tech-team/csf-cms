import type { ContactDetails, Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { localeLanguages, withLocalePrefix } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";

import { getAbsoluteUrl, getCanonicalUrl, seoConfig } from "./config";

const postalAddress = (
    address: typeof seoConfig.address | (typeof seoConfig.branches)[number],
) => ({
    "@type": "PostalAddress",
    streetAddress: address.streetAddress,
    postalCode: address.postalCode,
    addressLocality: address.addressLocality,
    addressCountry: "addressCountry" in address ? address.addressCountry : "CZ",
});

export const organizationJsonLd = (contacts?: Partial<ContactDetails>) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getCanonicalUrl()}/#organization`,
    name: seoConfig.legalName,
    alternateName: seoConfig.siteName,
    url: getCanonicalUrl(),
    logo: getCanonicalUrl(seoConfig.logoPath),
    email: contacts?.email || undefined,
    telephone: contacts?.phone || undefined,
    foundingDate: seoConfig.foundingDate,
    sameAs: contacts?.socialLinks?.length
        ? contacts.socialLinks.map(({ url }) => url)
        : undefined,
    address: postalAddress(seoConfig.address),
});

export const websiteJsonLd = (locale: AppLocale = "cs") => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getCanonicalUrl()}/#website`,
    name: seoConfig.siteName,
    url: getCanonicalUrl(withLocalePrefix("/", locale)),
    publisher: {
        "@id": `${getCanonicalUrl()}/#organization`,
    },
    inLanguage: localeLanguages[locale],
});

export const professionalServiceJsonLd = (
    contacts?: Partial<ContactDetails>,
) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${getCanonicalUrl()}/#professional-service`,
    name: seoConfig.legalName,
    url: getCanonicalUrl(),
    image: getCanonicalUrl(seoConfig.defaultOgImagePath),
    email: contacts?.email || undefined,
    telephone: contacts?.phone || undefined,
    address: postalAddress(seoConfig.address),
    areaServed: {
        "@type": "Country",
        name: "Česká republika",
    },
    branchOf: {
        "@id": `${getCanonicalUrl()}/#organization`,
    },
    department: seoConfig.branches.map((branch) => ({
        "@type": "LocalBusiness",
        name: branch.name,
        address: postalAddress(branch),
        telephone: "telephone" in branch ? branch.telephone : undefined,
    })),
});

export const blogPostingJsonLd = (
    post: Page,
    locale: AppLocale = "cs",
    path?: string,
) => {
    const title = post.meta?.title || post.title;
    const messages = frontendMessages[locale];
    const slug = post.slug ? `/posts/${post.slug}` : "/posts";
    const pagePath = path || withLocalePrefix(slug, locale);
    const image =
        post.meta?.image && typeof post.meta.image === "object"
            ? post.meta.image.url
            : undefined;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: post.meta?.description || messages.defaultDescription,
        image: image
            ? getAbsoluteUrl(image)
            : getCanonicalUrl(seoConfig.defaultOgImagePath),
        datePublished: post.publishedAt || post.createdAt,
        dateModified: post.updatedAt,
        mainEntityOfPage: getCanonicalUrl(pagePath),
        author: {
            "@id": `${getCanonicalUrl()}/#organization`,
        },
        publisher: {
            "@id": `${getCanonicalUrl()}/#organization`,
        },
        inLanguage: localeLanguages[locale],
    };
};

export const JsonLd = ({ data }: { data: unknown }) => (
    <script
        dangerouslySetInnerHTML={{
            // Keep CMS text from closing the script tag in the HTML parser.
            __html: JSON.stringify(data)?.replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
    />
);
