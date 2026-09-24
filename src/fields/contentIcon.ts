import type { GroupField, TextFieldSingleValidation } from "payload";
import { hasFontAwesomeIcon } from "@/utilities/fontAwesome.server";

export const contentIcon = ({
    required = false,
    label = { cs: "Ikona", en: "Icon" },
}: {
    required?: boolean;
    label?: GroupField["label"];
} = {}): GroupField => ({
    name: "icon",
    type: "group",
    interfaceName: "ContentIcon",
    label,
    fields: [
        {
            name: "source",
            type: "select",
            defaultValue: "image",
            required: true,
            label: { cs: "Zdroj ikony", en: "Icon source" },
            options: [
                { label: { cs: "Obrázek", en: "Image" }, value: "image" },
                { label: "Font Awesome Free", value: "fontawesome" },
            ],
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required,
            label: { cs: "Obrázek ikony", en: "Icon image" },
            filterOptions: { mimeType: { contains: "image/" } },
            admin: {
                condition: (_, siblingData) => siblingData?.source === "image",
                description: {
                    cs: "SVG nebo PNG bez pozadí a zbytečných průhledných okrajů. Podklad a velikost určuje blok.",
                    en: "SVG or PNG without a background or excess transparent padding. The block controls the size and background.",
                },
            },
        },
        {
            name: "fontAwesome",
            type: "text",
            required,
            label: { cs: "Ikona Font Awesome", en: "Font Awesome icon" },
            admin: {
                condition: (_, siblingData) =>
                    siblingData?.source === "fontawesome",
                components: {
                    Field: "@/fields/ContentIcon/FontAwesomePicker#FontAwesomePicker",
                },
            },
            validate: ((value, { siblingData }) => {
                if (
                    (siblingData as { source?: string })?.source !==
                    "fontawesome"
                )
                    return true;
                if (!value)
                    return !required || "Vyberte ikonu / Select an icon.";
                return (
                    hasFontAwesomeIcon(value) ||
                    "Vyberte platnou bezplatnou ikonu / Select a valid free icon."
                );
            }) as TextFieldSingleValidation,
        },
        {
            name: "imageColor",
            type: "select",
            defaultValue: "original",
            label: { cs: "Barvy obrázku", en: "Image colors" },
            admin: {
                condition: (_, siblingData) => siblingData?.source === "image",
            },
            options: [
                {
                    label: {
                        cs: "Zachovat původní barvy",
                        en: "Keep original colors",
                    },
                    value: "original",
                },
                {
                    label: { cs: "Jednobarevná ikona", en: "Monochrome icon" },
                    value: "monochrome",
                },
            ],
        },
        {
            type: "collapsible",
            label: { cs: "Pokročilé nastavení", en: "Advanced settings" },
            admin: { initCollapsed: true },
            fields: [
                {
                    name: "scale",
                    type: "number",
                    defaultValue: 100,
                    min: 75,
                    max: 125,
                    label: {
                        cs: "Velikost kresby (%)",
                        en: "Artwork scale (%)",
                    },
                    admin: {
                        description: {
                            cs: "Pouze pro optické dorovnání. Velikost prostoru ikony se nemění.",
                            en: "Optical correction only. The icon slot stays the same size.",
                        },
                    },
                },
            ],
        },
        {
            name: "preview",
            type: "ui",
            admin: {
                components: {
                    Field: "@/fields/ContentIcon/Preview#IconPreview",
                },
            },
        },
    ],
});
