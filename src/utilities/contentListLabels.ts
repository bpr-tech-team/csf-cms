type Node = {
    type: string;
    text?: string;
    format?: number | string;
    children?: Node[];
};

const inlineContainers = new Set(["link", "autolink", "paragraph"]);
const IS_BOLD = 1;

/** Emphasize list labels for display, preserving the editor's data and inline formatting. */
export function contentListLabels<T extends { root: Node }>(data: T): T {
    const visit = (node: Node): Node => {
        if (!node.children) return node;
        const copy = { ...node, children: node.children.map(visit) };
        if (node.type !== "listitem") return copy;

        const textOf = (child: Node): string =>
            child.type === "text"
                ? (child.text ?? "")
                : inlineContainers.has(child.type)
                  ? (child.children ?? []).map(textOf).join("")
                  : "";
        let remaining = copy.children.map(textOf).join("").indexOf(":");
        if (remaining <= 0) return copy;

        const emphasize = (child: Node): Node[] => {
            if (remaining <= 0) return [child];
            if (child.type === "text" && typeof child.text === "string") {
                const length = Math.min(remaining, child.text.length);
                remaining -= length;
                const label = {
                    ...child,
                    text: child.text.slice(0, length),
                    format:
                        (typeof child.format === "number" ? child.format : 0) |
                        IS_BOLD,
                };
                return length === child.text.length
                    ? [label]
                    : [label, { ...child, text: child.text.slice(length) }];
            }
            return [
                inlineContainers.has(child.type) && child.children
                    ? { ...child, children: child.children.flatMap(emphasize) }
                    : child,
            ];
        };
        return { ...copy, children: copy.children.flatMap(emphasize) };
    };

    return { ...data, root: visit(data.root) };
}
