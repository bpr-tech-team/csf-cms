import type { Block } from "payload";

import { serviceRichText } from "@/fields/serviceRichText";

export const FeatureRows: Block = {
    slug: "featureRows",
    interfaceName: "FeatureRowsBlock",
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
            name: "heading",
            type: "textarea",
            label: {
                cs: "Nadpis",
                en: "Heading",
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
            label: {
                cs: "Řádky",
                en: "Rows",
            },
            maxRows: 8,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Řádky vlastností",
            en: "Feature rows",
        },
        singular: {
            cs: "Řádky vlastností",
            en: "Feature rows",
        },
    },
};
