import type { Block } from "payload";

import { link } from "@/fields/link";
import { contentIcon } from "@/fields/contentIcon";

export const footerBlocks: Block[] = [
    {
        slug: "footerBrand",
        interfaceName: "FooterBrandBlock",
        labels: {
            singular: { cs: "Logo a popis", en: "Logo and description" },
            plural: { cs: "Loga a popisy", en: "Logos and descriptions" },
        },
        fields: [
            {
                name: "logo",
                type: "upload",
                relationTo: "media",
                label: { cs: "Logo", en: "Logo" },
                filterOptions: { mimeType: { contains: "image/" } },
                admin: {
                    description: {
                        cs: "Bez obrázku se použije výchozí logo CSF.",
                        en: "Uses the default CSF logo when no image is selected.",
                    },
                },
            },
            {
                name: "description",
                type: "textarea",
                localized: true,
                label: {
                    cs: "Popis pod logem",
                    en: "Description below the logo",
                },
            },
        ],
    },
    {
        slug: "footerContacts",
        interfaceName: "FooterContactsBlock",
        labels: {
            singular: { cs: "Kontakty", en: "Contacts" },
            plural: { cs: "Kontaktní bloky", en: "Contact blocks" },
        },
        fields: [
            {
                name: "items",
                type: "array",
                label: { cs: "Zobrazené kontakty", en: "Displayed contacts" },
                labels: {
                    singular: { cs: "Kontakt", en: "Contact" },
                    plural: { cs: "Kontakty", en: "Contacts" },
                },
                defaultValue: [
                    {
                        kind: "phone",
                        icon: {
                            source: "fontawesome",
                            fontAwesome: "solid/phone",
                        },
                    },
                    {
                        kind: "email",
                        icon: {
                            source: "fontawesome",
                            fontAwesome: "solid/envelope",
                        },
                    },
                    {
                        kind: "dataBox",
                        icon: {
                            source: "fontawesome",
                            fontAwesome: "solid/inbox",
                        },
                    },
                ],
                admin: {
                    description: {
                        cs: "Hodnoty se přebírají ze sekce Kontaktní údaje. Zde vybíráte zobrazené kontakty, sociální sítě, jejich pořadí a ikony.",
                        en: "Uses the Contact details section. Choose which contacts and social links appear here, their order and their icons.",
                    },
                },
                fields: [
                    {
                        name: "kind",
                        type: "select",
                        required: true,
                        defaultValue: "phone",
                        label: { cs: "Typ kontaktu", en: "Contact type" },
                        options: [
                            {
                                label: { cs: "Telefon", en: "Phone" },
                                value: "phone",
                            },
                            { label: "Email", value: "email" },
                            {
                                label: {
                                    cs: "Sociální síť / další odkaz",
                                    en: "Social network / other link",
                                },
                                value: "socialLink",
                            },
                            {
                                label: {
                                    cs: "Datová schránka",
                                    en: "Data box",
                                },
                                value: "dataBox",
                            },
                        ],
                    },
                    {
                        name: "socialLinkId",
                        type: "text",
                        required: true,
                        label: {
                            cs: "Sociální síť / odkaz",
                            en: "Social network / link",
                        },
                        admin: {
                            condition: (_, siblingData) =>
                                siblingData.kind === "socialLink",
                            components: {
                                Field: "@/globals/Footer/SocialLinkField#SocialLinkField",
                            },
                            description: {
                                cs: "Odkazy spravujete v samostatné sekci Kontaktní údaje.",
                                en: "Manage the available links in the separate Contact details section.",
                            },
                        },
                    },
                    {
                        name: "label",
                        type: "text",
                        localized: true,
                        label: { cs: "Vlastní popisek", en: "Custom label" },
                        admin: {
                            description: {
                                cs: "Volitelný text před hodnotou kontaktu. U sociální sítě přepíše název odkazu.",
                                en: "Optional text before the contact value. Overrides the link name for a social network.",
                            },
                        },
                    },
                    contentIcon({ defaultFontAwesome: "solid/phone" }),
                ],
            },
        ],
    },
    {
        slug: "footerText",
        interfaceName: "FooterTextBlock",
        labels: {
            singular: { cs: "Text", en: "Text" },
            plural: { cs: "Textové bloky", en: "Text blocks" },
        },
        fields: [
            {
                name: "text",
                type: "richText",
                localized: true,
                required: true,
                label: { cs: "Text", en: "Text" },
            },
        ],
    },
    {
        slug: "footerLinks",
        interfaceName: "FooterLinksBlock",
        labels: {
            singular: { cs: "Odkazy", en: "Links" },
            plural: { cs: "Seznamy odkazů", en: "Link lists" },
        },
        fields: [
            {
                name: "links",
                type: "array",
                label: { cs: "Odkazy", en: "Links" },
                labels: {
                    singular: { cs: "Odkaz", en: "Link" },
                    plural: { cs: "Odkazy", en: "Links" },
                },
                fields: [link({ appearances: false })],
            },
        ],
    },
];
