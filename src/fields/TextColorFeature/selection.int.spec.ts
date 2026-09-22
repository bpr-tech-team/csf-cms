import { describe, expect, it } from "vitest";
import {
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    $getSelection,
    $isRangeSelection,
    createEditor,
    type RangeSelection,
} from "@payloadcms/richtext-lexical/lexical";
import { applyTextColor } from "./selection";
import { getTextColor, normalizeHexColor } from "./colors";

describe("Text color", () => {
    it("accepts short/custom HEX and ignores unrelated or unsafe styles", () => {
        expect(normalizeHexColor(" #AbC ")).toBe("#aabbcc");
        expect(normalizeHexColor("1A2B3C")).toBe("#1a2b3c");
        expect(
            getTextColor("background-color: #fff; color: rgb(18, 52, 86);"),
        ).toBe("#123456");
        expect(
            getTextColor("color: url(https://example.com); background: red"),
        ).toBeNull();
        expect(getTextColor("background-color: #fff")).toBeNull();
        expect(getTextColor("color: rgb(999, 0, 0)")).toBeNull();
    });

    it("colors only the remembered selection, retains bold, reloads and resets color", async () => {
        const editor = createEditor({
            namespace: "color-test",
            onError: (error) => {
                throw error;
            },
        });
        let selection: RangeSelection;
        editor.update(
            () => {
                const text =
                    $createTextNode("Before color after").toggleFormat("bold");
                $getRoot().append($createParagraphNode().append(text));
                selection = text.select(7, 12).clone();
            },
            { discrete: true },
        );

        const apply = (color: string | null) =>
            new Promise<void>((resolve) => {
                const unregister = editor.registerUpdateListener(() => {
                    unregister();
                    resolve();
                });
                applyTextColor(editor, selection, color);
            });
        await apply("#123456");
        const serialized = editor.getEditorState().toJSON();
        editor.setEditorState(editor.parseEditorState(serialized));
        editor.getEditorState().read(() => {
            const nodes = $getRoot().getAllTextNodes();
            expect(nodes.map((node) => node.getTextContent())).toEqual([
                "Before ",
                "color",
                " after",
            ]);
            expect(nodes.map((node) => getTextColor(node.getStyle()))).toEqual([
                null,
                "#123456",
                null,
            ]);
            expect(nodes.every((node) => node.hasFormat("bold"))).toBe(true);
        });
        editor.update(
            () => {
                $getRoot().getAllTextNodes()[1].select(0, 5);
                const selected = $getSelection();
                if ($isRangeSelection(selected)) selection = selected.clone();
            },
            { discrete: true },
        );
        await apply(null);
        editor.getEditorState().read(() => {
            expect($getRoot().getTextContent()).toBe("Before color after");
            expect(
                $getRoot()
                    .getAllTextNodes()
                    .every(
                        (node) => !node.getStyle() && node.hasFormat("bold"),
                    ),
            ).toBe(true);
        });
    });
});
