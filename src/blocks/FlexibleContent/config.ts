import type { Block } from "payload";

import { link } from "@/fields/link";

const Heading: Block = {
    slug: "flexHeading",
    dbName: "flex_heading",
    interfaceName: "FlexibleHeadingElement",
    labels: {
        singular: { cs: "Nadpis H3", en: "Heading H3" },
        plural: { cs: "Nadpisy H3", en: "Headings H3" },
    },
    fields: [
        {
            name: "heading",
            type: "textarea",
            label: { cs: "Nadpis", en: "Heading" },
            required: true,
        },
    ],
};

const Text: Block = {
    slug: "flexText",
    dbName: "flex_text",
    interfaceName: "FlexibleTextElement",
    labels: {
        singular: { cs: "Text", en: "Text" },
        plural: { cs: "Texty", en: "Texts" },
    },
    fields: [
        {
            name: "richText",
            type: "richText",
            label: { cs: "Text", en: "Text" },
            required: true,
        },
    ],
};

const Button: Block = {
    slug: "flexButton",
    dbName: "flex_button",
    interfaceName: "FlexibleButtonElement",
    labels: {
        singular: { cs: "Tlačítko", en: "Button" },
        plural: { cs: "Tlačítka", en: "Buttons" },
    },
    fields: [link({ appearances: ["default", "outline"] })],
};

const Media: Block = {
    slug: "flexMedia",
    dbName: "flex_media",
    interfaceName: "FlexibleMediaElement",
    labels: {
        singular: { cs: "Obrázek nebo video", en: "Image or video" },
        plural: { cs: "Obrázky a videa", en: "Images and videos" },
    },
    fields: [
        {
            name: "media",
            type: "upload",
            relationTo: "media",
            filterOptions: {
                or: [
                    { mimeType: { contains: "image/" } },
                    { mimeType: { contains: "video/" } },
                ],
            },
            label: { cs: "Médium", en: "Media" },
            required: true,
        },
        {
            name: "aspectRatio",
            type: "select",
            defaultValue: "original",
            label: { cs: "Poměr stran", en: "Aspect ratio" },
            options: [
                { label: { cs: "Původní", en: "Original" }, value: "original" },
                { label: "1:1", value: "square" },
                { label: "4:3", value: "landscape" },
                { label: "16:9", value: "wide" },
            ],
            required: true,
        },
        {
            name: "fit",
            type: "select",
            defaultValue: "cover",
            label: { cs: "Zobrazení média", en: "Media fit" },
            admin: {
                condition: (_, siblingData) =>
                    siblingData?.aspectRatio !== "original",
            },
            options: [
                {
                    label: {
                        cs: "Vyplnit s ořezem (cover)",
                        en: "Fill and crop (cover)",
                    },
                    value: "cover",
                },
                {
                    label: {
                        cs: "Zobrazit celé (contain)",
                        en: "Show entire media (contain)",
                    },
                    value: "contain",
                },
            ],
        },
        {
            name: "position",
            type: "select",
            defaultValue: "center",
            label: { cs: "Pozice média", en: "Media position" },
            admin: {
                condition: (_, siblingData) =>
                    siblingData?.aspectRatio !== "original",
            },
            options: [
                {
                    label: { cs: "Vlevo nahoře", en: "Top left" },
                    value: "topLeft",
                },
                {
                    label: { cs: "Nahoře uprostřed", en: "Top center" },
                    value: "top",
                },
                {
                    label: { cs: "Vpravo nahoře", en: "Top right" },
                    value: "topRight",
                },
                {
                    label: { cs: "Vlevo uprostřed", en: "Center left" },
                    value: "left",
                },
                { label: { cs: "Uprostřed", en: "Center" }, value: "center" },
                {
                    label: { cs: "Vpravo uprostřed", en: "Center right" },
                    value: "right",
                },
                {
                    label: { cs: "Vlevo dole", en: "Bottom left" },
                    value: "bottomLeft",
                },
                {
                    label: { cs: "Dole uprostřed", en: "Bottom center" },
                    value: "bottom",
                },
                {
                    label: { cs: "Vpravo dole", en: "Bottom right" },
                    value: "bottomRight",
                },
            ],
        },
    ],
};

const HTML: Block = {
    slug: "flexHtml",
    dbName: "flex_html",
    interfaceName: "FlexibleHtmlElement",
    labels: {
        singular: { cs: "HTML / iframe", en: "HTML / iframe" },
        plural: { cs: "HTML / iframe", en: "HTML / iframe" },
    },
    fields: [
        {
            name: "html",
            type: "code",
            label: "HTML",
            required: true,
            admin: {
                language: "html",
                description: {
                    cs: "HTML a vložené iframe. Skripty a atributy událostí se nezobrazují.",
                    en: "HTML and embedded iframes. Scripts and event handler attributes are removed.",
                },
            },
        },
    ],
};

