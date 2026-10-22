import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { describe, expect, it } from "vitest";

import type { Media } from "@/payload-types";
import { HeroBackground } from "./index";
import { MediaAsset } from "../MediaAsset";
import { HeroSection } from "../HeroSection";

const image: Media = {
    id: 1,
    url: "/api/media/file/hero.webp",
    _objectKey: "source-key",
    mimeType: "image/webp",
    width: 1920,
    height: 1080,
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-01T00:00:00.000Z",
};

const renderImage = (element: React.ReactNode) =>
    renderToStaticMarkup(
        <ImageConfigContext.Provider
            value={{ ...imageConfigDefault, qualities: [65, 75, 100] }}
        >
            {element}
        </ImageConfigContext.Provider>,
    );

describe("server-rendered hero images", () => {
    it("exposes the full responsive image and its priority before hydration", () => {
        const root = document.createElement("div");
        root.innerHTML = renderImage(
            <HeroBackground isPageIntro resource={image} />,
        );
        const img = root.querySelector("img")!;
        expect(img.getAttribute("loading")).toBe("eager");
        expect(img.getAttribute("fetchPriority")).toBe("high");
        expect(img.hasAttribute("data-hero-image")).toBe(true);
        expect(img.getAttribute("sizes")).toBe("100vw");
        expect(img.getAttribute("srcset")).toContain("w=1920");
        expect(img.getAttribute("src")).toContain("q=65");
        expect(img.getAttribute("src")).toContain("source-key");
        expect(root.innerHTML).not.toContain("data:image");
        const hint = root.querySelector('link[rel="preload"][as="image"]');
        if (hint)
            expect(hint.getAttribute("imageSrcSet")).toBe(
                img.getAttribute("srcset"),
            );
    });

    it("only waits for a real background image in the first hero", () => {
        const root = document.createElement("div");
        root.innerHTML = renderImage(
            <HeroSection backgroundMedia={image} isPageIntro>
                <h1>Hero</h1>
            </HeroSection>,
        );
        expect(root.querySelector("section")?.dataset.heroReveal).toBe(
            "pending",
        );
        expect(root.querySelector("h1")?.textContent).toBe("Hero");

        for (const props of [{}, { backgroundMedia: image }]) {
            root.innerHTML = renderImage(
                <HeroSection {...props}>Content</HeroSection>,
            );
            expect(root.querySelector("[data-hero-reveal]")).toBeNull();
            expect(root.querySelector("[data-hero-image]")).toBeNull();
        }
    });

    it("keeps images below the intro lazy and at a lower priority", () => {
        const root = document.createElement("div");
        root.innerHTML = renderImage(
            <MediaAsset className="image" fill resource={image} sizes="50vw" />,
        );
        const img = root.querySelector("img")!;
        expect(img.getAttribute("loading")).toBe("lazy");
        expect(img.getAttribute("fetchPriority")).toBe("low");
        expect(img.getAttribute("src")).toContain("q=75");
        expect(img.getAttribute("sizes")).toBe("50vw");
        expect(root.innerHTML).not.toContain("data:image");
    });
});
