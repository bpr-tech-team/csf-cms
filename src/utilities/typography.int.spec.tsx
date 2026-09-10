import { cleanup, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import { HighlightedText } from "@/components/SectionHeading";
import { applyRichTextTypography } from "@/utilities/richTextTypography";
import { applyTypography } from "@/utilities/typography";
import { applyTypographyToSegments } from "@/utilities/typographySegments";
import { LocaleProvider } from "@/providers/Locale";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RenderBlocks } from "@/blocks/RenderBlocks";
const NBSP = "\u00a0";
vi.mock("@/blocks/ArchiveBlock/Component", () => ({
    ArchiveBlock: () => null,
}));

// The code block imports Payload admin SCSS, which Node cannot load in Vitest.
// Code preservation is checked on the Lexical tree below.
vi.mock("@/blocks/Code/Component", () => ({ CodeBlock: () => null }));

const textNode = (text: string, format = 0) => ({
    type: "text" as const,
    version: 1,
    text,
    format,
    detail: 0,
    mode: "normal" as const,
    style: "",
});
const paragraph = (children: object[]) => ({
    type: "paragraph",
    version: 1,
    children,
    direction: null,
    format: "",
    indent: 0,
});
const document = (children: object[]) => ({
    root: {
        type: "root",
        version: 1,
        children,
        direction: null,
        format: "",
        indent: 0,
    },
});
// Keep fixture construction flexible enough to exercise unknown extension nodes.
const richDocument = (children: object[]) =>
    document(children) as Parameters<typeof RichText>[0]["data"];

afterEach(cleanup);

describe("Typopo typography", () => {
    it("uses built-in Czech and English punctuation rules", () => {
        expect(applyTypography('He said "Hello..."', { locale: "cs" })).toBe(
            "He said „Hello…“",
        );
        expect(applyTypography('He said "Hello..."', { locale: "en" })).toBe(
            "He said “Hello…”",
        );
    });
    it("uses Typopo spacing without the old two-letter rule", () => {
        expect(
            applyTypography("IT partner pro firmy, školy a organizace"),
        ).toBe("IT partner pro firmy, školy a\u00a0organizace");
        expect(applyTypography("Spolehněte se na své IT.")).toBe(
            "Spolehněte se na své IT.",
        );
        expect(applyTypography("Go to a meeting", { locale: "en" })).toBe(
            "Go to a\u00a0meeting",
        );
    });
    it("preserves line breaks and composition whitespace", () => {
        expect(applyTypography("  v\nPraze\n\nDále  ")).toBe(
            "  v\nPraze\n\nDále  ",
        );
        expect(applyTypography(" ")).toBe(" ");
        expect(applyTypography(null)).toBe("");
    });
    it("can be disabled", () => {
        expect(applyTypography('"Hello..."', { enabled: false })).toBe(
            '"Hello..."',
        );
    });
    it("is stable for representative corrected content", () => {
        for (const locale of ["cs", "en"] as const) {
            for (const input of [
                'He said "Hello..."',
                "v Praze",
                "IT partner",
                "Text  text",
            ]) {
                const output = applyTypography(input, { locale });
                expect(applyTypography(output, { locale })).toBe(output);
            }
        }
    });
    it.each([
        [
            ["Wait...", " then ", '"continue"'],
            ["Wait…", " then ", "“continue”"],
        ],
        [
            ["Práce v ", '"Praze..."'],
            ["Práce v\u00a0", "“Praze…”"],
        ],
        [
            ["First", "  second"],
            ["First", " second"],
        ],
        [
            ["😀 P", "ráce v", " ", "Praze"],
            ["😀 P", "ráce v", NBSP, "Praze"],
        ],
        [
            ["Text ", "(c)", " 2026"],
            ["Text ", "©", "\u00a02026"],
        ],
        [
            ['"', "Hello", '"'],
            ["“", "Hello", "”"],
        ],
    ])(
        "maps replacements to the original formatted segments",
        (segments, expected) => {
            expect(
                applyTypographyToSegments(segments, { locale: "en" }),
            ).toEqual(expected);
        },
    );
});

describe("Lexical typography", () => {
    it("joins across formatting and links without changing input or metadata", () => {
        const data = richDocument([
            paragraph([
                textNode("Pracujeme v"),
                {
                    type: "link",
                    version: 3,
                    fields: { linkType: "custom", url: "/v Praze" },
                    children: [textNode(" Praze", 1)],
                },
            ]),
        ]);
        const original = JSON.stringify(data);
        const output = applyRichTextTypography(data);
        expect(JSON.stringify(data)).toBe(original);
        expect(output.root.children[0]).toMatchObject({
            children: [
                { text: "Pracujeme v" },
                {
                    fields: { url: "/v Praze" },
                    children: [{ text: `${NBSP}Praze`, format: 1 }],
                },
            ],
        });
        expect(applyRichTextTypography(output)).toEqual(output);
        expect(applyRichTextTypography(data, { enabled: false })).toBe(data);
    });

    it("respects paragraphs, line breaks, inline code and extension boundaries", () => {
        const data = richDocument([
            paragraph([
                textNode("v "),
                { type: "linebreak", version: 1 },
                textNode("Praze"),
            ]),
            paragraph([
                textNode("a "),
                textNode("b c", 16),
                textNode(" d text"),
            ]),
            paragraph([
                textNode("v "),
                { type: "custom-inline", version: 1 },
                textNode("Praze"),
            ]),
            paragraph([textNode("v ")]),
            paragraph([textNode("Praze")]),
            { type: "code", version: 1, children: [textNode("a b c")] },
            {
                type: "block",
                version: 2,
                fields: { code: "a b c", url: "/v Praze" },
            },
        ]);
        const output = applyRichTextTypography(data);
        expect(output.root.children[1]).toMatchObject({
            children: [
                { text: "a " },
                { text: "b c", format: 16 },
                { text: " d\u00a0text" },
            ],
        });
        output.root.children.forEach((node, index) => {
            if (index !== 1) expect(node).toEqual(data.root.children[index]);
        });
    });

    it("processes headings and nested lists independently", () => {
        const data = richDocument([
            { ...paragraph([textNode("v Praze")]), type: "heading", tag: "h2" },
            {
                type: "list",
                children: [
                    { type: "listitem", children: [textNode("a text")] },
                ],
            },
        ]);
        const output = applyRichTextTypography(data);
        expect(output.root.children[0]).toMatchObject({
            children: [{ text: "v\u00a0Praze" }],
        });
        expect(output.root.children[1]).toMatchObject({
            children: [{ children: [{ text: "a\u00a0text" }] }],
        });
    });
});

