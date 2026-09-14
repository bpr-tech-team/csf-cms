import type { Block } from "payload";

import { linkGroup } from "@/fields/linkGroup";
import { heroBackgroundField } from "@/fields/heroBackground";

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
        heroBackgroundField(),
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
