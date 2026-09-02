import type { Block } from "payload";

import { link } from "@/fields/link";

export const CenteredCTA: Block = {
    slug: "centeredCta",
    interfaceName: "CenteredCtaBlock",
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
        link({ appearances: ["default"] }),
        {
            name: "backgroundMedia",
            type: "upload",
            admin: {
                description: {
                    cs: "Volitelná dekorativní vrstva za obsahem.",
                    en: "Optional decorative layer behind the content.",
                },
            },
            label: {
                cs: "Dekorativní pozadí",
                en: "Decorative background",
            },
            relationTo: "media",
        },
    ],
    labels: {
        plural: {
            cs: "Centrované výzvy k akci",
            en: "Centered calls to action",
        },
        singular: {
            cs: "Centrovaná výzva k akci",
            en: "Centered call to action",
        },
    },
};
