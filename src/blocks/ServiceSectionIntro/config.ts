import type { Block } from "payload";

export const ServiceSectionIntro: Block = {
    slug: "serviceSectionIntro",
    interfaceName: "ServiceSectionIntroBlock",
    fields: [
        {
            name: "anchorId",
            type: "text",
            admin: {
                description: {
                    cs: "Volitelné ID pro odkazy, například it-outsourcing.",
                    en: "Optional link target, for example it-outsourcing.",
                },
            },
            label: {
                cs: "ID kotvy",
                en: "Anchor ID",
            },
        },
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
    ],
    labels: {
        plural: {
            cs: "Úvody sekcí služby",
            en: "Service section intros",
        },
        singular: {
            cs: "Úvod sekce služby",
            en: "Service section intro",
        },
    },
};
