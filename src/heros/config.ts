import type { Field } from "payload";

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "@/fields/linkGroup";

export const hero: Field = {
    name: "hero",
    type: "group",
    fields: [
        {
            name: "type",
            type: "select",
            defaultValue: "lowImpact",
            label: {
                cs: "Typ",
                en: "Type",
            },
            options: [
                {
                    label: {
                        cs: "Žádný",
                        en: "None",
                    },
                    value: "none",
                },
                {
                    label: {
                        cs: "Výrazný",
                        en: "High Impact",
                    },
                    value: "highImpact",
                },
                {
                    label: {
                        cs: "Střední",
                        en: "Medium Impact",
                    },
                    value: "mediumImpact",
                },
                {
                    label: {
                        cs: "Nízký",
                        en: "Low Impact",
                    },
                    value: "lowImpact",
                },
                {
                    label: {
                        cs: "Domovská stránka",
                        en: "Homepage",
                    },
                    value: "homepage",
                },
                {
                    label: {
                        cs: "O nás",
                        en: "About",
                    },
                    value: "about",
                },
            ],
            required: true,
        },
        {
            name: "richText",
            type: "richText",
            admin: {
                condition: (_, { type } = {}) => type !== "homepage",
            },
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        HeadingFeature({
                            enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                        }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ];
                },
            }),
            label: false,
        },
        linkGroup({
            overrides: {
                admin: {
                    condition: (_, { type } = {}) => type !== "homepage",
                },
                maxRows: 2,
            },
        }),
        {
            name: "media",
            type: "upload",
            admin: {
                condition: (_, { type } = {}) =>
                    ["highImpact", "mediumImpact"].includes(type),
            },
            label: {
                cs: "Médium",
                en: "Media",
            },
            relationTo: "media",
            required: true,
        },
        {
            name: "slides",
            type: "array",
            admin: {
                condition: (_, { type } = {}) => type === "homepage",
                initCollapsed: true,
            },
            fields: [
                {
                    name: "heading",
                    type: "textarea",
                    label: {
                        cs: "Nadpis",
                        en: "Heading",
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
                linkGroup({
                    overrides: {
                        maxRows: 2,
                    },
                }),
            ],
            label: {
                cs: "Snímky hero sekce",
                en: "Hero slides",
            },
            maxRows: 5,
            minRows: 1,
        },
        {
            name: "autoplay",
            type: "checkbox",
            admin: {
                condition: (_, { type } = {}) => type === "homepage",
            },
            defaultValue: true,
            label: {
                cs: "Automaticky přepínat snímky",
                en: "Autoplay slides",
            },
        },
        {
            name: "autoplayInterval",
            type: "number",
            admin: {
                condition: (_, { autoplay, type } = {}) =>
                    type === "homepage" && Boolean(autoplay),
                description: {
                    cs: "Čas mezi snímky v milisekundách.",
                    en: "Time between slides in milliseconds.",
                },
            },
            defaultValue: 7000,
            label: {
                cs: "Interval automatického přepínání",
                en: "Autoplay interval",
            },
            max: 20000,
            min: 3000,
        },
        {
            name: "intro",
            type: "group",
            admin: {
                condition: (_, { type } = {}) => type === "homepage",
            },
            fields: [
                {
                    name: "eyebrow",
                    type: "text",
                    label: {
                        cs: "Nadpis sekce",
                        en: "Eyebrow",
                    },
                },
                {
                    name: "heading",
                    type: "textarea",
                    label: {
                        cs: "Hlavní nadpis",
                        en: "Heading",
                    },
                    required: true,
                },
                {
                    name: "highlightedText",
                    type: "text",
                    label: {
                        cs: "Zvýrazněný text",
                        en: "Highlighted text",
                    },
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
                cs: "Úvod rychlých odkazů",
                en: "Quick links intro",
            },
        },
        {
            name: "quickLinks",
            type: "array",
            admin: {
                condition: (_, { type } = {}) => type === "homepage",
                initCollapsed: true,
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    label: {
                        cs: "Obrázek",
                        en: "Image",
                    },
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "icon",
                    type: "upload",
                    label: {
                        cs: "Ikona",
                        en: "Icon",
                    },
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "title",
                    type: "text",
                    label: {
                        cs: "Název",
                        en: "Title",
                    },
                    required: true,
                },
                linkGroup({
                    appearances: false,
                    overrides: {
                        maxRows: 1,
                    },
                }),
            ],
            label: {
                cs: "Rychlé odkazy",
                en: "Quick links",
            },
            maxRows: 3,
            minRows: 3,
        },
    ],
    label: false,
    localized: true,
};
