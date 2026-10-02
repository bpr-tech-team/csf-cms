import { blockSpacingFields } from "@/fields/blockSpacing";
import type { ArrayField, Block } from "payload";

import { ComputerAudience } from "@/blocks/ComputerAudience/config";
import { computerCategoriesField } from "@/fields/computerCatalog";
import { highlightedTextsField } from "@/fields/highlightedTexts";

const audienceFields = (
    ComputerAudience.fields.find(
        (field) => "name" in field && field.name === "items",
    ) as ArrayField
).fields;

export const ComputerCatalog: Block = {
    slug: "computerCatalog",
    interfaceName: "ComputerCatalogBlock",
    labels: {
        singular: {
            cs: "Pracovní stanice podle zaměření",
            en: "Workstation catalog",
        },
        plural: {
            cs: "Katalogy pracovních stanic",
            en: "Workstation catalogs",
        },
    },
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/computer-product-catalog.webp",
                alt: "Pracovní stanice podle zaměření",
            },
        },
    },
    fields: [
        blockSpacingFields(),
        {
            name: "anchorId",
            type: "text",
            label: { cs: "ID kotvy", en: "Anchor ID" },
        },
        {
            name: "navigationHeading",
            type: "textarea",
            required: true,
            defaultValue: "Čemu se věnujete?",
            label: {
                cs: "Nadpis výběru kategorií",
                en: "Category selector heading",
            },
        },
        highlightedTextsField({ dbName: "pc_heading_highlights" }),
        {
            name: "audiences",
            type: "array",
            dbName: "pc_audiences",
            required: true,
            minRows: 1,
            maxRows: 8,
            admin: {
                initCollapsed: true,
                description: {
                    cs: "První skupina se otevře automaticky. Každá skupina má vlastní kategorie a produkty.",
                    en: "The first audience opens automatically. Each audience has its own categories and products.",
                },
            },
            label: { cs: "Cílové skupiny", en: "Audiences" },
            labels: {
                singular: { cs: "Cílová skupina", en: "Audience" },
                plural: { cs: "Cílové skupiny", en: "Audiences" },
            },
            fields: [
                ...audienceFields.map((field) =>
                    "name" in field && field.name === "highlightedTexts"
                        ? highlightedTextsField({
                              dbName: "pc_audience_highlights",
                          })
                        : field,
                ),
                computerCategoriesField({
                    categories: "pc_categories",
                    highlights: "pc_category_highlights",
                    products: "pc_products",
                    specs: "pc_specs",
                }),
            ],
        },
    ],
};
