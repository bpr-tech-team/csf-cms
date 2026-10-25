import type { UploadField } from "payload";
import { upload } from "payload/shared";
import type { Page } from "@/payload-types";

export const heroBackgroundField = (
    required = true,
    { excludeBranches = false }: { excludeBranches?: boolean } = {},
): UploadField => ({
    name: "backgroundMedia",
    type: "upload",
    relationTo: "media",
    // Branch heroes use the map, so generated types must allow an absent image.
    required: required && !excludeBranches,
    ...(excludeBranches && {
        validate: (value, options) =>
            upload(value, {
                ...options,
                required:
                    required &&
                    (options.data as Partial<Page>)?.pageType !== "branch",
            }),
    }),
    filterOptions: {
        mimeType: { contains: "image/" },
    },
    label: {
        cs: "Obrázek na pozadí",
        en: "Background image",
    },
    admin: {
        ...(excludeBranches && {
            condition: (data) => data?.pageType !== "branch",
        }),
        description: {
            cs: "Obrázek bez barevného přechodu se zobrazí přes celou plochu s ořezem na střed. Přechod a ztmavení se přidají automaticky.",
            en: "Upload an image without a gradient. It fills the hero and is cropped from the center; the gradient and shading are added automatically.",
        },
    },
});
