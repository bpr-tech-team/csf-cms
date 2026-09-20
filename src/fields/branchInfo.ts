import type { GroupField, TextFieldSingleValidation } from "payload";
import { text, textarea } from "payload/shared";

import { isGoogleMapsEmbedURL } from "@/utilities/branchData";

const validateText: TextFieldSingleValidation = (value, options) =>
    text(value?.trim(), options);
const validateMapURL: TextFieldSingleValidation = (value) =>
    !value ||
    isGoogleMapsEmbedURL(value) ||
    "Vložte platnou HTTPS adresu vložené mapy Google Maps.";

export const branchInfo: GroupField = {
    name: "branchInfo",
    type: "group",
    label: { cs: "Údaje pobočky", en: "Branch details" },
    admin: {
        condition: (data) => data?.pageType === "branch",
        description: {
            cs: "Tyto údaje se zobrazují na stránce pobočky i v přehledu poboček.",
            en: "These details are shared by the branch page and branch grids.",
        },
    },
    fields: [
        {
            name: "address",
            type: "textarea",
            localized: true,
            required: true,
            validate: (value, options) => textarea(value?.trim(), options),
            label: { cs: "Adresa", en: "Address" },
        },
        {
            name: "phones",
            type: "array",
            minRows: 1,
            required: true,
            label: { cs: "Telefony", en: "Phone numbers" },
            fields: [
                {
                    name: "number",
                    type: "text",
                    required: true,
                    validate: validateText,
                    label: { cs: "Telefonní číslo", en: "Phone number" },
                },
            ],
        },
        {
            name: "email",
            type: "email",
            required: true,
            label: { cs: "E-mail", en: "Email" },
        },
        {
            name: "companyName",
            type: "text",
            label: { cs: "Název společnosti", en: "Company name" },
        },
        {
            type: "row",
            fields: [
                {
                    name: "companyId",
                    type: "text",
                    label: { cs: "IČ", en: "Company ID" },
                },
                {
                    name: "vatId",
                    type: "text",
                    label: { cs: "DIČ", en: "VAT ID" },
                },
            ],
        },
        {
            name: "openingHours",
            type: "array",
            label: { cs: "Provozní doba", en: "Opening hours" },
            admin: {
                description: {
                    cs: "Volitelné. Každý řádek může obsahovat jeden den nebo skupinu dnů.",
                    en: "Optional. Each row can describe one day or a group of days.",
                },
            },
            fields: [
                {
                    name: "days",
                    type: "text",
                    localized: true,
                    required: true,
                    label: { cs: "Den / dny", en: "Day / days" },
                },
                {
                    name: "hours",
                    type: "text",
                    localized: true,
                    required: true,
                    label: { cs: "Čas nebo poznámka", en: "Hours or note" },
                },
            ],
        },
        {
            name: "mapEmbedUrl",
            type: "text",
            label: {
                cs: "Google Maps – URL pro vložení",
                en: "Google Maps embed URL",
            },
            admin: {
                description: {
                    cs: "V Google Maps zvolte Sdílet → Vložení mapy. Vložte pouze URL z atributu src, nikoli celý HTML kód.",
                    en: "In Google Maps choose Share → Embed a map. Paste only the src URL, not the full HTML code.",
                },
            },
            validate: validateMapURL,
        },
        {
            name: "icon",
            type: "upload",
            relationTo: "media",
            filterOptions: { mimeType: { contains: "image/" } },
            label: { cs: "Ikona v přehledu poboček", en: "Branch card icon" },
        },
    ],
};
