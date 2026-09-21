import type { SelectField } from "payload";
import { ValidationError } from "payload";

export const pageType: SelectField = {
    name: "pageType",
    type: "select",
    access: {
        // Payload also uses this permission to render the existing field read-only.
        update: () => false,
    },
    admin: {
        description: {
            cs: "Typ stránky nelze po prvním uložení změnit, ani u konceptu.",
            en: "The page type cannot be changed after the first save, including a draft.",
        },
        position: "sidebar",
    },
    defaultValue: "standard",
    hooks: {
        beforeChange: [
            // Access control strips the incoming value. Keep the current type
            // before validation, including when restoring a version as a draft.
            ({ operation, previousValue, value }) =>
                operation === "update" ? previousValue : value,
        ],
        beforeValidate: [
            ({ operation, previousValue, req, value }) => {
                if (operation !== "update") return value;

                // Runs before field access strips changes, including draft saves,
                // version restores and Local API calls with overrideAccess=true.
                if (value !== undefined && value !== previousValue) {
                    throw new ValidationError(
                        {
                            collection: "pages",
                            errors: [
                                {
                                    message:
                                        "Typ stránky nelze po prvním uložení změnit. Vytvořte novou stránku požadovaného typu.",
                                    path: "pageType",
                                },
                            ],
                        },
                        req.t,
                    );
                }

                // Older versions may omit the field; keep the current type.
                return previousValue;
            },
        ],
    },
    label: {
        cs: "Typ stránky",
        en: "Page type",
    },
    options: [
        {
            label: { cs: "Pobočka", en: "Branch" },
            value: "branch",
        },
        {
            label: {
                cs: "Standardní stránka",
                en: "Standard page",
            },
            value: "standard",
        },
        {
            label: {
                cs: "Služba",
                en: "Service",
            },
            value: "service",
        },
        {
            label: {
                cs: "Počítače",
                en: "Computers",
            },
            value: "computer",
        },
    ],
    required: true,
};