describe("rendered content", () => {
    it("preserves highlighted fragments including their original spaces", () => {
        const { container } = render(
            <HighlightedText
                text="Pracujeme v Praze"
                highlightedTexts={[{ text: "v Praze" }]}
            />,
        );
        expect(container.textContent).toBe("Pracujeme v\u00a0Praze");
        expect(container.querySelector("span")?.textContent).toBe(
            "v\u00a0Praze",
        );
    });

    it("joins text before a highlighted fragment", () => {
        const { container } = render(
            <HighlightedText
                text="Pracujeme v Praze"
                highlightedTexts={[{ text: "Praze" }]}
            />,
        );
        expect(container.textContent).toBe("Pracujeme v\u00a0Praze");
        expect(container.querySelector("span")?.textContent).toBe("Praze");
    });

    it("formats CMS labels without changing link targets and supports opt-out", () => {
        const { container, rerender } = render(
            <CMSLink type="custom" label="Práce v Praze" url="/v-praze" />,
        );
        expect(container.querySelector("a")?.textContent).toBe(
            "Práce v\u00a0Praze",
        );
        expect(container.querySelector("a")?.getAttribute("href")).toBe(
            "/v-praze",
        );
        rerender(
            <CMSLink
                type="custom"
                label="Práce v Praze"
                url="/v-praze"
                typography={false}
            />,
        );
        expect(container.textContent).toBe("Práce v Praze");
    });

    it("uses identical Rich Text on the server and client, including opt-out", () => {
        const data = richDocument([
            paragraph([textNode("Pracujeme v "), textNode("Praze", 1)]),
        ]);
        const content = <RichText data={data} />;
        const serverHTML = renderToStaticMarkup(content);
        const { container, rerender } = render(content);
        const server = window.document.createElement("div");
        server.innerHTML = serverHTML;
        expect(container.innerHTML).toBe(server.innerHTML);
        expect(container.querySelector("p")?.textContent).toBe(
            "Pracujeme v\u00a0Praze",
        );
        expect(container.querySelector("strong")?.textContent).toBe("Praze");
        rerender(<RichText data={data} typography={false} />);
        expect(container.querySelector("p")?.textContent).toBe(
            "Pracujeme v Praze",
        );
    });
});

describe("locale propagation", () => {
    it("passes the English page locale through RenderBlocks to headings and rich text", () => {
        const { container } = render(
            <RenderBlocks
                locale="en"
                blocks={[
                    {
                        blockType: "splitContent",
                        heading: '"Hello..."',
                        richText: richDocument([
                            paragraph([textNode('"World..."')]),
                        ]),
                    } as Parameters<typeof RenderBlocks>[0]["blocks"][number],
                ]}
            />,
        );
        expect(container.textContent).toContain("“Hello…”");
        expect(container.textContent).toContain("“World…”");
        expect(container.textContent).not.toContain("„");
    });
    it("passes locale into nested rich-text blocks", () => {
        const data = richDocument([
            {
                type: "block",
                version: 2,
                fields: {
                    blockType: "banner",
                    style: "info",
                    content: richDocument([
                        paragraph([textNode('"Hello..."')]),
                    ]),
                },
            },
        ]);
        const { container } = render(<RichText data={data} locale="en" />);
        expect(container.textContent).toBe("“Hello…”");
    });
    it("uses the page locale in client controls without rewriting values", () => {
        const { container } = render(
            <LocaleProvider locale="en">
                <Label htmlFor="name">{'"Your name..."'}</Label>
                <Button>{'"Continue..."'}</Button>
            </LocaleProvider>,
        );
        expect(container.querySelector("label")?.textContent).toBe(
            "“Your name…”",
        );
        expect(container.querySelector("label")?.htmlFor).toBe("name");
        expect(container.querySelector("button")?.textContent).toBe(
            "“Continue…”",
        );
    });
    it("keeps highlight boundaries after multiple punctuation replacements", () => {
        const { container } = render(
            <HighlightedText
                locale="en"
                text={'Wait... in "Praze..."'}
                highlightedTexts={[{ text: '"Praze..."' }]}
            />,
        );
        expect(container.textContent).toBe("Wait… in “Praze…”");
        expect(container.querySelector("span")?.textContent).toBe("“Praze…”");
    });
});
