import type { Field } from "payload";

import { linkGroup } from "@/fields/linkGroup";

export const heroContentFields = (): Field[] => [
    {
        name: "eyebrow",
        type: "text",
        label: {
            cs: "Podtitulek nad nadpisem",
            en: "Subtitle above the title",
        },
    },
    {
        name: "heading",
        type: "textarea",
        label: { cs: "Nadpis", en: "Title" },
        required: true,
    },
    {
        name: "description",
        type: "textarea",
        label: { cs: "Text", en: "Text" },
    },
    linkGroup({
        appearances: ["default", "outline"],
        overrides: { label: { cs: "Tlačítka", en: "Buttons" } },
    }),
];
