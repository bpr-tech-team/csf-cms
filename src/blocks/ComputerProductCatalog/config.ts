import type { Block } from "payload";

import { highlightedTextsField } from "@/fields/highlightedTexts";

export const ComputerProductCatalog: Block = {
    slug: "computerProductCatalog",
    interfaceName: "ComputerProductCatalogBlock",
    fields: [
        {
            name: "anchorId",
            type: "text",
            admin: {
                description: {
                    cs: "Volitelné ID pro odkaz na katalog.",
                    en: "Optional link target for the catalog.",
                },
            },
            label: {
                cs: "ID kotvy",
                en: "Anchor ID",
            },
        },
        {
            name: "navigationHeading",
            type: "textarea",
            label: {
                cs: "Nadpis výběru kategorií",
                en: "Category selector heading",
            },
            required: true,
        },
        highlightedTextsField(),
        {
            name: "categories",
            type: "array",
            dbName: "pages_computer_catalog_categories",
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
                    dbName: "pages_computer_catalog_category_highlights",
                }),
                {
                    name: "products",
                    type: "array",
                    dbName: "pages_computer_catalog_products",
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
                            dbName: "pages_computer_catalog_specs",
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
                            maxRows: 10,
                        },
                    ],
                    label: {
                        cs: "Produkty",
                        en: "Products",
                    },
                    maxRows: 8,
                    minRows: 1,
                    required: true,
                },
            ],
            label: {
                cs: "Kategorie produktů",
                en: "Product categories",
            },
            maxRows: 6,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Katalogy počítačů",
            en: "Computer catalogs",
        },
        singular: {
            cs: "Katalog počítačů",
            en: "Computer catalog",
        },
    },
};
