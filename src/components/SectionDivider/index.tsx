import { cn } from "@/utilities/ui";

/** The enclosing full-width section must establish an inline-size container. */
export const SectionDivider = ({ className }: { className?: string }) => (
    <div
        aria-hidden="true"
        className={cn("h-px w-[calc(50cqw+50%)] bg-brand-500", className)}
        data-section-divider=""
    />
);
