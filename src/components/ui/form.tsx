"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import {
    Controller,
    FormProvider,
    useFormContext,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/utilities/ui";

const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue,
);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => (
    <FormFieldContext.Provider value={{ name: props.name }}>
        <Controller {...props} />
    </FormFieldContext.Provider>
);

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
    {} as FormItemContextValue,
);

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { formState, getFieldState } = useFormContext();

    if (!fieldContext.name) {
        throw new Error("useFormField must be used within <FormField>");
    }

    const fieldState = getFieldState(fieldContext.name, formState);
    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formDescriptionId: `${id}-description`,
        formMessageId: `${id}-message`,
        formItemId: `${id}-control`,
        ...fieldState,
    };
};

const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = React.useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                ref={ref}
                className={cn("space-y-2", className)}
                data-slot="form-item"
                {...props}
            />
        </FormItemContext.Provider>
    );
});
FormItem.displayName = "FormItem";

const FormLabel: React.FC<React.ComponentProps<typeof Label>> = ({
    className,
    ref,
    ...props
}) => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            ref={ref}
            className={cn(error && "text-destructive", className)}
            data-error={Boolean(error)}
            data-slot="form-label"
            htmlFor={formItemId}
            {...props}
        />
    );
};

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formDescriptionId, formItemId, formMessageId } =
        useFormField();

    return (
        <Slot
            ref={ref}
            aria-describedby={
                error
                    ? `${formDescriptionId} ${formMessageId}`
                    : formDescriptionId
            }
            aria-invalid={Boolean(error)}
            data-slot="form-control"
            id={formItemId}
            {...props}
        />
    );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            data-slot="form-description"
            id={formDescriptionId}
            {...props}
        />
    );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message ?? "") : children;

    if (!body) return null;

    return (
        <p
            ref={ref}
            className={cn("text-sm text-destructive", className)}
            data-slot="form-message"
            id={formMessageId}
            role={error ? "alert" : undefined}
            {...props}
        >
            {body}
        </p>
    );
});
FormMessage.displayName = "FormMessage";

const RequiredMark = () => (
    <span aria-hidden className="ml-1 text-destructive">
        *
    </span>
);

export {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    RequiredMark,
    useFormField,
};
