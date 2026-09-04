import type { Block } from "payload";

import { homepageSectionIntro } from "@/fields/homepageSection";

export const CompanyTimeline: Block = {
    slug: "companyTimeline",
    interfaceName: "CompanyTimelineBlock",
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
                    name: "year",
                    type: "text",
                    label: {
                        cs: "Rok",
                        en: "Year",
                    },
                    required: true,
                },
                {
                    name: "title",
                    type: "text",
                    label: {
                        cs: "Název události",
                        en: "Event title",
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
            ],
            label: {
                cs: "Události",
                en: "Events",
            },
            maxRows: 12,
            minRows: 2,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Časové osy společnosti",
            en: "Company timelines",
        },
        singular: {
            cs: "Časová osa společnosti",
            en: "Company timeline",
        },
    },
};
