"use client";

import { cn } from "@/utilities/ui";
import { useLocale } from "@/providers/Locale";
import { typographyChildren } from "@/utilities/typographyChildren";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label: React.FC<
    {
        ref?: React.Ref<HTMLLabelElement>;
        typography?: boolean;
    } & React.ComponentProps<typeof LabelPrimitive.Root> &
        VariantProps<typeof labelVariants>
> = ({ className, ref, children, typography = true, ...props }) => {
    const locale = useLocale();
    return (
        <LabelPrimitive.Root
            className={cn(labelVariants(), className)}
            ref={ref}
            {...props}
        >
            {typographyChildren(children, { enabled: typography, locale })}
        </LabelPrimitive.Root>
    );
};

export { Label };
