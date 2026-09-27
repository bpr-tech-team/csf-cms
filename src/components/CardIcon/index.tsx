import { ContentIcon } from "@/components/ContentIcon";
import type { ContentIconValue } from "@/utilities/contentIcon";
import { cn } from "@/utilities/ui";

export const CardIcon = ({
    className,
    icon,
}: {
    className?: string;
    icon?: ContentIconValue | null;
}) => (
    <span
        aria-hidden="true"
        className={cn(
            "relative flex size-16 shrink-0 items-center justify-center rounded-md bg-brand-200 text-brand-600 transition-colors duration-base group-hover:bg-border-light group-hover:text-ink-900/75",
            className,
        )}
    >
        <ContentIcon icon={icon} className="size-8" />
    </span>
);
