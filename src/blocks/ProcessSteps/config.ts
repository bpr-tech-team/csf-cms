import type { Block } from "payload";

import { homepageSectionIntro } from "@/fields/homepageSection";

export const ProcessSteps: Block = {
    slug: "processSteps",
    interfaceName: "ProcessStepsBlock",
    fields: [
        ...homepageSectionIntro({ includeDescription: true }),
        {
            name: "items",
            type: "array",
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: "title",
                    type: "text",
                    label: {
                        cs: "Název kroku",
                        en: "Step title",
                    },
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    label: {
                        cs: "Popis",
                        en: "Description",
                    },
                },
            ],
            label: {
                cs: "Kroky",
                en: "Steps",
            },
            maxRows: 4,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Procesní kroky",
            en: "Process steps",
        },
        singular: {
            cs: "Procesní kroky",
            en: "Process steps",
        },
    },
};
