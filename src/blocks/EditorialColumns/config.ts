import type { Block } from "payload";

import { highlightedTextsField } from "@/fields/highlightedTexts";
import { serviceRichText } from "@/fields/serviceRichText";

export const EditorialColumns: Block = {
    slug: "editorialColumns",
    interfaceName: "EditorialColumnsBlock",
    fields: [
        {
            name: "anchorId",
            type: "text",
            label: {
                cs: "ID kotvy",
                en: "Anchor ID",
            },
        },
        {
            name: "heading",
            type: "textarea",
            label: {
                cs: "Nadpis",
                en: "Heading",
            },
            required: true,
        },
        highlightedTextsField(),
        {
            name: "columns",
            type: "array",
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: "richText",
                    type: "richText",
                    editor: serviceRichText,
                    label: {
                        cs: "Obsah sloupce",
                        en: "Column content",
                    },
                    required: true,
                },
            ],
            label: {
                cs: "Textové sloupce",
                en: "Text columns",
            },
            maxRows: 3,
            minRows: 1,
            required: true,
        },
    ],
    labels: {
        plural: {
            cs: "Vícesloupcové textové bloky",
            en: "Editorial column blocks",
        },
        singular: {
            cs: "Vícesloupcový textový blok",
            en: "Editorial columns",
        },
    },
};
