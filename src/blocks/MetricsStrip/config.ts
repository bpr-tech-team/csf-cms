import type { Block } from "payload";

export const MetricsStrip: Block = {
    slug: "metricsStrip",
    interfaceName: "MetricsStripBlock",
    fields: [
        {
            name: "heading",
            type: "text",
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
                    name: "prefix",
                    type: "text",
                    label: {
                        cs: "Předpona",
                        en: "Prefix",
                    },
                },
                {
                    name: "value",
                    type: "number",
                    label: {
                        cs: "Hodnota",
                        en: "Value",
                    },
                    required: true,
                },
                {
                    name: "suffix",
                    type: "text",
                    label: {
                        cs: "Přípona",
                        en: "Suffix",
                    },
                },
                {
                    name: "label",
                    type: "text",
                    label: {
                        cs: "Popisek",
                        en: "Label",
                    },
                    required: true,
                },
            ],
            label: {
                cs: "Metriky",
                en: "Metrics",
            },
            maxRows: 4,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Pásy metrik",
            en: "Metric strips",
        },
        singular: {
            cs: "Pás metrik",
            en: "Metrics strip",
        },
    },
};
