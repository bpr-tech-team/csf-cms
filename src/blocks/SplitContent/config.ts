import type { Block } from "payload";

import { highlightedTextsField } from "@/fields/highlightedTexts";
import { serviceRichText } from "@/fields/serviceRichText";

export const SplitContent: Block = {
    slug: "splitContent",
    interfaceName: "SplitContentBlock",
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
            name: "theme",
            type: "select",
            defaultValue: "light",
            label: {
                cs: "Barevné téma",
                en: "Color theme",
            },
            options: [
                {
                    label: {
                        cs: "Světlé",
                        en: "Light",
                    },
                    value: "light",
                },
                {
                    label: {
                        cs: "Tmavé",
                        en: "Dark",
                    },
                    value: "dark",
                },
            ],
            required: true,
        },
        {
            name: "sectionHeading",
            type: "textarea",
            label: {
                cs: "Nadpis celého bloku",
                en: "Section heading",
            },
        },
        highlightedTextsField({
            condition: (_, { sectionHeading } = {}) => Boolean(sectionHeading),
        }),
        {
            name: "heading",
            type: "textarea",
            label: {
                cs: "Nadpis obsahu",
                en: "Content heading",
            },
            required: true,
        },
        {
            name: "richText",
            type: "richText",
            editor: serviceRichText,
            label: {
                cs: "Obsah",
                en: "Content",
            },
            required: true,
        },
        {
            name: "media",
            type: "upload",
            admin: {
                description: {
                    cs: "Médium vyplní plochu s ořezem a vystředěním.",
                    en: "The media fills its area with centered cropping.",
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
            name: "mediaPosition",
            type: "select",
            defaultValue: "right",
            label: {
                cs: "Pozice média",
                en: "Media position",
            },
            options: [
                {
                    label: {
                        cs: "Vlevo",
                        en: "Left",
                    },
                    value: "left",
                },
                {
                    label: {
                        cs: "Vpravo",
                        en: "Right",
                    },
                    value: "right",
                },
            ],
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Dvousloupcové obsahové bloky",
            en: "Split content blocks",
        },
        singular: {
            cs: "Dvousloupcový obsahový blok",
            en: "Split content block",
        },
    },
};
