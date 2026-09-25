import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { contentIcon } from "@/fields/contentIcon";
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
            labels: {
                singular: { cs: "Položka navigace", en: "navigation item" },
                plural: { cs: "Položky navigace", en: "Navigation items" },
            },
            fields: [
                {
                    name: "itemType",
                    type: "select",
                    defaultValue: "link",
                    required: true,
                    label: { cs: "Typ položky", en: "Item type" },
                    options: [
                        { label: { cs: "Odkaz", en: "Link" }, value: "link" },
                        {
                            label: {
                                cs: "Rozbalovací menu",
                                en: "Dropdown menu",
                            },
                            value: "dropdown",
                        },
                    ],
                },
                link({
                    appearances: false,
                    overrides: {
                        admin: {
                            condition: (_, siblingData) =>
                                siblingData?.itemType !== "dropdown",
                        },
                    },
                }),
                {
                    name: "label",
                    type: "text",
                    required: true,
                    label: { cs: "Název menu", en: "Menu label" },
                    admin: {
                        condition: (_, siblingData) =>
                            siblingData?.itemType === "dropdown",
                    },
                },
                {
                    name: "children",
                    type: "array",
                    labels: {
                        singular: { cs: "Odkaz", en: "link" },
                        plural: { cs: "Odkazy", en: "Links" },
                    },
                    label: { cs: "Odkazy v menu", en: "Submenu links" },
                    minRows: 1,
                    required: true,
                    admin: {
                        condition: (_, siblingData) =>
                            siblingData?.itemType === "dropdown",
                        initCollapsed: true,
                        components: {
                            RowLabel: "@/globals/Header/RowLabel#RowLabel",
                        },
                    },
                    fields: [link({ appearances: false }), contentIcon()],
                },
                {
                    name: "showOverviewLink",
                    type: "checkbox",
                    label: {
                        cs: "Zobrazit odkaz na celý přehled",
                        en: "Show overview link",
                    },
                    defaultValue: false,
                    admin: {
                        condition: (_, siblingData) =>
                            siblingData?.itemType === "dropdown",
                    },
                },
                link({
                    appearances: false,
                    overrides: {
                        name: "overviewLink",
                        label: {
                            cs: "Odkaz na celý přehled",
                            en: "Overview link",
                        },
                        admin: {
                            condition: (_, siblingData) =>
                                siblingData?.itemType === "dropdown" &&
                                siblingData?.showOverviewLink,
                        },
                    },
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
                    RowLabel: "@/globals/Header/RowLabel#RowLabel",
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
