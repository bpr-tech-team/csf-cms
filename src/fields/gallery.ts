import type { ArrayField, CheckboxField, Field } from "payload";

export const galleryImagesField = ({
    required = true,
    minRows = 2,
}: {
    required?: boolean;
    minRows?: number;
} = {}): ArrayField => ({
    name: "images",
    type: "array",
    required,
    minRows,
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
});

export const galleryControlsField = (): CheckboxField => ({
    name: "showControls",
    type: "checkbox",
    defaultValue: true,
    label: { cs: "Zobrazit ovládání", en: "Show controls" },
    admin: {
        description: {
            cs: "Zobrazí šipky, indikátory a tlačítko zvětšení v běžném náhledu galerie. Po vypnutí lze fotografie dál otevírat kliknutím a posouvat gestem. Ovládání zvětšeného zobrazení zůstává dostupné.",
            en: "Show arrows, indicators and the zoom button in the gallery preview. When hidden, clicking photos and swiping remain available, and enlarged-view controls stay visible.",
        },
    },
});

export const galleryFields = (): Field[] => [
    galleryImagesField(),
    galleryControlsField(),
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
