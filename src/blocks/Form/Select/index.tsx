import type { SelectField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldValues } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RequiredMark,
} from "@/components/ui/form";
import {
    Select as SelectComponent,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

export const Select: React.FC<
    SelectField & {
        control: Control<FieldValues>;
    }
> = ({
    name,
    control,
    label,
    options,
    placeholder,
    required,
    defaultValue,
}) => {
    return (
        <FormField
            control={control}
            defaultValue={defaultValue ?? ""}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                        {required && <RequiredMark />}
                    </FormLabel>
                    <SelectComponent
                        name={field.name}
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                    >
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={placeholder || label}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectComponent>
                    <FormMessage />
                </FormItem>
            )}
            rules={{ required: required ? "Toto pole je povinné." : false }}
        />
    );
};
