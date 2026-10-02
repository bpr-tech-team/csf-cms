import { blockSpacingFields } from "@/fields/blockSpacing";
import type { Block } from "payload";

import { computerCategoriesField } from "@/fields/computerCatalog";

import { highlightedTextsField } from "@/fields/highlightedTexts";

export const ComputerProductCatalog: Block = {
    slug: "computerProductCatalog",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/computer-product-catalog.webp",
                alt: "Katalog produktů",
            },
        },
    },
    interfaceName: "ComputerProductCatalogBlock",
    fields: [
        blockSpacingFields(),
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
        computerCategoriesField({
            categories: "pages_computer_catalog_categories",
            highlights: "pages_computer_catalog_category_highlights",
            products: "pages_computer_catalog_products",
            specs: "pages_computer_catalog_specs",
        }),
    ],
    labels: {
        plural: {
            cs: "Katalogy produktů",
            en: "Product catalogs",
        },
        singular: {
            cs: "Katalog produktů",
            en: "Product catalog",
        },
    },
};
