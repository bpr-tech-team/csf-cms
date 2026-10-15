import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import type { PageBlock } from "@/utilities/blockSpacing";
import { BlockSurfaceGroups } from "./index";

afterEach(cleanup);

const mount = (blocks: PageBlock[]) =>
    render(
        <BlockSurfaceGroups blocks={blocks}>
            {blocks.map((block) => (
                <section id={block.id!} key={block.id} />
            ))}
        </BlockSurfaceGroups>,
    ).container;

describe("continuous block surfaces", () => {
    it("backs adjacent light sections with one surface regardless of spacing or flow", () => {
        const container = mount([
            {
                id: "intro",
                blockType: "flexibleContent",
                theme: "light",
                spacingBottom: "large",
            },
            {
                id: "content",
                blockType: "flexibleContent",
                theme: "light",
                spacingTop: "none",
            },
            {
                id: "process",
                blockType: "processSteps",
                heading: "Process",
                items: [],
            },
        ]);

        const group = container.querySelector('[data-block-surface="light"]')!;
        expect(container.children).toHaveLength(1);
        expect(group.classList.contains("bg-paper-0")).toBe(true);
        expect([...group.children].map((child) => child.id)).toEqual([
            "intro",
            "content",
            "process",
        ]);
    });

    it("uses the CMS theme and form appearance to keep dark surfaces continuous", () => {
        const container = mount([
            { id: "light", blockType: "flexibleContent", theme: "light" },
            { id: "dark", blockType: "flexibleContent", theme: "dark" },
            {
                id: "form",
                blockType: "formBlock",
                form: 1,
                appearance: "homepageDark",
            },
            { id: "light-again", blockType: "flexibleContent", theme: "light" },
        ]);

        expect(
            [...container.children].map((child) =>
                child.getAttribute("data-block-surface"),
            ),
        ).toEqual(["light", "dark", "light"]);
        const dark = container.querySelector('[data-block-surface="dark"]')!;
        expect(dark.classList.contains("bg-ink-950")).toBe(true);
        expect([...dark.children].map((child) => child.id)).toEqual([
            "dark",
            "form",
        ]);
    });

    it("keeps hero and mixed catalog layout containers intact and splits neighboring groups", () => {
        const container = mount([
            {
                id: "hero",
                blockType: "hero",
                heading: "Hero",
                backgroundMedia: 1,
            },
            { id: "before", blockType: "flexibleContent", theme: "light" },
            {
                id: "catalog",
                blockType: "computerProductCatalog",
                navigationHeading: "Catalog",
                categories: [],
            },
            { id: "after", blockType: "flexibleContent", theme: "light" },
        ]);

        expect([...container.children].map((child) => child.id)).toEqual([
            "hero",
            "",
            "catalog",
            "",
        ]);
        expect(
            container.querySelectorAll('[data-block-surface="light"]'),
        ).toHaveLength(2);
    });
});
