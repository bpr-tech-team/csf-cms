import type { Block } from "payload";

export const LogoMarquee: Block = {
    slug: "logoMarquee",
    interfaceName: "LogoMarqueeBlock",
    fields: [
        {
            name: "eyebrow",
            type: "text",
            label: {
                cs: "Nadpis sekce",
                en: "Eyebrow",
            },
            required: true,
        },
        {
            name: "items",
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
                        cs: "Název partnera",
                        en: "Partner name",
                    },
                    required: true,
                },
                {
                    name: "url",
                    type: "text",
                    label: {
                        cs: "URL partnera",
                        en: "Partner URL",
                    },
                },
            ],
            label: {
                cs: "Partneři",
                en: "Partners",
            },
            maxRows: 20,
            minRows: 1,
            required: true,
        },
        {
            name: "duration",
            type: "number",
            admin: {
                description: {
                    cs: "Délka jednoho průchodu v sekundách.",
                    en: "Duration of one complete pass in seconds.",
                },
            },
            defaultValue: 40,
            label: {
                cs: "Délka animace",
                en: "Animation duration",
            },
            max: 120,
            min: 10,
            required: true,
        },
        {
            name: "pauseOnHover",
            type: "checkbox",
            defaultValue: true,
            label: {
                cs: "Pozastavit při najetí",
                en: "Pause on hover",
            },
        },
    ],
    labels: {
        plural: {
            cs: "Pásy log partnerů",
            en: "Logo marquees",
        },
        singular: {
            cs: "Pás log partnerů",
            en: "Logo marquee",
        },
    },
};
