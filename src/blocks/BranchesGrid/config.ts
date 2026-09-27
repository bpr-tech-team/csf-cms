    import type { Block } from "payload";
import { highlightedTextsField } from "@/fields/highlightedTexts";

export const BranchesGrid: Block = {
    slug: "branchesGrid",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/branches-grid.webp",
                alt: "Přehled poboček",
            },
        },
    },
    interfaceName: "BranchesGridBlock",
    labels: {
        singular: { cs: "Přehled poboček", en: "Branches grid" },
        plural: { cs: "Přehledy poboček", en: "Branch grids" },
    },
    fields: [
        {
            name: "anchorId",
            type: "text",
            label: { cs: "ID kotvy", en: "Anchor ID" },
        },
        {
            name: "heading",
            type: "textarea",
            required: true,
            label: { cs: "Nadpis", en: "Heading" },
        },
        highlightedTextsField(),
        {
            name: "items",
            type: "array",
            labels: {
                singular: { cs: "Pobočka", en: "Branch" },
                plural: { cs: "Pobočky", en: "Branches" },
            },
            required: true,
            minRows: 1,
            label: { cs: "Pobočky", en: "Branches" },
            admin: { initCollapsed: true },
            fields: [
                {
                    name: "branch",
                    type: "relationship",
                    relationTo: "pages",
                    required: true,
                    maxDepth: 0,
                    filterOptions: { pageType: { equals: "branch" } },
                    label: { cs: "Pobočka", en: "Branch" },
                },
                {
                    name: "width",
                    type: "select",
                    defaultValue: "standard",
                    required: true,
                    label: { cs: "Šířka karty", en: "Card width" },
                    options: [
                        {
                            value: "standard",
                            label: { cs: "Běžná (1/3)", en: "Standard (1/3)" },
                        },
                        {
                            value: "wide",
                            label: { cs: "Široká (1/2)", en: "Wide (1/2)" },
                        },
                    ],
                },
                {
                    name: "showOpeningHours",
                    type: "checkbox",
                    defaultValue: true,
                    label: {
                        cs: "Zobrazit provozní dobu",
                        en: "Show opening hours",
                    },
                },
            ],
        },
    ],
};
