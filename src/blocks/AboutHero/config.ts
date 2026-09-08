import type { Block } from "payload";

import { linkGroup } from "@/fields/linkGroup";

export const AboutHero: Block = {
    slug: "aboutHero",
    interfaceName: "AboutHeroBlock",
    fields: [
        {
            name: "heading",
            type: "textarea",
            label: {
                cs: "Nadpis",
                en: "Heading",
            },
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            label: {
                cs: "Popis",
                en: "Description",
            },
            required: true,
        },
        linkGroup({
            overrides: {
                maxRows: 2,
            },
        }),
        {
            name: "backgroundMedia",
            type: "upload",
            admin: {
                description: {
                    cs: "Obrázek se zobrazí přes celou plochu s ořezem na střed.",
                    en: "The image fills the hero and is cropped from the center.",
                },
            },
            label: {
                cs: "Obrázek na pozadí",
                en: "Background image",
            },
            relationTo: "media",
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Úvodní bloky stránky O nás",
            en: "About page heroes",
        },
        singular: {
            cs: "Úvodní blok stránky O nás",
            en: "About page hero",
        },
    },
};
