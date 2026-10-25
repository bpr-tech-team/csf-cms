import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HeroBlock } from "@/blocks/Hero/Component";
import type { BranchMapPosition } from "@/components/BranchesMap/positions";
import type { Media, Page } from "@/payload-types";

const image: Media = {
    id: 1,
    url: "/api/media/file/legacy-hero.webp",
    mimeType: "image/webp",
    width: 1920,
    height: 1080,
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-01T00:00:00.000Z",
};

const branch = (
    mapPosition?: BranchMapPosition,
): Pick<Page, "pageType" | "branchInfo"> => ({
    pageType: "branch",
    branchInfo: {
        address: "Testovací adresa",
        phones: [{ number: "+420 000 000 000" }],
        email: "test@example.invalid",
        icon: { source: "fontawesome", fontAwesome: "solid/location-dot" },
        mapPosition,
    },
});

const renderHero = (
    page: Pick<Page, "pageType" | "branchInfo">,
    backgroundMedia?: Media,
) => {
    const root = document.createElement("div");
    root.innerHTML = renderToStaticMarkup(
        <HeroBlock
            blockType="hero"
            heading="Hradec Králové"
            description="Kontaktní místo"
            backgroundMedia={backgroundMedia}
            isPageIntro
            page={page}
        />,
    );
    return root;
};

describe("branch-specific hero selection", () => {
    it.each(["hradec-kralove", "praha"] as const)(
        "automatically renders the static map with %s highlighted",
        (position) => {
            const root = renderHero(branch(position), image);
            expect(root.querySelector("h1")?.textContent).toBe(
                "Hradec Králové",
            );
            expect(root.textContent).toContain("Kontaktní místo");
            expect(root.querySelectorAll("[data-map-point]")).toHaveLength(5);
            expect(
                root.querySelectorAll('[data-highlighted="true"]'),
            ).toHaveLength(1);
            expect(
                root
                    .querySelector('[data-highlighted="true"]')
                    ?.getAttribute("data-map-point"),
            ).toBe(position);
            expect(root.querySelector("img")?.getAttribute("src")).toBe(
                "/footer/footer-map.svg",
            );
            expect(root.querySelectorAll("img")).toHaveLength(1);
            expect(root.querySelector("[data-hero-image]")).toBeNull();
            expect(root.querySelector("[data-hero-reveal]")).toBeNull();
            expect(root.querySelector("nav, a, button")).toBeNull();
        },
    );

    it("renders a neutral map without requiring an image or a selected point", () => {
        const root = renderHero(branch());
        expect(root.querySelectorAll("[data-map-point]")).toHaveLength(5);
        expect(root.querySelector('[data-highlighted="true"]')).toBeNull();
    });

    it("preserves the photo hero for ordinary pages", () => {
        const root = renderHero({ pageType: "standard" }, image);
        expect(root.querySelector("[data-map-point]")).toBeNull();
        expect(root.querySelector("[data-hero-image]")).not.toBeNull();
        expect(
            root
                .querySelector("[data-hero-reveal]")
                ?.getAttribute("data-hero-reveal"),
        ).toBe("pending");
        expect(root.querySelector("img")?.getAttribute("src")).toContain(
            "legacy-hero.webp",
        );
    });
});
