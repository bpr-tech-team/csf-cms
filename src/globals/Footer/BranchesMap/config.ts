import type { ArrayFieldValidation, Block } from "payload";
import { array } from "payload/shared";

const validatePoints: ArrayFieldValidation = async (value, options) => {
    const result = await array(value, options);
    if (result !== true || !Array.isArray(value)) return result;

    const branches = new Set<string>();

    for (const point of value) {
        if (!point || typeof point !== "object") continue;

        const relation = "branch" in point ? point.branch : undefined;
        const branch =
            relation && typeof relation === "object" && "id" in relation
                ? relation.id
                : relation;
        if (typeof branch === "number" || typeof branch === "string") {
            const id = String(branch);
            if (branches.has(id)) {
                return "Každou pobočku lze na mapu přidat pouze jednou.";
            }
            branches.add(id);
        }
    }

    return true;
};

export const FooterBranchesMap: Block = {
    slug: "footerBranchesMap",
    interfaceName: "FooterBranchesMapBlock",
    labels: {
        singular: { cs: "Mapa poboček", en: "Branches map" },
        plural: { cs: "Mapy poboček", en: "Branch maps" },
    },
    fields: [
        {
            name: "points",
            type: "array",
            required: true,
            minRows: 1,
            maxRows: 5,
            label: { cs: "Body na mapě", en: "Map points" },
            labels: {
                singular: { cs: "Bod", en: "Point" },
                plural: { cs: "Body", en: "Points" },
            },
            validate: validatePoints,
            admin: {
                description: {
                    cs: "Vyberte pobočky a jejich pořadí. Pozice na mapě, název a odkaz se přebírají ze stránky pobočky. Nezveřejněné pobočky a pobočky bez pozice na mapě se nezobrazí.",
                    en: "Choose branches and their order. Map positions, names and links come from each branch page. Unpublished branches and branches without a map position are hidden.",
                },
            },
            fields: [
                {
                    name: "branch",
                    type: "relationship",
                    relationTo: "pages",
                    // A deleted branch clears this relation without blocking deletion.
                    maxDepth: 0,
                    filterOptions: { pageType: { equals: "branch" } },
                    label: { cs: "Stránka pobočky", en: "Branch page" },
                },
            ],
        },
    ],
};
