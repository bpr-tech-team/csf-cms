"use client";

import { cn } from "@/utilities/ui";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-label-md font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-fast ease-standard disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring aria-invalid:outline-error",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-brand-400 active:bg-brand-600",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                clear: "",
                default: "h-12 px-6 has-[>svg]:px-5",
                sm: "h-11 px-5 has-[>svg]:px-4",
                lg: "h-[3.25rem] px-7 has-[>svg]:px-6",
                icon: "size-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends
        React.ComponentProps<"button">,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    asChild = false,
    className,
    size,
    variant,
    ...props
}) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
};

export { Button, buttonVariants };
