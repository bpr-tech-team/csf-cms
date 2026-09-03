"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const cursorMediaQuery =
    "(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;

        if (!cursor) return;

        const mediaQuery = window.matchMedia(cursorMediaQuery);
        let removePointerListeners = () => undefined;

        const syncCursor = () => {
            removePointerListeners();
            gsap.killTweensOf(cursor);
            gsap.set(cursor, {
                autoAlpha: 0,
                xPercent: -50,
                yPercent: -50,
            });

            if (!mediaQuery.matches) return;

            const moveX = gsap.quickTo(cursor, "x", {
                duration: 0.1,
                ease: "power2.out",
            });
            const moveY = gsap.quickTo(cursor, "y", {
                duration: 0.1,
                ease: "power2.out",
            });
            let isVisible = false;
            const showCursor = () => {
                if (isVisible) return;

                isVisible = true;
                gsap.to(cursor, {
                    autoAlpha: 1,
                    duration: 0.16,
                    overwrite: "auto",
                });
            };
            const hideCursor = () => {
                isVisible = false;
                gsap.to(cursor, {
                    autoAlpha: 0,
                    duration: 0.16,
                    overwrite: "auto",
                });
            };
            const moveCursor = ({ clientX, clientY }: PointerEvent) => {
                moveX(clientX);
                moveY(clientY);
                showCursor();
            };

            window.addEventListener("pointermove", moveCursor, {
                passive: true,
            });
            window.addEventListener("blur", hideCursor);
            document.documentElement.addEventListener(
                "pointerleave",
                hideCursor,
            );

            removePointerListeners = () => {
                window.removeEventListener("pointermove", moveCursor);
                window.removeEventListener("blur", hideCursor);
                document.documentElement.removeEventListener(
                    "pointerleave",
                    hideCursor,
                );
            };
        };

        syncCursor();
        mediaQuery.addEventListener("change", syncCursor);

        return () => {
            mediaQuery.removeEventListener("change", syncCursor);
            removePointerListeners();
            gsap.killTweensOf(cursor);
        };
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-50 hidden size-5 rounded-full bg-primary opacity-0 lg:block"
            data-custom-cursor
            ref={cursorRef}
            style={{
                boxShadow:
                    "0 0 12px 32px color-mix(in srgb, var(--primary) 45%, transparent)",
            }}
        />
    );
};
