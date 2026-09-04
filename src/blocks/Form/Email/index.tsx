import type { EmailField } from "@payloadcms/plugin-form-builder/types";
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

export const Email: React.FC<
    EmailField & {
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
                        <Input autoComplete="email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            rules={{
                pattern: {
                    message: "Zadejte platnou e-mailovou adresu.",
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                },
                required: required ? "Toto pole je povinné." : false,
            }}
        />
    );
};
