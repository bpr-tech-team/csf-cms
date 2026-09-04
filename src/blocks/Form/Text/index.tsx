import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RequiredMark,
} from "@/components/ui/form";
import React from "react";

export const Text: React.FC<
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
                        <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            rules={{ required: required ? "Toto pole je povinné." : false }}
        />
    );
};
