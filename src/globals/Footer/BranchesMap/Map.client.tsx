"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
    branchMapPositions,
    branchMapSize,
    type BranchMapPosition,
} from "./positions";
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
        <nav aria-label={label} className={styles.map} ref={mapRef}>
            <Image
                alt=""
                className={styles.background}
                draggable={false}
                height={branchMapSize.height}
                src="/footer/footer-map.svg"
                unoptimized
                width={branchMapSize.width}
            />
            <ul className={styles.points}>
                {points.map(({ position, title, href }) => {
                    const { x, y } = branchMapPositions[position];
                    const left = (x / branchMapSize.width) * 100;
                    const top = (y / branchMapSize.height) * 100;

                    return (
                        <li
                            className={styles.point}
                            data-active={activePosition === position}
                            key={position}
                            style={
                                {
                                    left: `${left}%`,
                                    top: `${top}%`,
                                    "--point-x": `${left}cqw`,
                                } as CSSProperties
                            }
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
                                <span
                                    aria-hidden="true"
                                    className={styles.dot}
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
