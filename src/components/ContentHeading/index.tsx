import type { ReactNode } from "react";

import { ContentIcon } from "@/components/ContentIcon";
import {
    defaultContentHeadingIcon,
    type ContentIconValue,
} from "@/utilities/contentIcon";
import { cn } from "@/utilities/ui";

import styles from "./styles.module.css";

export const ContentHeading = ({
    children,
    icon,
    className,
}: {
    children: ReactNode;
    icon?: ContentIconValue | null;
    className?: string;
}) => (
    <div className={styles.heading} data-content-heading>
        <h3 className={cn(styles.title, className)} data-reveal="heading">
            <span data-content-heading-text>{children}</span>
        </h3>
        <span className={styles.decoration} aria-hidden="true">
            <span className={styles.line} data-content-line />
            <span className={styles.icon} data-content-icon>
                <ContentIcon
                    icon={
                        icon ?? {
                            source: "fontawesome",
                            fontAwesome: defaultContentHeadingIcon,
                        }
                    }
                    className={styles.artwork}
                />
            </span>
        </span>
    </div>
);
