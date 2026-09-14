"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import styles from "./styles.module.css";

// Fixed, dispersed positions and independent phases keep SSR and hydration
// identical, and avoid generating new trajectories when a slide changes.
const particles = createParticles();

function createParticles(): CSSProperties[] {
    let seed = 42;
    const random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
    };

    return Array.from(
        { length: 64 },
        () =>
            ({
                left: `${(4 + random() * 92).toFixed(2)}%`,
                top: `${(6 + random() * 88).toFixed(2)}%`,
                "--particle-size": `${1 + Math.floor(random() * 8)}px`,
                "--drift-x": `${(70 + random() * 70).toFixed(2)}px`,
                "--drift-y": `${(55 + random() * 55).toFixed(2)}px`,
                "--drift-x-duration": `${(11 + random() * 9).toFixed(2)}s`,
                "--drift-y-duration": `${(13 + random() * 11).toFixed(2)}s`,
                "--drift-x-delay": `${(-random() * 20).toFixed(2)}s`,
                "--drift-y-delay": `${(-random() * 24).toFixed(2)}s`,
                "--twinkle-duration": `${(4 + random() * 5).toFixed(2)}s`,
                "--twinkle-delay": `${(-random() * 9).toFixed(2)}s`,
            }) as CSSProperties,
    );
}

type HeroParticlesProps = {
    onAutoplayChange?: (running: boolean) => void;
};

export const HeroParticles = ({ onAutoplayChange }: HeroParticlesProps) => {
    const motionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const motion = motionRef.current;
        const hero = motion?.parentElement;
        if (!motion || !hero) return;

        const preference = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const hover = window.matchMedia("(hover: hover)");
        let isVisible = false;
        let isHovered = hover.matches && hero.matches(":hover");
        let hasFocus = hero.contains(document.activeElement);

        const updateMotion = () => {
            const running =
                isVisible && !document.hidden && !preference.matches;

            motion.dataset.running = String(running);
            // Hover and keyboard focus pause slide changes, not ambient motion.
            onAutoplayChange?.(running && !isHovered && !hasFocus);
        };

        const onMouseEnter = () => {
            isHovered = hover.matches;
            updateMotion();
        };
        const onMouseLeave = () => {
            isHovered = false;
            updateMotion();
        };
        const onFocusIn = () => {
            hasFocus = true;
            updateMotion();
        };
        const onFocusOut = (event: FocusEvent) => {
            hasFocus =
                event.relatedTarget instanceof Node &&
                hero.contains(event.relatedTarget);
            updateMotion();
        };

        const observer =
            typeof IntersectionObserver === "undefined"
                ? null
                : new IntersectionObserver(([entry]) => {
                      isVisible = entry.isIntersecting;
                      updateMotion();
                  });

        if (observer) observer.observe(hero);
        else isVisible = true;

        preference.addEventListener("change", updateMotion);
        document.addEventListener("visibilitychange", updateMotion);
        hero.addEventListener("mouseenter", onMouseEnter);
        hero.addEventListener("mouseleave", onMouseLeave);
        hero.addEventListener("focusin", onFocusIn);
        hero.addEventListener("focusout", onFocusOut);
        updateMotion();

        return () => {
            observer?.disconnect();
            preference.removeEventListener("change", updateMotion);
            document.removeEventListener("visibilitychange", updateMotion);
            hero.removeEventListener("mouseenter", onMouseEnter);
            hero.removeEventListener("mouseleave", onMouseLeave);
            hero.removeEventListener("focusin", onFocusIn);
            hero.removeEventListener("focusout", onFocusOut);
            motion.dataset.running = "false";
        };
    }, [onAutoplayChange]);

    return (
        <div aria-hidden className={styles.motion} ref={motionRef}>
            {particles.map((style, index) => (
                <span className={styles.particle} key={index} style={style} />
            ))}
        </div>
    );
};
