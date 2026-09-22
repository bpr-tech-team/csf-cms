import type { BeforeEmail } from "@payloadcms/plugin-form-builder/types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
    convertLexicalToHTML,
    LinkHTMLConverter,
    TextHTMLConverter,
} from "@payloadcms/richtext-lexical/html";
import { getTextColor } from "@/fields/TextColorFeature/colors";
import {
    defaultLocale,
    isLocale,
    withLocalePrefix,
    type AppLocale,
} from "@/i18n/config";
import type { Page } from "@/payload-types";
import { getPagePath } from "@/utilities/getPagePath";
import { getServerSideURL } from "@/utilities/getURL";

type Variable = { field: string; value: unknown };
const escapeHTML = (value: unknown) =>
    String(value ?? "").replace(
        /[&<>"']/g,
        (char) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[char]!,
    );

function replaceVariables(
    text: string,
    variables: Variable[],
    html = true,
): string {
    const encode = html ? escapeHTML : (value: unknown) => String(value ?? "");
    return text.replace(/\{\{(.+?)\}\}/g, (_, key: string) => {
        if (html && key === "*")
            return variables
                .map(
                    ({ field, value }) =>
                        `${escapeHTML(field)} : ${escapeHTML(value)}`,
                )
                .join(" <br /> ");
        if (html && key === "*:table")
            return `<table>${variables.map(({ field, value }) => `<tr><td>${escapeHTML(field)}</td><td>${escapeHTML(value)}</td></tr>`).join("")}</table>`;
        const variable = variables.find(({ field }) => field === key);
        return variable ? encode(variable.value) : key;
    });
}

export function renderFormEmail(
    data: SerializedEditorState,
    variables: Variable[],
    locale: AppLocale = defaultLocale,
): string {
    const links = LinkHTMLConverter({
        internalDocToHref: ({ linkNode }) => {
            const doc = linkNode.fields.doc;
            if (!doc || typeof doc.value !== "object") return "#";
            const path =
                doc.relationTo === "posts"
                    ? `/posts/${doc.value.slug}`
                    : getPagePath(doc.value as unknown as Page);
            return `${getServerSideURL()}${withLocalePrefix(path, locale)}`;
        },
    });
    return convertLexicalToHTML({
        data,
        disableContainer: true,
        converters: ({ defaultConverters }) => ({
            ...defaultConverters,
            ...links,
            link: (args) => {
                const converter = links.link;
                if (typeof converter !== "function") return "";
                return converter({
                    ...args,
                    node: {
                        ...args.node,
                        fields: {
                            ...args.node.fields,
                            url: replaceVariables(
                                args.node.fields.url ?? "",
                                variables,
                                false,
                            ),
                        },
                    },
                });
            },
            text: (args) => {
                const converter = TextHTMLConverter.text;
                const content =
                    typeof converter === "function"
                        ? converter(args)
                        : escapeHTML(args.node.text);
                const text = replaceVariables(content, variables);
                const color = getTextColor(args.node.style);
                return color
                    ? `<span style="color: ${color}">${text}</span>`
                    : text;
            },
        }),
    });
}

function hasTextColor(node: unknown): boolean {
    if (!node || typeof node !== "object") return false;
    const item = node as {
        type?: string;
        style?: string;
        children?: unknown[];
    };
    return (
        (item.type === "text" && Boolean(getTextColor(item.style))) ||
        Boolean(item.children?.some(hasTextColor))
    );
}

// The form plugin's built-in email renderer ignores Lexical text styles.
export const preserveFormEmailColors: BeforeEmail = async (emails, args) => {
    const { data, req } = args;
    if (!data?.form) return emails;
    const form = await req.payload.findByID({
        collection: "forms",
        id: typeof data.form === "object" ? data.form.id : data.form,
        locale: req.locale,
        req,
    });
    const variables: Variable[] = [...(data.submissionData ?? [])];
    // The plugin currently types this as beforeChange, but invokes it in afterChange.
    const doc = (args as typeof args & { doc?: { id: string | number } }).doc;
    if (doc) variables.push({ field: "formSubmissionID", value: doc.id });
    const locale = isLocale(req.locale) ? req.locale : defaultLocale;
    return emails.map((email, index) => {
        const message = form.emails?.[index]?.message;
        if (!message || !hasTextColor(message.root)) return email;
        return {
            ...email,
            html: `<div>${renderFormEmail(message, variables, locale)}</div>`,
        };
    });
};
