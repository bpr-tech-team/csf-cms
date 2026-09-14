import type { UploadField } from "payload";

export const heroBackgroundField = (required = true): UploadField => ({
    name: "backgroundMedia",
    type: "upload",
    relationTo: "media",
    required,
    filterOptions: {
        mimeType: { contains: "image/" },
    },
    label: {
        cs: "Obrázek na pozadí",
        en: "Background image",
    },
    admin: {
        description: {
            cs: "Obrázek bez barevného přechodu se zobrazí přes celou plochu s ořezem na střed. Přechod a ztmavení se přidají automaticky.",
            en: "Upload an image without a gradient. It fills the hero and is cropped from the center; the gradient and shading are added automatically.",
        },
    },
});
