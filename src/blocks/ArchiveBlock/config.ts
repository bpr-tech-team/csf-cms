import type { Block } from "payload";

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Archive: Block = {
    slug: "archive",
    interfaceName: "ArchiveBlock",
    fields: [
        {
            name: "introContent",
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
            label: {
                cs: "Úvodní obsah",
                en: "Intro Content",
            },
        },
        {
            name: "populateBy",
            type: "select",
            defaultValue: "collection",
            label: {
                cs: "Naplnit podle",
                en: "Populate by",
            },
            options: [
                {
                    label: {
                        cs: "Kolekce",
                        en: "Collection",
                    },
                    value: "collection",
                },
                {
                    label: {
                        cs: "Ruční výběr",
                        en: "Individual Selection",
                    },
                    value: "selection",
                },
            ],
        },
        {
            name: "relationTo",
            type: "select",
            admin: {
                condition: (_, siblingData) =>
                    siblingData.populateBy === "collection",
            },
            defaultValue: "posts",
            label: {
                cs: "Zobrazené kolekce",
                en: "Collections To Show",
            },
            options: [
                {
                    label: {
                        cs: "Články",
                        en: "Posts",
                    },
                    value: "posts",
                },
            ],
        },
        {
            name: "categories",
            type: "relationship",
            admin: {
                condition: (_, siblingData) =>
                    siblingData.populateBy === "collection",
            },
            hasMany: true,
            label: {
                cs: "Zobrazené kategorie",
                en: "Categories To Show",
            },
            relationTo: "categories",
        },
        {
            name: "limit",
            type: "number",
            admin: {
                condition: (_, siblingData) =>
                    siblingData.populateBy === "collection",
                step: 1,
            },
            defaultValue: 10,
            label: {
                cs: "Limit",
                en: "Limit",
            },
        },
        {
            name: "selectedDocs",
            type: "relationship",
            admin: {
                condition: (_, siblingData) =>
                    siblingData.populateBy === "selection",
            },
            hasMany: true,
            label: {
                cs: "Výběr",
                en: "Selection",
            },
            relationTo: ["posts"],
        },
    ],
    labels: {
        plural: {
            cs: "Archivy",
            en: "Archives",
        },
        singular: {
            cs: "Archiv",
            en: "Archive",
        },
    },
};
