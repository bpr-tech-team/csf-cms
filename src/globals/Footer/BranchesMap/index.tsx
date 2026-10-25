import type { FooterBranchesMapBlock } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { getBranches } from "@/utilities/getBranches";
import { getPagePath } from "@/utilities/getPagePath";

import { BranchesMap, type BranchMapPoint } from "./Map.client";
import {
    isBranchMapPosition,
    type BranchMapPosition,
} from "@/components/BranchesMap/positions";

export async function FooterBranchesMapBlock({
    block,
    locale,
}: {
    block: FooterBranchesMapBlock;
    locale: AppLocale;
}) {
    const ids = Array.from(
        new Set(
            block.points.flatMap(({ branch }) => {
                const id = typeof branch === "object" ? branch?.id : branch;
                return typeof id === "number" ? [id] : [];
            }),
        ),
    );
    const branches = await getBranches(ids, locale);
    const byId = new Map(branches.map((branch) => [branch.id, branch]));
    const usedPositions = new Set<BranchMapPosition>();
    const points = block.points.flatMap<BranchMapPoint>((point) => {
        const id =
            typeof point.branch === "object" ? point.branch?.id : point.branch;
        const branch = typeof id === "number" ? byId.get(id) : undefined;
        const position = branch?.branchInfo?.mapPosition;
        if (
            !branch?.title?.trim() ||
            !branch.slug?.trim() ||
            typeof position !== "string" ||
            !isBranchMapPosition(position) ||
            usedPositions.has(position)
        ) {
            return [];
        }
        // The first visible branch in the editor's order owns a shared city.
        usedPositions.add(position);

        return [
            {
                position,
                title: branch.title,
                href: getPagePath(branch, locale),
            },
        ];
    });

    if (!points.length) return null;

    return (
        <BranchesMap
            label={locale === "cs" ? "Mapa poboček" : "Branch locations"}
            points={points}
        />
    );
}
