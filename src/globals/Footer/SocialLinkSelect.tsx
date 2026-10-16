"use client";

import { FieldError, SelectInput, useField } from "@payloadcms/ui";
import type { OptionObject, TextFieldClientProps } from "payload";

export function SocialLinkSelect({
    field,
    path,
    readOnly,
    options,
}: TextFieldClientProps & { options: OptionObject[] }) {
    const { value, setValue, showError, errorMessage, disabled } =
        useField<string>({ path });

    return (
        <SelectInput
            Error={
                <FieldError
                    path={path}
                    showError={showError}
                    message={errorMessage}
                />
            }
            label={field.label}
            name={field.name}
            onChange={(selected) =>
                setValue(
                    selected && !Array.isArray(selected)
                        ? selected.value
                        : null,
                )
            }
            options={
                value && !options.some((option) => option.value === value)
                    ? [
                          ...options,
                          {
                              label: "Odkaz byl odstraněn — vyberte jiný",
                              value,
                          },
                      ]
                    : options
            }
            path={path}
            readOnly={readOnly || disabled}
            required={field.required}
            showError={showError}
            value={value || ""}
        />
    );
}
