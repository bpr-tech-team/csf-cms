import { cn } from "@/utilities/ui";

import {
    BranchesMapDot,
    BranchesMapImage,
    getBranchMapPointStyle,
} from "./MapGraphics";
import { branchMapPositions, type BranchMapPosition } from "./positions";
import styles from "./styles.module.css";

export function StaticBranchesMap({
    highlightedPoint,
    className,
    loading = "lazy",
}: {
    highlightedPoint?: BranchMapPosition | null;
    className?: string;
    loading?: "eager" | "lazy";
}) {
    return (
        <div aria-hidden="true" className={cn(styles.map, className)}>
            <BranchesMapImage loading={loading} />
            <div className={styles.points}>
                {(Object.keys(branchMapPositions) as BranchMapPosition[]).map(
                    (position) => (
                        <span
                            className={styles.point}
                            data-highlighted={
                                highlightedPoint === position
                                    ? "true"
                                    : undefined
                            }
                            data-map-point={position}
                            key={position}
                            style={getBranchMapPointStyle(position)}
                        >
                            <BranchesMapDot
                                highlighted={highlightedPoint === position}
                            />
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}
