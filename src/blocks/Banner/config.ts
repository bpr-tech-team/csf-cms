import type { Block } from "payload";

import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Banner: Block = {
    slug: "banner",
    fields: [
        {
            name: "style",
            type: "select",
            defaultValue: "info",
            label: {
                cs: "Styl",
                en: "Style",
            },
            options: [
                {
                    label: {
                        cs: "Info",
                        en: "Info",
                    },
                    value: "info",
                },
                {
                    label: {
                        cs: "Varování",
                        en: "Warning",
                    },
                    value: "warning",
                },
                {
                    label: {
                        cs: "Chyba",
                        en: "Error",
                    },
                    value: "error",
                },
                {
                    label: {
                        cs: "Úspěch",
                        en: "Success",
                    },
                    value: "success",
                },
            ],
            required: true,
        },
        {
            name: "content",
            type: "richText",
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ];
                },
            }),
            label: false,
            required: true,
        },
    ],
    interfaceName: "BannerBlock",
    labels: {
        plural: {
            cs: "Bannery",
            en: "Banners",
        },
        singular: {
            cs: "Banner",
            en: "Banner",
        },
    },
};
