import type { GlobalConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { revalidateContactDetails } from "./hooks/revalidateContactDetails";

export const ContactDetails: GlobalConfig = {
    slug: "contact-details",
    typescript: { interface: "ContactDetails" },
    label: { cs: "Kontaktní údaje", en: "Contact details" },
    access: { read: () => true, update: authenticated },
    admin: {
        description: {
            cs: "Společné kontakty pro celý web a všechny jazyky. Patička je přebírá automaticky prostřednictvím bloku Kontakty. Prázdné údaje se nezobrazují.",
            en: "Shared contacts for the website and all languages. Footer contact blocks use these values automatically. Empty values are hidden.",
        },
    },
    fields: [
        { name: "phone", type: "text", label: { cs: "Telefon", en: "Phone" } },
        { name: "email", type: "email", label: "Email" },
        {
            name: "dataBoxId",
            type: "text",
            label: { cs: "ID datové schránky", en: "Data box ID" },
        },
        {
            name: "socialLinks",
            type: "array",
            label: {
                cs: "Sociální sítě a další odkazy",
                en: "Social networks and other links",
            },
            labels: {
                singular: { cs: "Odkaz", en: "Link" },
                plural: { cs: "Odkazy", en: "Links" },
            },
            admin: {
                initCollapsed: true,
                components: {
                    RowLabel: "@/globals/ContactDetails/RowLabel#RowLabel",
                },
                description: {
                    cs: "Volitelný seznam. Můžete přidat libovolnou síť nebo další kontakt a změnit jejich pořadí.",
                    en: "Optional list. Add any network or contact link and change their order.",
                },
            },
            fields: [
                {
                    name: "label",
                    type: "text",
                    required: true,
                    label: { cs: "Název", en: "Name" },
                },
                {
                    name: "url",
                    type: "text",
                    required: true,
                    label: "URL",
                    validate: (value: unknown) => {
                        if (!value) return "Zadejte URL odkazu.";
                        try {
                            const url = new URL(String(value));
                            return (
                                (["https:", "http:"].includes(url.protocol) &&
                                    !url.username &&
                                    !url.password) ||
                                "Zadejte platnou HTTP nebo HTTPS adresu."
                            );
                        } catch {
                            return "Zadejte platnou HTTP nebo HTTPS adresu.";
                        }
                    },
                },
            ],
        },
    ],
    hooks: { afterChange: [revalidateContactDetails] },
};
