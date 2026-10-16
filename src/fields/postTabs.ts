import type {
    TabsField,
    TextareaFieldValidation,
    UploadFieldSingleValidation,
    Where,
} from "payload";
import type { Page } from "@/payload-types";
import { textarea, upload } from "payload/shared";

const validateImage: UploadFieldSingleValidation = (value, options) =>
    (options.data as Partial<Page>)?.pageType === "post"
        ? upload(value, options)
        : true;
const validateExcerpt: TextareaFieldValidation = (value, options) =>
    (options.data as Partial<Page>)?.pageType === "post"
        ? textarea(value?.trim(), options)
        : true;

// Article-specific fields remain at the document root; other page types use
// the same layout and SEO fields without requiring article preview data.
export const postTabs: TabsField["tabs"] = [
    {
        label: { cs: "Náhled", en: "Preview" },
        admin: { condition: (data) => data?.pageType === "post" },
        fields: [
            {
                name: "heroImage",
                type: "upload",
                relationTo: "media",
                filterOptions: { mimeType: { contains: "image/" } },
                required: true,
                validate: validateImage,
                label: { cs: "Náhledový obrázek", en: "Preview image" },
                admin: {
                    description: {
                        cs: "Obrázek pro karty článku. Obsah stránky sestavte z bloků.",
                        en: "Image for post cards. Build the page content with blocks.",
                    },
                },
            },
            {
                name: "excerpt",
                type: "textarea",
                localized: true,
                required: true,
                validate: validateExcerpt,
                label: { cs: "Krátký text", en: "Short description" },
                admin: {
                    description: {
                        cs: "Krátký text pro karty článku. Nadpis stránky nastavte v obsahových blocích.",
                        en: "Short text for post cards. Set the page heading in its content blocks.",
                    },
                },
            },
        ],
    },
    {
        label: { cs: "Metadata", en: "Meta" },
        admin: { condition: (data) => data?.pageType === "post" },
        fields: [
            {
                name: "relatedPosts",
                type: "relationship",
                relationTo: "pages",
                hasMany: true,
                label: { cs: "Související články", en: "Related posts" },
                filterOptions: ({ id }): Where => ({
                    and: [
                        { pageType: { equals: "post" } },
                        ...(id ? [{ id: { not_equals: id } }] : []),
                    ],
                }),
            },
            {
                name: "authors",
                type: "relationship",
                relationTo: "users",
                hasMany: true,
                label: { cs: "Autoři", en: "Authors" },
            },
            {
                name: "populatedAuthors",
                type: "array",
                access: { update: () => false },
                admin: { disabled: true, readOnly: true },
                label: { cs: "Načtení autoři", en: "Populated authors" },
                fields: [
                    { name: "id", type: "text" },
                    {
                        name: "name",
                        type: "text",
                        label: { cs: "Jméno", en: "Name" },
                    },
                ],
            },
        ],
    },
];
