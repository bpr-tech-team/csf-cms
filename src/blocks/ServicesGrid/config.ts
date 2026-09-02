import type { Block } from "payload";

import { homepageSectionIntro } from "@/fields/homepageSection";
import { link } from "@/fields/link";

export const ServicesGrid: Block = {
    slug: "servicesGrid",
    interfaceName: "ServicesGridBlock",
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
                    name: "icon",
                    type: "upload",
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
                link({ appearances: false }),
            ],
            label: {
                cs: "Služby",
                en: "Services",
            },
            maxRows: 6,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Mřížky služeb",
            en: "Service grids",
        },
        singular: {
            cs: "Mřížka služeb",
            en: "Services grid",
        },
    },
};
