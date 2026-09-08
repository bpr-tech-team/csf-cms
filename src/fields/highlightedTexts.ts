import type { ArrayField, Condition } from "payload";

type HighlightedTextsFieldOptions = {
    condition?: Condition;
    dbName?: string;
};

export const highlightedTextsField = ({
    condition,
    dbName,
}: HighlightedTextsFieldOptions = {}): ArrayField => ({
    name: "highlightedTexts",
    type: "array",
    dbName,
    admin: {
        condition,
        description: {
            cs: "Každý řádek obsahuje přesnou část nadpisu zvýrazněnou zeleně. Zvýrazní se všechna nalezená opakování.",
            en: "Each row contains an exact heading fragment highlighted in green. Every matching occurrence is highlighted.",
        },
        initCollapsed: true,
    },
    fields: [
        {
            name: "text",
            type: "text",
            label: {
                cs: "Text",
                en: "Text",
            },
            required: true,
        },
    ],
    label: {
        cs: "Zvýrazněné části",
        en: "Highlighted fragments",
    },
    labels: {
        plural: {
            cs: "Zvýrazněné části",
            en: "Highlighted fragments",
        },
        singular: {
            cs: "Zvýrazněná část",
            en: "Highlighted fragment",
        },
    },
    maxRows: 8,
});
