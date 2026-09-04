import { cn } from "@/utilities/ui";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const alertVariants = cva(
    "relative grid w-full grid-cols-[0_1fr] gap-y-1 rounded-md border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    {
        variants: {
            variant: {
                default: "border-border bg-card text-card-foreground",
                destructive:
                    "border-destructive/30 bg-destructive/10 text-destructive",
                success: "border-success/30 bg-success/10 text-success",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

type AlertProps = React.ComponentProps<"div"> &
    VariantProps<typeof alertVariants>;

const Alert: React.FC<AlertProps> = ({ className, variant, ...props }) => (
    <div
        className={cn(alertVariants({ variant }), className)}
        data-slot="alert"
        {...props}
    />
);

const AlertTitle: React.FC<React.ComponentProps<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn(
            "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
            className,
        )}
        data-slot="alert-title"
        {...props}
    />
);

const AlertDescription: React.FC<React.ComponentProps<"div">> = ({
    className,
    ...props
}) => (
    <div
        className={cn(
            "col-start-2 text-sm text-current/90 [&_p]:leading-relaxed",
            className,
        )}
        data-slot="alert-description"
        {...props}
    />
);

export { Alert, AlertDescription, AlertTitle };
