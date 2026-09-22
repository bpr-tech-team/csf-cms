import sanitizeHtml from "sanitize-html";

// HTML fragments can contain embeds, but cannot execute code in the host page.
export const sanitizeFlexibleHTML = (html: string): string =>
    sanitizeHtml(html, {
        allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "iframe"],
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            "*": ["class", "title", "style"],
            a: ["href", "name", "target", "rel"],
            img: ["src", "alt", "width", "height", "loading"],
            iframe: [
                "src",
                "title",
                "width",
                "height",
                "allow",
                "allowfullscreen",
                "loading",
                "referrerpolicy",
                "sandbox",
                "style",
            ],
        },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        allowedSchemesByTag: { iframe: ["https"] },
        allowProtocolRelative: false,
        allowedStyles: {
            "*": {
                "text-align": [/^(left|center|right|justify)$/],
                color: [/^#[0-9a-f]{3,8}$/i, /^[a-z]+$/i],
                "background-color": [/^#[0-9a-f]{3,8}$/i, /^[a-z]+$/i],
                width: [/^(\d+(\.\d+)?(px|%|rem|em)|auto)$/],
                "max-width": [/^(\d+(\.\d+)?(px|%|rem|em)|none)$/],
                height: [/^(\d+(\.\d+)?(px|%|rem|em)|auto)$/],
                border: [/^0(px)?$/],
            },
        },
        transformTags: {
            a: (tagName, attribs) => ({
                tagName,
                attribs: {
                    ...attribs,
                    ...(attribs.target === "_blank"
                        ? { rel: "noopener noreferrer" }
                        : {}),
                },
            }),
            iframe: (tagName, attribs) => ({
                tagName,
                attribs: {
                    ...attribs,
                    title: attribs.title || "Vložený obsah",
                    loading: "lazy",
                    referrerpolicy: "strict-origin-when-cross-origin",
                    sandbox: "allow-scripts allow-presentation",
                },
            }),
        },
        exclusiveFilter: (frame) =>
            frame.tag === "iframe" && !frame.attribs.src,
    });
