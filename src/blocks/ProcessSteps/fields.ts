import type { Field } from "payload";

import { blockSpacingFields } from "@/fields/blockSpacing";
import { homepageSectionIntro } from "@/fields/homepageSection";

export const processStepsFields = (): Field[] => [
    blockSpacingFields(),
    ...homepageSectionIntro({ includeDescription: true }),
    {
        name: "items",
        type: "array",
        labels: {
            singular: { cs: "Krok", en: "Step" },
            plural: { cs: "Kroky", en: "Steps" },
        },
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
];
