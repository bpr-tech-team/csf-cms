import type { FooterBranchesMapBlock } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { getBranches } from "@/utilities/getBranches";
import { getPagePath } from "@/utilities/getPagePath";

import { BranchesMap, type BranchMapPoint } from "./Map.client";
import { isBranchMapPosition } from "./positions";

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
    const points = block.points.flatMap<BranchMapPoint>((point) => {
        const id =
            typeof point.branch === "object" ? point.branch?.id : point.branch;
        const branch = typeof id === "number" ? byId.get(id) : undefined;
        if (
            !branch?.title?.trim() ||
            !branch.slug?.trim() ||
            !isBranchMapPosition(point.position)
        ) {
            return [];
        }

        return [
            {
                position: point.position,
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
