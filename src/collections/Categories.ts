import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "payload";
import {
    createBreadcrumbsField,
    createParentField,
} from "@payloadcms/plugin-nested-docs";

const breadcrumbs = createBreadcrumbsField("categories", {
    label: { cs: "Navigační cesta", en: "Breadcrumbs" },
    labels: {
        singular: { cs: "Položka navigace", en: "Breadcrumb" },
        plural: { cs: "Položky navigace", en: "Breadcrumbs" },
    },
});
if (breadcrumbs.type === "array")
    breadcrumbs.fields = breadcrumbs.fields.map((field) =>
        field.type === "row"
            ? {
                  ...field,
                  fields: field.fields.map((child) =>
                      "name" in child && child.name === "label"
                          ? { ...child, label: { cs: "Popisek", en: "Label" } }
                          : child,
                  ),
              }
            : field,
    );

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
        createParentField("categories", {
            label: { cs: "Nadřazená kategorie", en: "Parent category" },
        }),
        breadcrumbs,
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
