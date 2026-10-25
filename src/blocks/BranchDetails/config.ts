import { blockSpacingFields } from "@/fields/blockSpacing";
import { galleryControlsField } from "@/fields/gallery";
import type { Block } from "payload";

export const BranchDetails: Block = {
    slug: "branchDetails",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/branch-details.webp",
                alt: "Informace o pobočce",
            },
        },
    },
    interfaceName: "BranchDetailsBlock",
    labels: {
        singular: {
            cs: "Informace o pobočce",
            en: "Branch information",
        },
        plural: {
            cs: "Informace o pobočkách",
            en: "Branch information blocks",
        },
    },
    fields: [
        blockSpacingFields(),
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
        galleryControlsField(),
    ],
};
