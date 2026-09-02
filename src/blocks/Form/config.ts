import type { Block } from "payload";

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const FormBlock: Block = {
    slug: "formBlock",
    interfaceName: "FormBlock",
    fields: [
        {
            name: "appearance",
            type: "select",
            defaultValue: "default",
            label: {
                cs: "Vzhled",
                en: "Appearance",
            },
            options: [
                {
                    label: {
                        cs: "Výchozí",
                        en: "Default",
                    },
                    value: "default",
                },
                {
                    label: {
                        cs: "Tmavý blok domovské stránky",
                        en: "Homepage dark",
                    },
                    value: "homepageDark",
                },
            ],
        },
        {
            name: "eyebrow",
            type: "text",
            admin: {
                condition: (_, { appearance } = {}) =>
                    appearance === "homepageDark",
            },
            label: {
                cs: "Nadpis sekce",
                en: "Eyebrow",
            },
        },
        {
            name: "form",
            type: "relationship",
            label: {
                cs: "Formulář",
                en: "Form",
            },
            relationTo: "forms",
            required: true,
        },
        {
            name: "enableIntro",
            type: "checkbox",
            label: {
                cs: "Povolit úvodní obsah",
                en: "Enable Intro Content",
            },
        },
        {
            name: "introContent",
            type: "richText",
            admin: {
                condition: (_, { enableIntro }) => Boolean(enableIntro),
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
            label: {
                cs: "Úvodní obsah",
                en: "Intro Content",
            },
        },
    ],
    graphQL: {
        singularName: "FormBlock",
    },
    labels: {
        plural: {
            cs: "Formulářové bloky",
            en: "Form Blocks",
        },
        singular: {
            cs: "Formulářový blok",
            en: "Form Block",
        },
    },
};
