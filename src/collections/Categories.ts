import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "payload";

export const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            label: {
                cs: "Název",
                en: "Title",
            },
            localized: true,
            required: true,
        },
        slugField({
            localized: true,
            position: undefined,
        }),
    ],
    labels: {
        plural: {
            cs: "Kategorie",
            en: "Categories",
        },
        singular: {
            cs: "Kategorie",
            en: "Category",
        },
    },
};
