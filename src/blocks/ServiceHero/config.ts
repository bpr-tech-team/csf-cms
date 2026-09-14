import type { Block } from "payload";

import { linkGroup } from "@/fields/linkGroup";
import { heroBackgroundField } from "@/fields/heroBackground";

export const ServiceHero: Block = {
    slug: "serviceHero",
    interfaceName: "ServiceHeroBlock",
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
            cs: "Úvodní bloky služby",
            en: "Service heroes",
        },
        singular: {
            cs: "Úvodní blok služby",
            en: "Service hero",
        },
    },
};
