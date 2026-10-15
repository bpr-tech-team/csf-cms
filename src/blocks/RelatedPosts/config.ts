import type { Block } from "payload";

import { blockSpacingFields } from "@/fields/blockSpacing";

export const RelatedPosts: Block = {
    slug: "relatedPosts",
    interfaceName: "RelatedPostsBlock",
    labels: {
        singular: { cs: "Související články", en: "Related posts" },
        plural: { cs: "Související články", en: "Related posts" },
    },
    fields: [
        blockSpacingFields(),
        {
            name: "heading",
            type: "text",
            label: { cs: "Nadpis", en: "Heading" },
            admin: {
                description: {
                    cs: "Články vyberte v poli Související články na záložce Metadata. Blok se zobrazí pouze tehdy, pokud výběr obsahuje publikované články.",
                    en: "Choose posts in Related posts on the Meta tab. The block is hidden if no published posts are selected.",
                },
            },
        },
    ],
};
