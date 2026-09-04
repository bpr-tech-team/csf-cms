import type { CheckboxField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldValues } from "react-hook-form";

import { Checkbox as CheckboxUi } from "@/components/ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RequiredMark,
} from "@/components/ui/form";
import React from "react";

export const Checkbox: React.FC<
    CheckboxField & {
        control: Control<FieldValues>;
    }
> = ({ name, defaultValue, label, control, required }) => {
    return (
        <FormField
            control={control}
            defaultValue={defaultValue ?? false}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center gap-2">
                        <FormControl>
                            <CheckboxUi
                                checked={field.value === true}
                                name={field.name}
                                onBlur={field.onBlur}
                                onCheckedChange={field.onChange}
                                ref={field.ref}
                            />
                        </FormControl>
                        <FormLabel>
                            {label}
                            {required && <RequiredMark />}
                        </FormLabel>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
            rules={{ required: required ? "Toto pole je povinné." : false }}
        />
    );
};
