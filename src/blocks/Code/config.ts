import type { Block } from "payload";

export const Code: Block = {
    slug: "code",
    interfaceName: "CodeBlock",
    fields: [
        {
            name: "language",
            type: "select",
            defaultValue: "typescript",
            label: {
                cs: "Jazyk",
                en: "Language",
            },
            options: [
                {
                    label: "TypeScript",
                    value: "typescript",
                },
                {
                    label: "Javascript",
                    value: "javascript",
                },
                {
                    label: "CSS",
                    value: "css",
                },
            ],
        },
        {
            name: "code",
            type: "code",
            label: false,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Kódové bloky",
            en: "Code blocks",
        },
        singular: {
            cs: "Kódový blok",
            en: "Code block",
        },
    },
};
