import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateHeader } from "./hooks/revalidateHeader";

export const Header: GlobalConfig = {
    slug: "header",
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
                    RowLabel: "@/Header/RowLabel#RowLabel",
                },
            },
        },
        link({
            appearances: false,
            overrides: {
                name: "customerZoneLink",
                label: {
                    cs: "Odkaz do zákaznické zóny",
                    en: "Customer zone link",
                },
            },
        }),
        link({
            appearances: false,
            overrides: {
                name: "contactLink",
                label: {
                    cs: "Kontaktní tlačítko",
                    en: "Contact button",
                },
            },
        }),
    ],
    hooks: {
        afterChange: [revalidateHeader],
    },
    label: {
        cs: "Hlavička",
        en: "Header",
    },
};
