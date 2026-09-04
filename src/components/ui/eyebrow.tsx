import type { ReactNode } from "react";

import { cn } from "@/utilities/ui";

type EyebrowProps = {
    align?: "center" | "left";
    as?: "dt" | "p" | "span";
    children: ReactNode;
    className?: string;
    tone?: "brand" | "inverse" | "neutral";
};

const toneClasses = {
    brand: "text-brand-500",
    inverse: "text-paper-0/90",
    neutral: "text-neutral-secondary",
} as const;

export const Eyebrow = ({
    align = "left",
    as: Component = "p",
    children,
    className,
    tone = "neutral",
}: EyebrowProps) => (
    <Component
        className={cn(
            "text-eyebrow font-medium uppercase",
            toneClasses[tone],
            align === "center" && "text-center",
            className,
        )}
    >
        {children}
    </Component>
);
