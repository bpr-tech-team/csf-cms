import type {
    Field,
    RelationshipFieldSingleValidation,
    TextareaFieldValidation,
} from "payload";

type FieldsOverride = (args: { defaultFields: Field[] }) => Field[];

const placeholders: Record<string, string> = {
    emailTo: '"Příjemce" <prijemce@example.com>',
    replyTo: '"Adresa pro odpověď" <odpoved@example.com>',
    emailFrom: '"Odesílatel" <odesilatel@example.com>',
};

// Keep the plugin's fields, components and validation; only supply missing UI text.
const localizeFormField = (field: Field): Field => {
    if ("fields" in field) {
        field = { ...field, fields: field.fields.map(localizeFormField) };
    }
    if (field.type === "blocks") {
        field = {
            ...field,
            blocks: field.blocks.map((block) => ({
                ...block,
                fields: block.fields.map(localizeFormField),
            })),
        };
    }
    if (!("name" in field)) return field;

    if (field.type === "array" && field.name === "emails") {
        return {
            ...field,
            label: "E-maily",
            labels: { singular: "E-mail", plural: "E-maily" },
        };
    }
    if (field.type === "richText" && field.name === "message") {
        return { ...field, label: "Zpráva" };
    }
    if (field.type === "text" && placeholders[field.name]) {
        return {
            ...field,
            admin: { ...field.admin, placeholder: placeholders[field.name] },
        };
    }
    if (field.type === "text" && field.name === "subject") {
        return {
            ...field,
            defaultValue: ({ locale }) =>
                locale === "en"
                    ? "You've received a new message."
                    : "Obdrželi jste novou zprávu.",
        };
    }
    return field;
};

export const formLabels: FieldsOverride = ({ defaultFields }) =>
    defaultFields.map(localizeFormField);

export const formSubmissionLabels: FieldsOverride = ({ defaultFields }) =>
    defaultFields.map((field): Field => {
        if (
            field.type === "relationship" &&
            field.name === "form" &&
            !field.hasMany
        ) {
            const validate = field.validate;
            return {
                ...field,
                label: "Formulář",
                validate: validate
                    ? ((async (value, options) => {
                          const result = await validate(value, options);
                          return typeof result === "string"
                              ? "Odeslání nelze vytvořit, protože formulář neexistuje."
                              : result;
                      }) satisfies RelationshipFieldSingleValidation)
                    : undefined,
            };
        }
        if (field.type === "array" && field.name === "submissionData") {
            return {
                ...field,
                label: "Odeslané údaje",
                labels: { singular: "Údaj", plural: "Údaje" },
                fields: field.fields.map((child): Field => {
                    if (child.type === "text" && child.name === "field") {
                        return { ...child, label: "Pole" };
                    }
                    if (child.type === "textarea" && child.name === "value") {
                        return {
                            ...child,
                            label: "Hodnota",
                            validate: ((value, { req }) =>
                                value !== undefined ||
                                req.t(
                                    "validation:required",
                                )) satisfies TextareaFieldValidation,
                        };
                    }
                    return child;
                }),
            };
        }
        return field;
    });
