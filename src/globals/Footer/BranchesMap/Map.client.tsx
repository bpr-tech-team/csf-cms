"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
    BranchesMapDot,
    BranchesMapImage,
    getBranchMapPointStyle,
} from "@/components/BranchesMap/MapGraphics";
import type { BranchMapPosition } from "@/components/BranchesMap/positions";
import mapStyles from "@/components/BranchesMap/styles.module.css";
import { cn } from "@/utilities/ui";

import styles from "./styles.module.css";

export type BranchMapPoint = {
    position: BranchMapPosition;
    title: string;
    href: string;
};

export function BranchesMap({
    label,
    points,
}: {
    label: string;
    points: BranchMapPoint[];
}) {
    const [activePoint, setActivePoint] = useState<{
        position: BranchMapPosition;
        touch: boolean;
    } | null>(null);
    const activePosition = activePoint?.position;
    const mapRef = useRef<HTMLElement>(null);
    const pointerType = useRef("mouse");

    useEffect(() => {
        if (!activePosition) return;

        const dismiss = (event: PointerEvent) => {
            const active = mapRef.current?.querySelector(
                '[data-active="true"]',
            );
            if (
                event.target instanceof Node &&
                !active?.contains(event.target)
            ) {
                setActivePoint(null);
            }
        };

        document.addEventListener("pointerdown", dismiss, { passive: true });
        return () => document.removeEventListener("pointerdown", dismiss);
    }, [activePosition]);

    return (
        <nav
            aria-label={label}
            className={cn(mapStyles.map, styles.map)}
            ref={mapRef}
        >
            <BranchesMapImage />
            <ul className={mapStyles.points}>
                {points.map(({ position, title, href }) => {
                    return (
                        <li
                            className={cn(mapStyles.point, styles.point)}
                            data-active={activePosition === position}
                            data-map-point={position}
                            key={position}
                            style={getBranchMapPointStyle(position)}
                        >
                            <Link
                                aria-label={title}
                                className={styles.link}
                                href={href}
                                onClick={(event) => {
                                    const touch =
                                        pointerType.current === "touch";
                                    pointerType.current = "mouse";

                                    if (
                                        touch &&
                                        event.detail !== 0 &&
                                        (!activePoint?.touch ||
                                            activePosition !== position)
                                    ) {
                                        event.preventDefault();
                                        setActivePoint({
                                            position,
                                            touch: true,
                                        });
                                    } else {
                                        setActivePoint(null);
                                    }
                                }}
                                onPointerDown={(event) => {
                                    pointerType.current = event.pointerType;
                                }}
                                onPointerEnter={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setActivePoint({
                                            position,
                                            touch: false,
                                        });
                                    }
                                }}
                                onPointerLeave={(event) => {
                                    if (event.pointerType === "mouse") {
                                        setActivePoint((current) =>
                                            current?.position === position
                                                ? null
                                                : current,
                                        );
                                    }
                                }}
                                prefetch={false}
                            >
                                <span
                                    aria-hidden="true"
                                    className={styles.connector}
                                />
                                <BranchesMapDot
                                    highlighted={activePosition === position}
                                />
                                <span
                                    aria-hidden="true"
                                    className={styles.label}
                                >
                                    <span className={styles.bubble}>
                                        {title}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
