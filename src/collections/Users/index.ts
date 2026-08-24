import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";

export const Users: CollectionConfig = {
    slug: "users",
    access: {
        admin: authenticated,
        create: authenticated,
        delete: authenticated,
        read: authenticated,
        update: authenticated,
    },
    admin: {
        defaultColumns: ["name", "email"],
        useAsTitle: "name",
    },
    auth: true,
    fields: [
        {
            name: "name",
            type: "text",
            label: {
                cs: "Jméno",
                en: "Name",
            },
        },
    ],
    labels: {
        plural: {
            cs: "Uživatelé",
            en: "Users",
        },
        singular: {
            cs: "Uživatel",
            en: "User",
        },
    },
    timestamps: true,
};
