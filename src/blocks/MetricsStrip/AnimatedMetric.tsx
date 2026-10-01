"use client";

import { CountUp } from "countup.js";
import { useEffect, useRef } from "react";

type Props = {
    value: number;
    showDecimals?: boolean | null;
    prefix?: string | null;
    suffix?: string | null;
};

export function AnimatedMetric({
    value,
    showDecimals = false,
    prefix,
    suffix,
}: Props) {
    const numberRef = useRef<HTMLSpanElement>(null);
    const decimalPlaces = showDecimals ? 1 : 0;

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

        const element = numberRef.current;
        const counter = new CountUp(element, value, {
            decimalPlaces,
            duration: 3,
            formattingFn: (currentValue) => currentValue.toFixed(decimalPlaces),
            onCompleteCallback: () => {
                element.textContent = String(value);
            },
            useGrouping: false,
            autoAnimate: true,
            autoAnimateOnce: true,
        });

        return () => counter.onDestroy();
    }, [value, decimalPlaces]);

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
