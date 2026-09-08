import type { Block } from "payload";

import { homepageSectionIntro } from "@/fields/homepageSection";
import { link } from "@/fields/link";

export const ProductsGrid: Block = {
    slug: "productsGrid",
    interfaceName: "ProductsGridBlock",
    fields: [
        ...homepageSectionIntro(),
        {
            name: "items",
            type: "array",
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    label: {
                        cs: "Obrázek",
                        en: "Image",
                    },
                    relationTo: "media",
                },
                {
                    name: "icon",
                    type: "upload",
                    admin: {
                        description: {
                            cs: "Ikona bez pozadí a vnějších okrajů. Barevné pozadí přidává web automaticky.",
                            en: "Icon without a background or outer padding. The website adds the colored background automatically.",
                        },
                    },
                    label: {
                        cs: "Ikona",
                        en: "Icon",
                    },
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "title",
                    type: "text",
                    label: {
                        cs: "Název",
                        en: "Title",
                    },
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    label: {
                        cs: "Popis",
                        en: "Description",
                    },
                    required: true,
                },
                link({ appearances: false, disableLabel: true }),
            ],
            label: {
                cs: "Produkty",
                en: "Products",
            },
            maxRows: 6,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Mřížky produktů",
            en: "Product grids",
        },
        singular: {
            cs: "Mřížka produktů",
            en: "Products grid",
        },
    },
};
