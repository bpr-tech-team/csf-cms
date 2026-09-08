import type { Block } from "payload";

import { highlightedTextsField } from "@/fields/highlightedTexts";

export const TechnologySpotlight: Block = {
    slug: "technologySpotlight",
    interfaceName: "TechnologySpotlightBlock",
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
            name: "logos",
            type: "array",
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: "logo",
                    type: "upload",
                    label: {
                        cs: "Logo",
                        en: "Logo",
                    },
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "name",
                    type: "text",
                    label: {
                        cs: "Název technologie",
                        en: "Technology name",
                    },
                    required: true,
                },
            ],
            label: {
                cs: "Technologie",
                en: "Technologies",
            },
            maxRows: 4,
            minRows: 1,
            required: true,
        },
        {
            name: "supportingMedia",
            type: "upload",
            label: {
                cs: "Doplňkové médium",
                en: "Supporting media",
            },
            relationTo: "media",
        },
    ],
    labels: {
        plural: {
            cs: "Technologické akcenty",
            en: "Technology spotlights",
        },
        singular: {
            cs: "Technologický akcent",
            en: "Technology spotlight",
        },
    },
};
