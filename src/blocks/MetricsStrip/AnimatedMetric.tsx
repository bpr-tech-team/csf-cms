"use client";

import { CountUp } from "countup.js";
import { useEffect, useRef } from "react";

type Props = {
    value: number;
    prefix?: string | null;
    suffix?: string | null;
};

export function AnimatedMetric({ value, prefix, suffix }: Props) {
    const numberRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (
            !numberRef.current ||
            !Number.isFinite(value) ||
            value === 0 ||
            typeof IntersectionObserver === "undefined" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const counter = new CountUp(numberRef.current, value, {
            decimalPlaces: Math.max(
                Math.abs(value) < 10 ? 1 : 0,
                String(value).split(".")[1]?.length ?? 0,
            ),
            duration: 3,
            formattingFn: String,
            useGrouping: false,
            autoAnimate: true,
            autoAnimateOnce: true,
        });

        return () => counter.onDestroy();
    }, [value]);

    return (
        <span className="inline-block whitespace-nowrap tabular-nums">
            <span className="sr-only">
                {prefix}
                {value}
                {suffix}
            </span>
            <span aria-hidden="true">
                {prefix}
                <span ref={numberRef}>{value}</span>
                {suffix}
            </span>
        </span>
    );
}
