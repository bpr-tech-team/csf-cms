import type { Block } from "payload";

import { highlightedTextsField } from "@/fields/highlightedTexts";

export const MediaFeatureGrid: Block = {
    slug: "mediaFeatureGrid",
    interfaceName: "MediaFeatureGridBlock",
    fields: [
        {
            name: "anchorId",
            type: "text",
            label: {
                cs: "ID kotvy",
                en: "Anchor ID",
            },
        },
        {
            name: "heading",
            type: "textarea",
            label: {
                cs: "Nadpis",
                en: "Heading",
            },
            required: true,
        },
        highlightedTextsField(),
        {
            name: "description",
            type: "textarea",
            label: {
                cs: "Popis",
                en: "Description",
            },
        },
        {
            name: "items",
            type: "array",
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: "media",
                    type: "upload",
                    admin: {
                        description: {
                            cs: "Obrázek nebo video s ořezem na střed.",
                            en: "An image or video cropped from the center.",
                        },
                    },
                    label: {
                        cs: "Médium",
                        en: "Media",
                    },
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "title",
                    type: "text",
                    label: {
                        cs: "Název vlastnosti",
                        en: "Feature title",
                    },
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    label: {
                        cs: "Popis",
                        en: "Description",
                    },
                    required: true,
                },
            ],
            label: {
                cs: "Vlastnosti",
                en: "Features",
            },
            maxRows: 4,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Mediální přehledy vlastností",
            en: "Media feature grids",
        },
        singular: {
            cs: "Mediální přehled vlastností",
            en: "Media feature grid",
        },
    },
};
