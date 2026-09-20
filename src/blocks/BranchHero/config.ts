import type { Block } from "payload";
import { heroBackgroundField } from "@/fields/heroBackground";
import { linkGroup } from "@/fields/linkGroup";

export const BranchHero: Block = {
    slug: "branchHero",
    interfaceName: "BranchHeroBlock",
    labels: {
        singular: { cs: "Úvodní blok pobočky", en: "Branch hero" },
        plural: { cs: "Úvodní bloky poboček", en: "Branch heroes" },
    },
    fields: [
        {
            name: "heading",
            type: "textarea",
            required: true,
            label: { cs: "Nadpis", en: "Heading" },
        },
        {
            name: "description",
            type: "textarea",
            required: true,
            label: { cs: "Popis", en: "Description" },
        },
        heroBackgroundField(),
        linkGroup({ overrides: { maxRows: 2 } }),
    ],
};
