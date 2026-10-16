import { describe, expect, it } from "vitest";

import { contentListLabels } from "./contentListLabels";

const text = (value: string, format = 0) => ({
    type: "text",
    text: value,
    format,
});
const item = (...children: ReturnType<typeof text>[]) => ({
    type: "listitem",
    children,
});

describe("content list labels", () => {
    it("bolds only the label before the first colon and preserves formatting and the source", () => {
        const data = {
            root: {
                type: "root",
                children: [item(text("Support: available: always", 2))],
            },
        };
        const original = structuredClone(data);
        const result = contentListLabels(data);
        expect(result.root.children[0].children).toEqual([
            text("Support", 3),
            text(": available: always", 2),
        ]);
        expect(data).toEqual(original);
    });

    it("finds labels split across text nodes and links without changing the link", () => {
        const data = {
            root: {
                type: "root",
                children: [
                    {
                        type: "listitem",
                        children: [
                            text("Technical "),
                            {
                                type: "link",
                                fields: { url: "/support" },
                                children: [text("support: help", 8)],
                            },
                        ],
                    },
                ],
            },
        };
        const result = contentListLabels(data);
        const children = result.root.children[0].children;
        expect(children[0]).toEqual(text("Technical ", 1));
        expect(children[1]).toEqual({
            type: "link",
            fields: { url: "/support" },
            children: [text("support", 9), text(": help", 8)],
        });
    });

    it("leaves paragraphs and list items without labels unchanged", () => {
        const data = {
            root: {
                type: "root",
                children: [
                    {
                        type: "paragraph",
                        children: [text("Notice: paragraph")],
                    },
                    item(text("No label here")),
                    item(text(": no label")),
                ],
            },
        };
        expect(contentListLabels(data)).toEqual(data);
    });

    it("formats nested items independently and does not borrow their colons for the parent", () => {
        const data = {
            root: {
                type: "root",
                children: [
                    {
                        type: "listitem",
                        children: [
                            text("Parent without a colon"),
                            {
                                type: "list",
                                children: [item(text("Child: value"))],
                            },
                        ],
                    },
                ],
            },
        };
        const result = contentListLabels(data);
        expect(result.root.children[0].children[0]).toEqual(
            text("Parent without a colon"),
        );
        expect(result.root.children[0].children[1]).toEqual({
            type: "list",
            children: [
                {
                    type: "listitem",
                    children: [text("Child", 1), text(": value")],
                },
            ],
        });
    });
});
