import type { Field } from "payload";

export const galleryFields = (): Field[] => [
    {
        name: "images",
        type: "array",
        required: true,
        minRows: 2,
        label: { cs: "Obrázky", en: "Images" },
        labels: {
            singular: { cs: "Obrázek", en: "Image" },
            plural: { cs: "Obrázky", en: "Images" },
        },
        fields: [
            {
                name: "image",
                type: "upload",
                relationTo: "media",
                required: true,
                filterOptions: { mimeType: { contains: "image/" } },
                label: { cs: "Obrázek", en: "Image" },
            },
        ],
    },
    {
        name: "autoplay",
        type: "checkbox",
        defaultValue: true,
        label: { cs: "Automatické přehrávání", en: "Autoplay" },
    },
    {
        name: "autoplayInterval",
        type: "number",
        defaultValue: 3,
        min: 1,
        required: true,
        label: {
            cs: "Interval přehrávání (sekundy)",
            en: "Autoplay interval (seconds)",
        },
        admin: {
            condition: (_, siblingData) => Boolean(siblingData?.autoplay),
            step: 1,
        },
    },
];
