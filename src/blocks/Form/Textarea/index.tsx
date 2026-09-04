import type { TextAreaField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldValues } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RequiredMark,
} from "@/components/ui/form";
import { Textarea as TextAreaComponent } from "@/components/ui/textarea";
import React from "react";

export const Textarea: React.FC<
    TextAreaField & {
        control: Control<FieldValues>;
        rows?: number;
    }
> = ({ name, defaultValue, label, control, required, rows = 3 }) => {
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
                    <FormControl>
                        <TextAreaComponent rows={rows} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            rules={{ required: required ? "Toto pole je povinné." : false }}
        />
    );
};
