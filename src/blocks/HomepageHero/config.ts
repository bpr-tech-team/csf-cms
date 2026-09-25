import { contentIcon } from "@/fields/contentIcon";
import type { Block } from "payload";
import { highlightedTextsField } from "@/fields/highlightedTexts";
import { heroBackgroundField } from "@/fields/heroBackground";
import { heroContentFields } from "@/fields/heroContent";
import { linkGroup } from "@/fields/linkGroup";

export const HomepageHero: Block = {
    slug: "homepageHero",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/homepage.hero.webp",
                alt: "Úvodní blok domovské stránky",
            },
        },
    },
    interfaceName: "HomepageHeroBlock",
    labels: {
        singular: { cs: "Úvodní blok domovské stránky", en: "Homepage hero" },
        plural: { cs: "Úvodní bloky domovské stránky", en: "Homepage heroes" },
    },
    fields: [
        heroBackgroundField(false),
        {
            name: "slides",
            type: "array",
            labels: {
                singular: { cs: "Snímek", en: "Slide" },
                plural: { cs: "Snímky", en: "Slides" },
            },
            admin: {
                initCollapsed: true,
            },
            fields: heroContentFields(),
            label: {
                cs: "Snímky úvodní sekce",
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
                cs: "Úvod rychlých odkazů",
                en: "Quick links intro",
            },
        },
        {
            name: "quickLinks",
            type: "array",
            labels: {
                singular: { cs: "Rychlý odkaz", en: "Quick link" },
                plural: { cs: "Rychlé odkazy", en: "Quick links" },
            },
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
                contentIcon({ required: true }),
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
