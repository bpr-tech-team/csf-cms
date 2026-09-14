import type { Block } from "payload";

import { linkGroup } from "@/fields/linkGroup";
import { heroBackgroundField } from "@/fields/heroBackground";

export const ComputerHero: Block = {
    slug: "computerHero",
    interfaceName: "ComputerHeroBlock",
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
            cs: "Úvodní bloky stránky počítačů",
            en: "Computer page heroes",
        },
        singular: {
            cs: "Úvodní blok stránky počítačů",
            en: "Computer page hero",
        },
    },
};
