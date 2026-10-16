import type { ArrayFieldValidation, Block } from "payload";
import { array } from "payload/shared";

import { branchMapPositions } from "./positions";

const validatePoints: ArrayFieldValidation = async (value, options) => {
    const result = await array(value, options);
    if (result !== true || !Array.isArray(value)) return result;

    const positions = new Set<string>();
    const branches = new Set<string>();

    for (const point of value) {
        if (!point || typeof point !== "object") continue;

        const position = "position" in point ? point.position : undefined;
        if (typeof position === "string") {
            if (positions.has(position)) {
                return "Každou pozici na mapě lze použít pouze jednou.";
            }
            positions.add(position);
        }

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
                    cs: "Přiřaďte k pozicím na mapě stránky poboček. Název a odkaz se přebírají ze stránky. Body bez přiřazené zveřejněné pobočky se na webu nezobrazí.",
                    en: "Assign branch pages to map positions. Names and links come from the page. Points without an assigned, published branch are hidden on the website.",
                },
            },
            fields: [
                {
                    name: "position",
                    type: "select",
                    required: true,
                    label: { cs: "Pozice na mapě", en: "Map position" },
                    options: Object.entries(branchMapPositions).map(
                        ([value, { label }]) => ({ value, label }),
                    ),
                },
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
