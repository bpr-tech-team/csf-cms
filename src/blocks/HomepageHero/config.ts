import type { Block } from "payload";
import { linkGroup } from "@/fields/linkGroup";

export const HomepageHero: Block = {
    slug: "homepageHero",
    interfaceName: "HomepageHeroBlock",
    labels: { singular: "Homepage hero", plural: "Homepage hero" },
    fields: [
        {
            name: "slides",
            type: "array",
            admin: {
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
                condition: (_, { autoplay } = {}) => Boolean(autoplay),
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
};
