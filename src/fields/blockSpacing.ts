import type { RowField, SelectField } from "payload";

export const blockSpacingFields = (): RowField => {
    const field = (name: string, label: SelectField["label"]): SelectField => ({
        name,
        type: "select",
        label,
        defaultValue: "auto",
        admin: {
            width: "50%",
            description: {
                cs: "Automaticky zohledňuje sousední bloky. Ruční volba upraví pouze tuto stranu bloku.",
                en: "Auto takes adjacent blocks into account. A manual choice changes only this side of the block.",
            },
        },
        options: [
            { label: { cs: "Automaticky", en: "Auto" }, value: "auto" },
            { label: { cs: "Bez odstupu", en: "None" }, value: "none" },
            { label: { cs: "Kompaktní", en: "Compact" }, value: "compact" },
            { label: { cs: "Běžný", en: "Normal" }, value: "normal" },
            { label: { cs: "Velký", en: "Large" }, value: "large" },
        ],
    });

    return {
        type: "row",
        fields: [
            field("spacingTop", { cs: "Horní odstup", en: "Top spacing" }),
            field("spacingBottom", {
                cs: "Dolní odstup",
                en: "Bottom spacing",
            }),
        ],
    };
};
