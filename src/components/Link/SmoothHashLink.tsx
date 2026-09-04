"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { forwardRef } from "react";

type SmoothHashLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
    href: string;
};

export const SmoothHashLink = forwardRef<
    HTMLAnchorElement,
    SmoothHashLinkProps
>(({ href, onClick, target, ...props }, ref) => {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            (target && target !== "_self")
        ) {
            return;
        }

        let targetID: string;

        try {
            targetID = decodeURIComponent(href.slice(1));
        } catch {
            return;
        }

        const targetElement = targetID
            ? document.getElementById(targetID)
            : null;

        if (!targetElement) return;

        event.preventDefault();

        if (window.location.hash !== href) {
            window.history.pushState(window.history.state, "", href);
        }

        targetElement.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            block: "start",
        });
    };

    return (
        <a
            {...props}
            href={href}
            onClick={handleClick}
            ref={ref}
            target={target}
        />
    );
});

SmoothHashLink.displayName = "SmoothHashLink";
