import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type {
    FlexibleContentBlock as Props,
    FlexibleTextElement,
    Media,
} from "@/payload-types";
import { FlexibleContentBlock } from "./Component";

vi.mock("@/blocks/Code/Component", () => ({ CodeBlock: () => null }));
afterEach(cleanup);

const text = (value: string): FlexibleTextElement["richText"] => ({
    root: {
        type: "root",
        version: 1,
        direction: null,
        format: "",
        indent: 0,
        children: [
            {
                type: "paragraph",
                version: 1,
                direction: null,
                format: "",
                indent: 0,
                children: [
                    {
                        type: "text",
                        version: 1,
                        text: value,
                        detail: 0,
                        format: 0,
                        mode: "normal",
                        style: "",
                    },
                ],
            },
        ],
    },
});

describe("Flexible content rendering", () => {
    it("renders optional intro and repeated elements in each column's saved order", () => {
        const columns: Props["columns"] = [
            {
                horizontalAlign: "center",
                verticalAlign: "center",
                elements: [
                    { blockType: "flexHeading", heading: "První nadpis" },
                    { blockType: "flexText", richText: text("První text") },
                    {
                        blockType: "flexButton",
                        link: {
                            type: "custom",
                            url: "/kontakt",
                            label: "Kontakt",
                            appearance: "outline",
                        },
                    },
                    { blockType: "flexHeading", heading: "Druhý nadpis" },
                    {
                        blockType: "flexHtml",
                        html: "<strong>HTML obsah</strong><script>bad()</script>",
                    },
                ],
            },
            {
                horizontalAlign: "right",
                verticalAlign: "bottom",
                elements: [
                    { blockType: "flexText", richText: text("Druhý sloupec") },
                ],
            },
        ];
        const { container } = render(
            <FlexibleContentBlock
                blockType="flexibleContent"
                theme="light"
                heading="Sekce"
                intro={text("Úvod")}
                columns={columns}
                locale="en"
            />,
        );
        expect(
            screen
                .getAllByRole("heading")
                .map((node) => [node.tagName, node.textContent]),
        ).toEqual([
            ["H2", "Sekce"],
            ["H3", "První nadpis"],
            ["H3", "Druhý nadpis"],
        ]);
        expect(
            screen.getByRole("link", { name: "Kontakt" }).getAttribute("href"),
        ).toBe("/en/kontakt");
        const content = container.textContent!;
        const values = [
            "Sekce",
            "Úvod",
            "První nadpis",
            "První text",
            "Kontakt",
            "Druhý nadpis",
            "HTML obsah",
            "Druhý sloupec",
        ];
        expect(values.map((value) => content.indexOf(value))).toEqual(
            values.map((value) => content.indexOf(value)).sort((a, b) => a - b),
        );
        expect(container.querySelector("script")).toBeNull();
    });

    it("supports a single column without a section heading or intro", () => {
        render(
            <FlexibleContentBlock
                blockType="flexibleContent"
                theme="light"
                columns={[
                    {
                        horizontalAlign: "left",
                        verticalAlign: "top",
                        elements: [
                            { blockType: "flexHeading", heading: "Jen obsah" },
                        ],
                    },
                ]}
            />,
        );
        expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
        expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(
            "Jen obsah",
        );
    });

    it("renders uploaded video with controls and no forced autoplay", () => {
        const media: Media = {
            id: 1,
            url: "/media/demo.mp4",
            mimeType: "video/mp4",
            updatedAt: "2026-09-22",
            createdAt: "2026-09-22",
        };
        const { container } = render(
            <FlexibleContentBlock
                blockType="flexibleContent"
                theme="light"
                columns={[
                    {
                        horizontalAlign: "left",
                        verticalAlign: "top",
                        elements: [
                            {
                                blockType: "flexMedia",
                                media,
                                aspectRatio: "wide",
                                fit: "contain",
                                position: "center",
                            },
                        ],
                    },
                ]}
            />,
        );
        expect(container.querySelector("video")?.controls).toBe(true);
        expect(container.querySelector("video")?.autoplay).toBe(false);
        expect(
            container.querySelector("source")?.getAttribute("src"),
        ).toContain("/media/demo.mp4");
    });
});
