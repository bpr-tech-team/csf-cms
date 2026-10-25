import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/utilities/ui";

import {
    branchMapPositions,
    branchMapSize,
    type BranchMapPosition,
} from "./positions";
import styles from "./styles.module.css";

export function BranchesMapImage({
    loading = "lazy",
}: {
    loading?: "eager" | "lazy";
}) {
    return (
        <Image
            alt=""
            className={styles.background}
            draggable={false}
            height={branchMapSize.height}
            loading={loading}
            src="/footer/footer-map.svg"
            unoptimized
            width={branchMapSize.width}
        />
    );
}

export function BranchesMapDot({
    highlighted = false,
}: {
    highlighted?: boolean;
}) {
    return (
        <span
            aria-hidden="true"
            className={cn(styles.dot, highlighted && styles.highlighted)}
        />
    );
}

export function getBranchMapPointStyle(
    position: BranchMapPosition,
): CSSProperties {
    const { x, y } = branchMapPositions[position];
    const left = (x / branchMapSize.width) * 100;

    return {
        left: `${left}%`,
        top: `${(y / branchMapSize.height) * 100}%`,
        "--point-x": `${left}cqw`,
    } as CSSProperties;
}
