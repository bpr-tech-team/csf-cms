import type { Field } from "payload";

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
        {
            name: "highlightedText",
            type: "text",
            admin: {
                description: {
                    cs: "Část hlavního nadpisu zvýrazněná zelenou barvou.",
                    en: "A substring of the heading highlighted in green.",
                },
            },
            label: {
                cs: "Zvýrazněný text",
                en: "Highlighted text",
            },
        },
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
