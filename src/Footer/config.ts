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
