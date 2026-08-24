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
            ],
            required: true,
        },
        {
            name: "richText",
            type: "richText",
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
    ],
    label: false,
    localized: true,
};
