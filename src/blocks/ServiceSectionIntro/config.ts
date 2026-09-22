import type { Block } from "payload";

export const ServiceSectionIntro: Block = {
    slug: "serviceSectionIntro",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/heading-description.png",
                alt: "Nadpis a popis",
            },
        },
    },
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
            cs: "Nadpisy a popisy",
            en: "Headings and descriptions",
        },
        singular: {
            cs: "Nadpis a popis",
            en: "Heading and description",
        },
    },
};
