import type { Block } from "payload";

export const BranchDetails: Block = {
    slug: "branchDetails",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/branch-details.webp",
                alt: "Kontakty a mapa pobočky",
            },
        },
    },
    interfaceName: "BranchDetailsBlock",
    labels: {
        singular: {
            cs: "Kontakty a mapa pobočky",
            en: "Branch contacts and map",
        },
        plural: {
            cs: "Kontakty a mapy poboček",
            en: "Branch contacts and maps",
        },
    },
    fields: [
        {
            name: "anchorId",
            type: "text",
            label: { cs: "ID kotvy", en: "Anchor ID" },
        },
        {
            name: "contactHeading",
            type: "text",
            label: { cs: "Nadpis kontaktů", en: "Contact heading" },
            admin: {
                description: {
                    cs: "Výchozí: Kontaktní údaje",
                    en: "Default: Contact details",
                },
            },
        },
        {
            name: "hoursHeading",
            type: "text",
            label: { cs: "Nadpis provozní doby", en: "Opening hours heading" },
            admin: {
                description: {
                    cs: "Výchozí: Provozní doba",
                    en: "Default: Opening hours",
                },
            },
        },
    ],
};