export const FlexibleContent: Block = {
    slug: "flexibleContent",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/flexible-content.webp",
                alt: "Flexibilní obsah",
            },
        },
    },
    dbName: "flex",
    interfaceName: "FlexibleContentBlock",
    labels: {
        singular: { cs: "Flexibilní obsah", en: "Flexible content" },
        plural: {
            cs: "Flexibilní obsahové bloky",
            en: "Flexible content blocks",
        },
    },
    fields: [
        {
            name: "anchorId",
            type: "text",
            label: { cs: "ID kotvy", en: "Anchor ID" },
        },
        {
            name: "theme",
            type: "radio",
            defaultValue: "light",
            required: true,
            admin: { layout: "horizontal" },
            label: { cs: "Barevné téma", en: "Color theme" },
            options: [
                { label: { cs: "Světlé", en: "Light" }, value: "light" },
                { label: { cs: "Tmavé", en: "Dark" }, value: "dark" },
            ],
        },
        {
            name: "heading",
            type: "textarea",
            label: { cs: "Nadpis H2", en: "Heading H2" },
        },
        {
            name: "intro",
            type: "richText",
            label: { cs: "Úvodní text", en: "Introductory text" },
        },
        {
            type: "collapsible",
            label: { cs: "Mobilní zobrazení", en: "Mobile layout" },
            admin: {
                initCollapsed: true,
                condition: (_, siblingData) =>
                    siblingData.columns?.length === 2,
            },
            fields: [
                {
                    name: "mobileColumnOrder",
                    type: "radio",
                    defaultValue: "default",
                    label: {
                        cs: "Pořadí sloupců na mobilu",
                        en: "Mobile column order",
                    },
                    admin: {
                        layout: "horizontal",
                        description: {
                            cs: "Platí při šířce menší než 1024 px. Přesouvá celé sloupce, pořadí prvků uvnitř zůstává stejné.",
                            en: "Applies below 1024 px. Moves entire columns and preserves the order of elements within each column.",
                        },
                    },
                    options: [
                        {
                            label: {
                                cs: "Stejné jako na desktopu",
                                en: "Same as desktop",
                            },
                            value: "default",
                        },
                        {
                            label: { cs: "Obrácené", en: "Reversed" },
                            value: "reverse",
                        },
                    ],
                },
            ],
        },
        {
            name: "columns",
            dbName: "cols",
            type: "array",
            minRows: 1,
            maxRows: 2,
            required: true,
            label: { cs: "Sloupce", en: "Columns" },
            labels: {
                singular: { cs: "Sloupec", en: "Column" },
                plural: { cs: "Sloupce", en: "Columns" },
            },
            admin: {
                description: {
                    cs: "Jeden sloupec na celou šířku, nebo dva stejně široké. Na mobilu se zobrazují pod sebou.",
                    en: "One full-width column or two equal columns. Columns stack on mobile.",
                },
            },
            fields: [
                {
                    type: "row",
                    fields: [
                        {
                            name: "horizontalAlign",
                            type: "select",
                            defaultValue: "left",
                            label: {
                                cs: "Vodorovné zarovnání",
                                en: "Horizontal alignment",
                            },
                            options: [
                                {
                                    label: { cs: "Vlevo", en: "Left" },
                                    value: "left",
                                },
                                {
                                    label: { cs: "Na střed", en: "Center" },
                                    value: "center",
                                },
                                {
                                    label: { cs: "Vpravo", en: "Right" },
                                    value: "right",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "verticalAlign",
                            type: "select",
                            defaultValue: "top",
                            label: {
                                cs: "Svislé zarovnání",
                                en: "Vertical alignment",
                            },
                            options: [
                                {
                                    label: { cs: "Nahoru", en: "Top" },
                                    value: "top",
                                },
                                {
                                    label: { cs: "Na střed", en: "Center" },
                                    value: "center",
                                },
                                {
                                    label: { cs: "Dolů", en: "Bottom" },
                                    value: "bottom",
                                },
                            ],
                            required: true,
                        },
                    ],
                },
                {
                    name: "mobileHorizontalAlign",
                    type: "select",
                    defaultValue: "inherit",
                    label: {
                        cs: "Vodorovné zarovnání na mobilu",
                        en: "Mobile horizontal alignment",
                    },
                    admin: {
                        description: {
                            cs: "Platí pro celý sloupec při šířce menší než 1024 px.",
                            en: "Applies to the entire column below 1024 px.",
                        },
                    },
                    options: [
                        {
                            label: {
                                cs: "Stejné jako na desktopu",
                                en: "Same as desktop",
                            },
                            value: "inherit",
                        },
                        { label: { cs: "Vlevo", en: "Left" }, value: "left" },
                        {
                            label: { cs: "Na střed", en: "Center" },
                            value: "center",
                        },
                        {
                            label: { cs: "Vpravo", en: "Right" },
                            value: "right",
                        },
                    ],
                },
                {
                    name: "elements",
                    type: "blocks",
                    labels: {
                        singular: { cs: "Prvek", en: "Element" },
                        plural: { cs: "Prvky", en: "Elements" },
                    },
                    blocks: [Heading, Text, Button, Media, HTML],
                    minRows: 1,
                    required: true,
                    label: { cs: "Prvky sloupce", en: "Column elements" },
                    admin: { initCollapsed: true },
                },
            ],
        },
    ],
};
