"use client";

import { useEffect } from "react";

/** Render the original Figma assets at the compact site cursor size. */
export function SiteCursor() {
    useEffect(() => {
        const root = document.documentElement;
        const media = window.matchMedia("(any-pointer: fine)");
        const normal = new Image(64, 64);
        const hover = new Image(64, 64);
        const layer = document.createElement("div");
        layer.className = "site-cursor";
        layer.setAttribute("aria-hidden", "true");
        normal.src = "/cursors/glow.svg";
        hover.src = "/cursors/glow-hover.svg";
        normal.alt = hover.alt = "";
        layer.append(normal, hover);
        document.body.append(layer);
        let disposed = false;
        let ready = false;
        let x = 0;
        let y = 0;
        let frame = 0;

        const hide = () => {
            layer.hidden = true;
            delete root.dataset.siteCursor;
        };
        const render = () => {
            frame = 0;
            if (!ready || !media.matches) return hide();
            const target = document.elementFromPoint(x, y);
            if (!target) return hide();
            root.dataset.siteCursor = "ready";
            const style = getComputedStyle(target);
            const isHover =
                style.getPropertyValue("--site-cursor-variant").trim() ===
                "hover";
            normal.hidden = isHover;
            hover.hidden = !isHover;
            layer.style.transform = `translate3d(${x - 32}px, ${y - 32}px, 0)`;
            layer.hidden = false;
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(render);
        };
        const move = (event: PointerEvent) => {
            if (event.pointerType === "touch") return hide();
            x = event.clientX;
            y = event.clientY;
            schedule();
        };
        hide();
        Promise.all([normal.decode(), hover.decode()])
            .then(() => {
                if (!disposed) ready = true;
            })
            .catch(hide);
        window.addEventListener("pointermove", move);
        window.addEventListener("scroll", schedule, true);
        window.addEventListener("blur", hide);
        document.documentElement.addEventListener("pointerleave", hide);
        media.addEventListener("change", hide);
        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            hide();
            layer.remove();
            window.removeEventListener("pointermove", move);
            window.removeEventListener("scroll", schedule, true);
            window.removeEventListener("blur", hide);
            document.documentElement.removeEventListener("pointerleave", hide);
            media.removeEventListener("change", hide);
        };
    }, []);
    return null;
}
