import { Field } from "payload";

export const searchFields: Field[] = [
    {
        name: "slug",
        type: "text",
        index: true,
        label: {
            cs: "Slug",
            en: "Slug",
        },
        localized: true,
        admin: {
            readOnly: true,
        },
    },
    {
        name: "meta",
        label: {
            cs: "Meta",
            en: "Meta",
        },
        type: "group",
        index: true,
        localized: true,
        admin: {
            readOnly: true,
        },
        fields: [
            {
                type: "text",
                name: "title",
                label: {
                    cs: "Název",
                    en: "Title",
                },
            },
            {
                type: "text",
                name: "description",
                label: {
                    cs: "Popis",
                    en: "Description",
                },
            },
            {
                name: "image",
                label: {
                    cs: "Obrázek",
                    en: "Image",
                },
                type: "upload",
                relationTo: "media",
            },
        ],
    },
    {
        label: {
            cs: "Kategorie",
            en: "Categories",
        },
        name: "categories",
        type: "array",
        localized: true,
        admin: {
            readOnly: true,
        },
        fields: [
            {
                name: "relationTo",
                type: "text",
            },
            {
                name: "categoryID",
                type: "text",
            },
            {
                name: "title",
                type: "text",
            },
        ],
    },
];
