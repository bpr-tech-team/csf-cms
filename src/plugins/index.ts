import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Plugin } from "payload";
import { revalidateRedirects } from "@/hooks/revalidateRedirects";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";

import { Page } from "@/payload-types";
import { defaultLocale, isLocale, withLocalePrefix } from "@/i18n/config";
import { getCanonicalUrl } from "@/seo/config";
import { getSeoTitle } from "@/seo/getSeoTitle";
import { getPagePath } from "@/utilities/getPagePath";
import { preserveFormEmailColors } from "@/email/richText";
import { formLabels, formSubmissionLabels } from "./formLabels";

const generateTitle: GenerateTitle<Page> = ({ doc, locale }) =>
    getSeoTitle(doc?.title, isLocale(locale) ? locale : defaultLocale);

const generateURL: GenerateURL<Page> = ({ doc, locale: incomingLocale }) => {
    if (!doc?.slug) {
        const locale = isLocale(incomingLocale)
            ? incomingLocale
            : defaultLocale;

        return getCanonicalUrl(withLocalePrefix("/", locale));
    }

    const locale = isLocale(incomingLocale) ? incomingLocale : defaultLocale;
    const path = getPagePath(doc as Page, locale);

    return getCanonicalUrl(withLocalePrefix(path, locale));
};

export const plugins: Plugin[] = [
    // The pinned Blob adapter patch reserves a new object key before each upload,
    // including replacements, so duplicate names cannot overwrite other originals.
    vercelBlobStorage({
        alwaysInsertFields: true,
        collections: { media: true },
        token: process.env.BLOB_READ_WRITE_TOKEN,
        clientUploads: true,
    }),
    redirectsPlugin({
        collections: ["pages"],
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
                afterDelete: [revalidateRedirects],
            },
        },
    }),
    seoPlugin({
        generateTitle,
        generateURL,
    }),
    formBuilderPlugin({
        beforeEmail: preserveFormEmailColors,
        fields: {
            payment: false,
        },
        formOverrides: {
            fields: formLabels,
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
        },
        formSubmissionOverrides: {
            fields: formSubmissionLabels,
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
];
