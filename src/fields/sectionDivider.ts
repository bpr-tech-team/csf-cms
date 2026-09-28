import type { RadioField } from "payload";

export const sectionDividerField = (
    defaultValue: "none" | "line",
): RadioField => ({
    name: "divider",
    type: "radio",
    defaultValue,
    label: { cs: "Oddělovač", en: "Divider" },
    admin: {
        layout: "horizontal",
        description: {
            cs: "Zelená linka za nadpisem a úvodem, od levého okraje obsahu až k pravému okraji obrazovky.",
            en: "A green line after the heading and introduction, from the content's left edge to the screen's right edge.",
        },
    },
    options: [
        {
            label: { cs: "Bez oddělovače", en: "Without divider" },
            value: "none",
        },
        { label: { cs: "S oddělovačem", en: "With divider" }, value: "line" },
    ],
});
