import type { Block } from "payload";

import { clientServiceDefaults } from "./defaults";

export const ClientService: Block = {
    slug: "clientService",
    interfaceName: "ClientServiceBlock",
    labels: {
        singular: { cs: "Přihlášení", en: "Client sign-in" },
        plural: { cs: "Přihlašovací bloky", en: "Client sign-in blocks" },
    },
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/client-service.webp",
                alt: "Přihlášení do zákaznické zóny",
            },
        },
    },
    fields: [
        {
            name: "eyebrow",
            type: "text",
            label: { cs: "Podtitulek nad nadpisem", en: "Eyebrow" },
            defaultValue: clientServiceDefaults.eyebrow,
        },
        {
            name: "heading",
            type: "text",
            label: { cs: "Nadpis", en: "Heading" },
            defaultValue: clientServiceDefaults.heading,
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            label: { cs: "Popis", en: "Description" },
            defaultValue: clientServiceDefaults.description,
        },
        {
            name: "loginLabel",
            type: "text",
            label: { cs: "Popisek přihlašovacího jména", en: "Login label" },
            defaultValue: clientServiceDefaults.loginLabel,
            required: true,
        },
        {
            name: "loginPlaceholder",
            type: "text",
            label: {
                cs: "Nápověda přihlašovacího jména",
                en: "Login placeholder",
            },
            defaultValue: clientServiceDefaults.loginPlaceholder,
        },
        {
            name: "passwordLabel",
            type: "text",
            label: { cs: "Popisek hesla", en: "Password label" },
            defaultValue: clientServiceDefaults.passwordLabel,
            required: true,
        },
        {
            name: "passwordPlaceholder",
            type: "text",
            label: { cs: "Nápověda hesla", en: "Password placeholder" },
            defaultValue: clientServiceDefaults.passwordPlaceholder,
        },
        {
            name: "submitButtonLabel",
            type: "text",
            label: { cs: "Text tlačítka", en: "Button label" },
            defaultValue: clientServiceDefaults.submitButtonLabel,
            required: true,
        },
    ],
};
