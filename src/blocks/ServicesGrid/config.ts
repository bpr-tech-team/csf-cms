import { contentIcon } from "@/fields/contentIcon";
import type { Block } from "payload";

import { homepageSectionIntro } from "@/fields/homepageSection";
import { link } from "@/fields/link";

export const ServicesGrid: Block = {
    slug: "servicesGrid",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/homepage.services.webp",
                alt: "Mřížka služeb",
            },
        },
    },
    interfaceName: "ServicesGridBlock",
    fields: [
        ...homepageSectionIntro(),
        {
            name: "items",
            type: "array",
            labels: {
                singular: { cs: "Služba", en: "Service" },
                plural: { cs: "Služby", en: "Services" },
            },
            admin: {
                initCollapsed: true,
            },
            fields: [
                contentIcon({ required: true }),
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
