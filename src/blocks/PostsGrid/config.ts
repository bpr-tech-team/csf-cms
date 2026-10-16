import type { Block } from "payload";

import { blockSpacingFields } from "@/fields/blockSpacing";

export const PostsGrid: Block = {
    slug: "postsGrid",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/posts-grid.webp",
                alt: "Přehled článků s vyhledáváním a stránkováním",
            },
        },
    },
    interfaceName: "PostsGridBlock",
    labels: {
        singular: { cs: "Přehled článků", en: "Posts grid" },
        plural: { cs: "Přehledy článků", en: "Posts grids" },
    },
    fields: [
        blockSpacingFields(),
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
            label: { cs: "Barevné provedení", en: "Theme" },
            options: [
                { label: { cs: "Světlé", en: "Light" }, value: "light" },
                { label: { cs: "Tmavé", en: "Dark" }, value: "dark" },
            ],
        },
        {
            name: "heading",
            type: "text",
            label: { cs: "Nadpis", en: "Heading" },
        },
        {
            name: "pageSize",
            type: "select",
            defaultValue: "12",
            required: true,
            label: { cs: "Článků na stránce", en: "Posts per page" },
            options: ["6", "12", "24"],
        },
    ],
};
