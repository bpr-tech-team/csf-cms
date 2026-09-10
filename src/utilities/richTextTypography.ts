import { applyTypographyToSegments } from "./typographySegments";
import type { TypographyOptions } from "./typography";

type TextNode = {
    type: string;
    text?: string;
    format?: number | string;
    children?: TextNode[];
};

const inlineContainers = new Set(["link", "autolink"]);
const flowContainers = new Set(["paragraph", "heading", "quote", "listitem"]);
// Lexical's IS_CODE bit. Code blocks and unknown nodes are boundaries too.
const IS_CODE = 16;

/** Copy only the node tree; never modify stored content, block fields or link metadata. */
export function applyRichTextTypography<T extends { root: TextNode }>(
    data: T,
    options: TypographyOptions = {},
): T {
    if (options.enabled === false) return data;

    const visit = (node: TextNode): TextNode => {
        if (!node.children || node.type === "code") return node;
        const copy = { ...node, children: node.children.map(visit) };
        if (!flowContainers.has(node.type)) return copy;

        let run: TextNode[] = [];
        const flush = () => {
            const segments = applyTypographyToSegments(
                run.map((part) => part.text!),
                options,
            );
            run.forEach((part, index) => {
                part.text = segments[index];
            });
            run = [];
        };
        const collect = (child: TextNode): TextNode => {
            if (
                child.type === "text" &&
                typeof child.text === "string" &&
                !(typeof child.format === "number" && child.format & IS_CODE)
            ) {
                const textCopy = { ...child };
                run.push(textCopy);
                return textCopy;
            }
            if (inlineContainers.has(child.type) && child.children) {
                return { ...child, children: child.children.map(collect) };
            }
            flush();
            return child;
        };
        copy.children = copy.children.map(collect);
        flush();
        return copy;
    };

    return { ...data, root: visit(data.root) };
}
