import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { authenticated } from "@/access/authenticated";
import { footerBlocks } from "./blocks";
import { revalidateFooter } from "./hooks/revalidateFooter";

export const Footer: GlobalConfig = {
    slug: "footer",
    access: {
        read: () => true,
        update: authenticated,
    },
    fields: [
        {
            name: "layout",
            type: "array",
            label: { cs: "Sloupce patičky", en: "Footer columns" },
            labels: {
                singular: { cs: "Sloupec", en: "Column" },
                plural: { cs: "Sloupce", en: "Columns" },
            },
            admin: {
                initCollapsed: true,
                description: {
                    cs: "Pořadí sloupců a bloků můžete měnit přetažením. Na mobilu se sloupce zobrazí pod sebou v opačném pořadí. Prázdný sloupec rezervuje místo pouze na široké obrazovce.",
                    en: "Drag to reorder columns and their blocks. Columns stack in reverse order on mobile. An empty column reserves space only on wide screens.",
                },
                components: {
                    RowLabel: "@/globals/Footer/RowLabel#ColumnRowLabel",
                },
            },
            fields: [
                {
                    name: "heading",
                    type: "text",
                    localized: true,
                    label: { cs: "Nadpis sloupce", en: "Column heading" },
                },
                {
                    name: "content",
                    type: "blocks",
                    label: { cs: "Obsah sloupce", en: "Column content" },
                    blocks: footerBlocks,
                    admin: { initCollapsed: true },
                },
            ],
        },
        {
            name: "tagline",
            type: "textarea",
            label: {
                cs: "Popis pod logem",
                en: "Description below the logo",
            },
            localized: true,
            admin: { hidden: true },
        },
        {
            name: "columns",
            type: "array",
            labels: {
                singular: { cs: "Sloupec", en: "Column" },
                plural: { cs: "Sloupce", en: "Columns" },
            },
            fields: [
                {
                    name: "title",
                    type: "text",
                    label: {
                        cs: "Nadpis",
                        en: "Title",
                    },
                    localized: true,
                    required: true,
                },
                {
                    name: "links",
                    type: "array",
                    labels: {
                        singular: { cs: "Odkaz", en: "Link" },
                        plural: { cs: "Odkazy", en: "Links" },
                    },
                    fields: [
                        link({
                            appearances: false,
                        }),
                    ],
                    label: {
                        cs: "Odkazy",
                        en: "Links",
                    },
                    maxRows: 6,
                },
            ],
            label: {
                cs: "Sloupce odkazů",
                en: "Link columns",
            },
            localized: true,
            maxRows: 3,
            admin: {
                hidden: true,
            },
        },
        {
            name: "navItems",
            type: "array",
            fields: [
                link({
                    appearances: false,
                }),
            ],
            label: {
                cs: "Položky navigace",
                en: "Navigation items",
            },
            localized: true,
            maxRows: 6,
            admin: {
                hidden: true,
                initCollapsed: true,
                components: {
                    RowLabel: "@/globals/Footer/RowLabel#RowLabel",
                },
            },
        },
    ],
    hooks: {
        beforeOperation: [
            ({ args, operation }) => {
                // Saving a translation must not duplicate fallback-language array IDs.
                if (operation === "update") args.req.fallbackLocale = false;
                return args;
            },
        ],
        afterChange: [revalidateFooter],
    },
    label: {
        cs: "Patička",
        en: "Footer",
    },
};
