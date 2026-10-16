import type { CollapsibleField, Field } from "payload";

/** Apply the content editor's collapsed defaults without changing shared blocks. */
export function collapseContentFields(fields: Field[]): Field[] {
    return fields.map((field): Field => {
        switch (field.type) {
            case "array":
                return {
                    ...field,
                    fields: collapseContentFields(field.fields),
                    admin: {
                        ...field.admin,
                        initCollapsed: true,
                        components: {
                            ...field.admin?.components,
                            Field: "@/fields/ContentLayoutField#ContentArrayField",
                        },
                    },
                };
            case "collapsible": {
                const collapsedField: CollapsibleField = { ...field };
                collapsedField.fields = collapseContentFields(field.fields);
                collapsedField.admin = {
                    ...field.admin,
                    initCollapsed: true,
                    components: {
                        ...field.admin?.components,
                        Field: "@/fields/ContentLayoutField#ContentCollapsibleField",
                    },
                };
                return collapsedField;
            }
            case "blocks":
                return {
                    ...field,
                    blocks: field.blocks.map((block) => ({
                        ...block,
                        fields: collapseContentFields(block.fields),
                    })),
                    admin: {
                        ...field.admin,
                        initCollapsed: true,
                        components: {
                            ...field.admin?.components,
                            Field: "@/fields/ContentLayoutField#ContentLayoutField",
                        },
                    },
                };
            case "group":
            case "row":
                return {
                    ...field,
                    fields: collapseContentFields(field.fields),
                };
            case "tabs":
                return {
                    ...field,
                    tabs: field.tabs.map((tab) => ({
                        ...tab,
                        fields: collapseContentFields(tab.fields),
                    })),
                };
            default:
                return field;
        }
    });
}
