import type { Block } from "payload";

export const MediaBlock: Block = {
    slug: "mediaBlock",
    interfaceName: "MediaBlock",
    fields: [
        {
            name: "media",
            type: "upload",
            label: {
                cs: "Médium",
                en: "Media",
            },
            relationTo: "media",
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Mediální bloky",
            en: "Media blocks",
        },
        singular: {
            cs: "Mediální blok",
            en: "Media block",
        },
    },
};
