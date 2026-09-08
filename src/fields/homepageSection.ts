import type { Field } from "payload";

import { highlightedTextsField } from "@/fields/highlightedTexts";

type HomepageSectionIntroOptions = {
    includeDescription?: boolean;
};

export const homepageSectionIntro = ({
    includeDescription = false,
}: HomepageSectionIntroOptions = {}): Field[] => {
    const fields: Field[] = [
        {
            name: "eyebrow",
            type: "text",
            label: {
                cs: "Nadpis sekce",
                en: "Eyebrow",
            },
        },
        {
            name: "heading",
            type: "textarea",
            label: {
                cs: "Hlavní nadpis",
                en: "Heading",
            },
            required: true,
        },
        highlightedTextsField(),
    ];

    if (includeDescription) {
        fields.push({
            name: "description",
            type: "textarea",
            label: {
                cs: "Popis",
                en: "Description",
            },
        });
    }

    return fields;
};
