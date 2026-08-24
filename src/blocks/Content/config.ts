import type { Block, Field } from "payload";

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "@/fields/link";

const columnFields: Field[] = [
    {
        name: "size",
        type: "select",
        defaultValue: "oneThird",
        label: {
            cs: "Šířka",
            en: "Size",
        },
        options: [
            {
                label: {
                    cs: "Jedna třetina",
                    en: "One Third",
                },
                value: "oneThird",
            },
            {
                label: {
                    cs: "Polovina",
                    en: "Half",
                },
                value: "half",
            },
            {
                label: {
                    cs: "Dvě třetiny",
                    en: "Two Thirds",
                },
                value: "twoThirds",
            },
            {
                label: {
                    cs: "Celá šířka",
                    en: "Full",
                },
                value: "full",
            },
        ],
    },
    {
        name: "richText",
        type: "richText",
        editor: lexicalEditor({
            features: ({ rootFeatures }) => {
                return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                ];
            },
        }),
        label: false,
    },
    {
        name: "enableLink",
        type: "checkbox",
        label: {
            cs: "Povolit odkaz",
            en: "Enable link",
        },
    },
    link({
        overrides: {
            admin: {
                condition: (_data, siblingData) => {
                    return Boolean(siblingData?.enableLink);
                },
            },
        },
    }),
];

export const Content: Block = {
    slug: "content",
    interfaceName: "ContentBlock",
    fields: [
        {
            name: "columns",
            type: "array",
            admin: {
                initCollapsed: true,
            },
            fields: columnFields,
            label: {
                cs: "Sloupce",
                en: "Columns",
            },
        },
    ],
    labels: {
        plural: {
            cs: "Obsahové bloky",
            en: "Content blocks",
        },
        singular: {
            cs: "Obsahový blok",
            en: "Content block",
        },
    },
};
