import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateFooter } from "./hooks/revalidateFooter";

export const Footer: GlobalConfig = {
    slug: "footer",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "tagline",
            type: "textarea",
            label: {
                cs: "Popis pod logem",
                en: "Description below the logo",
            },
            localized: true,
        },
        {
            name: "columns",
            type: "array",
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
                    RowLabel: "@/Footer/RowLabel#RowLabel",
                },
            },
        },
    ],
    hooks: {
        afterChange: [revalidateFooter],
    },
    label: {
        cs: "Patička",
        en: "Footer",
    },
};
