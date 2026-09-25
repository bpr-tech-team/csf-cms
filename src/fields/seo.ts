import type { Field } from "payload";
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const seoFields = (): Field[] => {
    const image = MetaImageField({
        relationTo: "media",
        overrides: { label: { cs: "Obrázek pro sdílení", en: "Meta image" } },
    });
    image.admin = {
        ...image.admin,
        description: {
            cs: "Doporučená velikost obrázku je méně než 500 kB.",
            en: "Recommended image file size is less than 500 kB.",
        },
    };

    return [
        OverviewField({
            titlePath: "meta.title",
            descriptionPath: "meta.description",
            imagePath: "meta.image",
            overrides: { label: { cs: "Přehled", en: "Overview" } },
        }),
        MetaTitleField({
            hasGenerateFn: true,
            overrides: { label: { cs: "Název", en: "Title" } },
        }),
        image,
        MetaDescriptionField({
            overrides: { label: { cs: "Popis", en: "Description" } },
        }),
        PreviewField({
            hasGenerateFn: true,
            titlePath: "meta.title",
            descriptionPath: "meta.description",
            overrides: { label: { cs: "Náhled", en: "Preview" } },
        }),
    ];
};
