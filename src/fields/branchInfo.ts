import { contentIcon } from "@/fields/contentIcon";
import { galleryImagesField } from "@/fields/gallery";
import type { GroupField, TextFieldSingleValidation } from "payload";
import { text, textarea } from "payload/shared";

import { branchMapPositions } from "@/components/BranchesMap/positions";
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
            name: "mapPosition",
            type: "select",
            label: {
                cs: "Zvýrazněný bod na mapě",
                en: "Highlighted map point",
            },
            options: Object.entries(branchMapPositions).map(
                ([value, { label }]) => ({ value, label }),
            ),
            admin: {
                description: {
                    cs: "Bod zvýrazněný v úvodním bloku pobočky, společný pro všechny jazyky. Bez výběru se mapa zobrazí bez zvýrazněného bodu.",
                    en: "Point highlighted in the branch hero, shared across all languages. Leave empty to display the map without a highlighted point.",
                },
            },
        },
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
            labels: {
                singular: { cs: "Telefon", en: "Phone" },
                plural: { cs: "Telefony", en: "Phones" },
            },
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
            labels: {
                singular: {
                    cs: "Záznam provozní doby",
                    en: "Opening hours entry",
                },
                plural: {
                    cs: "Záznamy provozní doby",
                    en: "Opening hours entries",
                },
            },
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
            ...galleryImagesField({ required: false, minRows: 0 }),
            admin: {
                description: {
                    cs: "Volitelné fotografie pobočky, společné pro všechny jazyky. Pořadí můžete měnit přetažením. Alternativní text se přebírá z média v aktuálním jazyce.",
                    en: "Optional branch photos, shared across all languages. Drag to reorder. Each image uses the media's alt text in the current language.",
                },
            },
        },
        {
            name: "mapEmbedUrl",
            type: "text",
            label: {
                cs: "Google Maps – URL pro vložení",
                en: "Google Maps embed URL",
            },
            admin: {
                hidden: true,
                description: {
                    cs: "V Google Maps zvolte Sdílet → Vložení mapy. Vložte pouze URL z atributu src, nikoli celý HTML kód.",
                    en: "In Google Maps choose Share → Embed a map. Paste only the src URL, not the full HTML code.",
                },
            },
            validate: validateMapURL,
        },
        contentIcon({
            label: { cs: "Ikona v přehledu poboček", en: "Branch card icon" },
        }),
    ],
};
