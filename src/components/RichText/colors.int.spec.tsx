import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import RichText from "./index";

vi.mock("@/blocks/Code/Component", () => ({ CodeBlock: () => null }));
afterEach(cleanup);

describe("Rich text colors and headings", () => {
    it("renders H1–H4 with text colors and nested formatting", () => {
        const data = {
            root: {
                type: "root",
                version: 1,
                direction: null,
                format: "" as const,
                indent: 0,
                children: [1, 2, 3, 4].map((level) => ({
                    type: "heading",
                    tag: `h${level}`,
                    version: 1,
                    direction: null,
                    format: "",
                    indent: 0,
                    children: [
                        {
                            type: "text",
                            version: 1,
                            text: `Heading ${level}`,
                            format: 3,
                            mode: "normal",
                            detail: 0,
                            style: "color: #123456; position: fixed",
                        },
                    ],
                })),
            },
        };
        const { container } = render(
            <RichText data={data as Parameters<typeof RichText>[0]["data"]} />,
        );
        for (const level of [1, 2, 3, 4]) {
            const heading = screen.getByRole("heading", { level });
            expect(
                heading.querySelector<HTMLElement>(".richtext-color")?.style
                    .color,
            ).toBe("rgb(18, 52, 86)");
            expect(heading.querySelector("em strong")?.textContent).toBe(
                `Heading ${level}`,
            );
        }
        expect(container.innerHTML).not.toContain("position: fixed");
        expect(data.root.children[0].children[0].style).toBe(
            "color: #123456; position: fixed",
        );
    });
});
