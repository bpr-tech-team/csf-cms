import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { searchPlugin } from "@payloadcms/plugin-search";
import { Plugin } from "payload";
import { revalidateRedirects } from "@/hooks/revalidateRedirects";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import {
    FixedToolbarFeature,
    HeadingFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { searchFields } from "@/search/fieldOverrides";
import { beforeSyncWithSearch } from "@/search/beforeSync";

import { Page, Post } from "@/payload-types";
import { defaultLocale, isLocale, withLocalePrefix } from "@/i18n/config";
import { getCanonicalUrl, seoConfig } from "@/seo/config";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
    return doc?.title
        ? `${doc.title}${seoConfig.titleSuffix}`
        : seoConfig.defaultTitle;
};

const generateURL: GenerateURL<Post | Page> = ({
    collectionConfig,
    doc,
    locale: incomingLocale,
}) => {
    if (!doc?.slug || doc.slug === "home") {
        const locale = isLocale(incomingLocale)
            ? incomingLocale
            : defaultLocale;

        return getCanonicalUrl(withLocalePrefix("/", locale));
    }

    const path =
        collectionConfig?.slug === "posts"
            ? `/posts/${doc.slug}`
            : `/${doc.slug}`;
    const locale = isLocale(incomingLocale) ? incomingLocale : defaultLocale;

    return getCanonicalUrl(withLocalePrefix(path, locale));
};

export const plugins: Plugin[] = [
    redirectsPlugin({
        collections: ["pages", "posts"],
        overrides: {
            labels: {
                plural: {
                    cs: "Přesměrování",
                    en: "Redirects",
                },
                singular: {
                    cs: "Přesměrování",
                    en: "Redirect",
                },
            },
            // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
            fields: ({ defaultFields }) => {
                return defaultFields.map((field) => {
                    if ("name" in field && field.name === "from") {
                        return {
                            ...field,
                            admin: {
                                description: {
                                    cs: "Po změně tohoto pole je potřeba znovu sestavit web.",
                                    en: "You will need to rebuild the website when changing this field.",
                                },
                            },
                        };
                    }
                    return field;
                });
            },
            hooks: {
                afterChange: [revalidateRedirects],
            },
        },
    }),
    nestedDocsPlugin({
        collections: ["categories"],
        generateURL: (docs) =>
            docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
    seoPlugin({
        generateTitle,
        generateURL,
    }),
    formBuilderPlugin({
        fields: {
            payment: false,
        },
        formOverrides: {
            labels: {
                plural: {
                    cs: "Formuláře",
                    en: "Forms",
                },
                singular: {
                    cs: "Formulář",
                    en: "Form",
                },
            },
            fields: ({ defaultFields }) => {
                return defaultFields.map((field) => {
                    if (
                        "name" in field &&
                        field.name === "confirmationMessage"
                    ) {
                        return {
                            ...field,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        FixedToolbarFeature(),
                                        HeadingFeature({
                                            enabledHeadingSizes: [
                                                "h1",
                                                "h2",
                                                "h3",
                                                "h4",
                                            ],
                                        }),
                                    ];
                                },
                            }),
                        };
                    }
                    return field;
                });
            },
        },
        formSubmissionOverrides: {
            labels: {
                plural: {
                    cs: "Odeslání formulářů",
                    en: "Form Submissions",
                },
                singular: {
                    cs: "Odeslání formuláře",
                    en: "Form Submission",
                },
            },
        },
    }),
    searchPlugin({
        collections: ["posts"],
        beforeSync: beforeSyncWithSearch,
        searchOverrides: {
            admin: {
                description: {
                    cs: "Automaticky vytvářené výsledky pro globální vyhledávání na webu. Aktualizují se při změnách dokumentů v CMS.",
                    en: "This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.",
                },
            },
            labels: {
                plural: {
                    cs: "Výsledky vyhledávání",
                    en: "Search Results",
                },
                singular: {
                    cs: "Výsledek vyhledávání",
                    en: "Search Result",
                },
            },
            fields: ({ defaultFields }) => {
                return [...defaultFields, ...searchFields];
            },
        },
    }),
];
