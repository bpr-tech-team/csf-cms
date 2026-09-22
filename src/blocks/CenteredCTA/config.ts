import type { Block } from "payload";

import { link } from "@/fields/link";

export const CenteredCTA: Block = {
    slug: "centeredCta",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/cta.webp",
                alt: "Výzva k akci",
            },
        },
    },
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
            cs: "Výzvy k akci",
            en: "Calls to Action",
        },
        singular: {
            cs: "Výzva k akci",
            en: "Call to Action",
        },
    },
};
