import type { Block, TextFieldSingleValidation } from "payload";
import { text, textarea } from "payload/shared";

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

const validateEmployeeText: TextFieldSingleValidation = (value, options) =>
    text(typeof value === "string" ? value.trim() : "", options);

export const FormBlock: Block = {
    slug: "formBlock",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/form-simple.webp",
                alt: "Formulářový blok",
            },
        },
    },
    interfaceName: "FormBlock",
    fields: [
        {
            name: "appearance",
            type: "select",
            defaultValue: "default",
            label: {
                cs: "Vzhled",
                en: "Appearance",
            },
            options: [
                {
                    label: {
                        cs: "Výchozí",
                        en: "Default",
                    },
                    value: "default",
                },
                {
                    label: {
                        cs: "Tmavý blok domovské stránky",
                        en: "Homepage dark",
                    },
                    value: "homepageDark",
                },
            ],
        },
        {
            name: "eyebrow",
            type: "text",
            admin: {
                condition: (_, { appearance } = {}) =>
                    appearance === "homepageDark",
            },
            label: {
                cs: "Nadpis sekce",
                en: "Eyebrow",
            },
        },
        {
            name: "form",
            type: "relationship",
            label: {
                cs: "Formulář",
                en: "Form",
            },
            relationTo: "forms",
            required: true,
        },
        {
            name: "enableEmployee",
            type: "checkbox",
            defaultValue: false,
            label: {
                cs: "Zobrazit kontaktní osobu",
                en: "Show employee",
            },
        },
        {
            name: "employee",
            type: "group",
            label: {
                cs: "Kontaktní osoba",
                en: "Employee",
            },
            admin: {
                condition: (_, { enableEmployee } = {}) =>
                    Boolean(enableEmployee),
                description: {
                    cs: "Vyplňte všechny údaje. E-mail slouží pouze k zobrazení kontaktu; příjemci zpráv se nastavují ve formuláři.",
                    en: "Complete all employee details. The email is for display only; submission recipients are configured in the form.",
                },
            },
            fields: [
                {
                    name: "photo",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                    filterOptions: {
                        mimeType: { contains: "image/" },
                    },
                    label: {
                        cs: "Fotografie",
                        en: "Photo",
                    },
                },
                {
                    name: "name",
                    type: "text",
                    required: true,
                    validate: validateEmployeeText,
                    label: {
                        cs: "Jméno a příjmení",
                        en: "Full name",
                    },
                },
                {
                    name: "position",
                    type: "text",
                    required: true,
                    validate: validateEmployeeText,
                    label: {
                        cs: "Pracovní pozice",
                        en: "Position",
                    },
                },
                {
                    name: "phone",
                    type: "text",
                    required: true,
                    validate: validateEmployeeText,
                    label: {
                        cs: "Telefon",
                        en: "Phone",
                    },
                },
                {
                    name: "email",
                    type: "email",
                    required: true,
                    label: {
                        cs: "E-mail",
                        en: "Email",
                    },
                },
                {
                    name: "address",
                    type: "textarea",
                    required: true,
                    validate: (value, options) =>
                        textarea(value?.trim(), options),
                    label: {
                        cs: "Adresa",
                        en: "Address",
                    },
                },
            ],
        },
        {
            name: "enableIntro",
            type: "checkbox",
            label: {
                cs: "Povolit úvodní obsah",
                en: "Enable Intro Content",
            },
        },
        {
            name: "introContent",
            type: "richText",
            admin: {
                condition: (_, { enableIntro }) => Boolean(enableIntro),
            },
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        HeadingFeature({
                            enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                        }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ];
                },
            }),
            label: {
                cs: "Úvodní obsah",
                en: "Intro Content",
            },
        },
    ],
    graphQL: {
        singularName: "FormBlock",
    },
    labels: {
        plural: {
            cs: "Formulářové bloky",
            en: "Form Blocks",
        },
        singular: {
            cs: "Formulářový blok",
            en: "Form Block",
        },
    },
};
