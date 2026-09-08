import type { Block } from "payload";

import { highlightedTextsField } from "@/fields/highlightedTexts";

export const ComputerAudience: Block = {
    slug: "computerAudience",
    interfaceName: "ComputerAudienceBlock",
    fields: [
        {
            name: "anchorId",
            type: "text",
            admin: {
                description: {
                    cs: "Volitelné ID pro odkaz na blok.",
                    en: "Optional link target for the block.",
                },
            },
            label: {
                cs: "ID kotvy",
                en: "Anchor ID",
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
                    name: "title",
                    type: "text",
                    label: {
                        cs: "Název cílové skupiny",
                        en: "Audience title",
                    },
                    required: true,
                },
                {
                    name: "summary",
                    type: "textarea",
                    label: {
                        cs: "Krátký popis v záložce",
                        en: "Tab summary",
                    },
                    required: true,
                },
                {
                    name: "heading",
                    type: "textarea",
                    label: {
                        cs: "Nadpis obsahu",
                        en: "Content heading",
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
                    required: true,
                },
            ],
            label: {
                cs: "Cílové skupiny",
                en: "Audiences",
            },
            maxRows: 8,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Přepínače cílových skupin",
            en: "Audience selectors",
        },
        singular: {
            cs: "Přepínač cílových skupin",
            en: "Audience selector",
        },
    },
};
