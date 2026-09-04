import type { StateField } from "@payloadcms/plugin-form-builder/types";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

import { stateOptions } from "./options";

export const State: React.FC<
    StateField & {
        control: Control<FieldValues>;
    }
> = ({ name, control, defaultValue, label, required }) => {
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
                    <Select
                        name={field.name}
                        onValueChange={field.onChange}
                        value={field.value || undefined}
                    >
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={label} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {stateOptions.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
            rules={{ required: required ? "Toto pole je povinné." : false }}
        />
    );
};
