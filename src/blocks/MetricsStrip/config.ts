import { blockSpacingFields } from "@/fields/blockSpacing";
import type { Block } from "payload";

export const MetricsStrip: Block = {
    slug: "metricsStrip",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/metrics-strip.webp",
                alt: "Pás metrik",
            },
        },
    },
    interfaceName: "MetricsStripBlock",
    fields: [
        blockSpacingFields(),
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
            labels: {
                singular: { cs: "Metrika", en: "Metric" },
                plural: { cs: "Metriky", en: "Metrics" },
            },
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
                    name: "showDecimals",
                    type: "checkbox",
                    label: {
                        cs: "Zobrazovat desetinná čísla",
                        en: "Show decimal numbers",
                    },
                    defaultValue: false,
                    admin: {
                        description: {
                            cs: "Během animace zobrazí jeden znak za desetinnou čárkou. Na konci se vždy zobrazí původní hodnota.",
                            en: "Show one decimal place during animation. The original value is always displayed at the end.",
                        },
                    },
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
