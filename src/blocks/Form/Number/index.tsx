import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldValues } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RequiredMark,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

export const Number: React.FC<
    TextField & {
        control: Control<FieldValues>;
    }
> = ({ name, defaultValue, label, control, required }) => {
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
                        <Input inputMode="decimal" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            rules={{ required: required ? "Toto pole je povinné." : false }}
        />
    );
};
