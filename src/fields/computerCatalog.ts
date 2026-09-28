import type { ArrayField } from "payload";
import { highlightedTextsField } from "./highlightedTexts";

type CatalogTableNames = {
    categories: string;
    highlights: string;
    products: string;
    specs: string;
};

export const computerCategoriesField = (
    names: CatalogTableNames,
): ArrayField => ({
    name: "categories",
    type: "array",
    labels: {
        singular: { cs: "Kategorie", en: "Category" },
        plural: { cs: "Kategorie", en: "Categories" },
    },
    dbName: names.categories,
    admin: {
        initCollapsed: true,
    },
    fields: [
        {
            name: "label",
            type: "text",
            label: {
                cs: "Název záložky",
                en: "Tab label",
            },
            required: true,
        },
        {
            name: "heading",
            type: "textarea",
            label: {
                cs: "Nadpis kategorie",
                en: "Category heading",
            },
            required: true,
        },
        highlightedTextsField({
            dbName: names.highlights,
        }),
        {
            name: "products",
            type: "array",
            labels: {
                singular: { cs: "Produkt", en: "Product" },
                plural: { cs: "Produkty", en: "Products" },
            },
            dbName: names.products,
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    label: {
                        cs: "Obrázek produktu",
                        en: "Product image",
                    },
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "name",
                    type: "text",
                    label: {
                        cs: "Název produktu",
                        en: "Product name",
                    },
                    required: true,
                },
                {
                    name: "summary",
                    type: "textarea",
                    label: {
                        cs: "Popis produktu",
                        en: "Product description",
                    },
                    required: true,
                },
                {
                    name: "specifications",
                    type: "array",
                    labels: {
                        singular: {
                            cs: "Parametr",
                            en: "Specification",
                        },
                        plural: {
                            cs: "Parametry",
                            en: "Specifications",
                        },
                    },
                    dbName: names.specs,
                    admin: {
                        initCollapsed: true,
                    },
                    fields: [
                        {
                            name: "label",
                            type: "text",
                            label: {
                                cs: "Parametr",
                                en: "Specification",
                            },
                            required: true,
                        },
                        {
                            name: "value",
                            type: "textarea",
                            label: {
                                cs: "Hodnota",
                                en: "Value",
                            },
                            required: true,
                        },
                    ],
                    label: {
                        cs: "Technické parametry",
                        en: "Specifications",
                    },
                },
            ],
            label: {
                cs: "Produkty",
                en: "Products",
            },
            minRows: 1,
            required: true,
        },
    ],
    label: {
        cs: "Kategorie produktů",
        en: "Product categories",
    },
    minRows: 1,
    required: true,
});
