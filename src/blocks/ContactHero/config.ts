import type { Block } from "payload";

import { heroBackgroundField } from "@/fields/heroBackground";

export const ContactHero: Block = {
    slug: "contactHero",
    interfaceName: "ContactHeroBlock",
    labels: {
        singular: { cs: "Úvodní blok kontaktů", en: "Contact hero" },
        plural: { cs: "Úvodní bloky kontaktů", en: "Contact heroes" },
    },
    fields: [
        {
            name: "heading",
            type: "textarea",
            required: true,
            label: { cs: "Nadpis", en: "Heading" },
        },
        {
            name: "description",
            type: "textarea",
            required: true,
            label: { cs: "Popis", en: "Description" },
        },
        heroBackgroundField(),
        {
            name: "phone",
            type: "text",
            required: true,
            label: {
                cs: "Telefon pro tlačítko Volat",
                en: "Call button phone number",
            },
        },
        {
            name: "callLabel",
            type: "text",
            label: { cs: "Text tlačítka Volat", en: "Call button label" },
        },
        {
            name: "formLabel",
            type: "text",
            label: { cs: "Text tlačítka k formuláři", en: "Form button label" },
        },
    ],
};
