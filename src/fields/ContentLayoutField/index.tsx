"use client";

import {
    ArrayField,
    BlocksField,
    Collapsible,
    ErrorPill,
    FieldDescription,
    FieldLabel,
    RenderFields,
    RowLabel,
    WatchChildErrors,
    useDocumentInfo,
    useField,
    useForm,
    useFormFields,
    useFormInitializing,
    useLocale,
    useTranslation,
    withCondition,
} from "@payloadcms/ui";
import type {
    ArrayFieldClientComponent,
    BlocksFieldClientComponent,
    CollapsibleFieldClientComponent,
} from "payload";
import { useLayoutEffect, useState } from "react";

function useInitiallyCollapsedRows(path: string) {
    const { initialState } = useDocumentInfo();
    const initializing = useFormInitializing();
    const { dispatchFields } = useForm();
    const rows = useFormFields(([fields]) => fields[path]?.rows);
    const initialRows = initialState?.[path]?.rows;

    useLayoutEffect(() => {
        if (initializing || !rows || rows !== initialRows) {
            return;
        }

        // Wait for Form's mount/reset effect, then replace only the server's
        // initial rows. User toggles and newly added rows have a new reference.
        if (rows.some((row) => !row.collapsed)) {
            dispatchFields({
                type: "SET_ALL_ROWS_COLLAPSED",
                path,
                updatedRows: rows.map((row) => ({ ...row, collapsed: true })),
            });
        }
    }, [dispatchFields, initialRows, initializing, path, rows]);
}

export const ContentLayoutField: BlocksFieldClientComponent = (props) => {
    useInitiallyCollapsedRows(props.path);
    return <BlocksField {...props} />;
};

export const ContentArrayField: ArrayFieldClientComponent = (props) => {
    useInitiallyCollapsedRows(props.path);
    return <ArrayField {...props} />;
};

const ContentCollapsible: CollapsibleFieldClientComponent = ({
    field,
    path,
    indexPath,
    parentPath,
    parentSchemaPath,
    permissions,
    readOnly,
}) => {
    const { id } = useDocumentInfo();
    const { code: locale } = useLocale();
    const { i18n } = useTranslation();
    const { disabled, customComponents } = useField({ path });
    const [errorCount, setErrorCount] = useState(0);

    return (
        <div
            className={[
                "field-type",
                "collapsible-field",
                field.admin?.className,
            ]
                .filter(Boolean)
                .join(" ")}
            style={field.admin?.style}
        >
            <WatchChildErrors
                fields={field.fields}
                path={path.split(".").slice(0, -1)}
                setErrorCount={setErrorCount}
            />
            {customComponents?.BeforeInput}
            <Collapsible
                className="collapsible-field__collapsible"
                collapsibleStyle={errorCount > 0 ? "error" : "default"}
                header={
                    <div className="collapsible-field__row-label-wrap">
                        <RowLabel
                            CustomComponent={customComponents?.Label}
                            label={
                                <FieldLabel
                                    as="span"
                                    label={field.label}
                                    path={path}
                                />
                            }
                            path={path}
                        />
                        {errorCount > 0 && (
                            <ErrorPill
                                count={errorCount}
                                i18n={i18n}
                                withMessage
                            />
                        )}
                    </div>
                }
                initCollapsed
                key={JSON.stringify([id, locale, path])}
            >
                <RenderFields
                    fields={field.fields}
                    margins="small"
                    parentIndexPath={indexPath ?? ""}
                    parentPath={parentPath ?? ""}
                    parentSchemaPath={parentSchemaPath ?? ""}
                    permissions={permissions ?? true}
                    readOnly={readOnly || disabled}
                />
            </Collapsible>
            {customComponents?.AfterInput}
            {customComponents?.Description ?? (
                <FieldDescription
                    description={field.admin?.description}
                    path={path}
                />
            )}
        </div>
    );
};

export const ContentCollapsibleField = withCondition(ContentCollapsible);
