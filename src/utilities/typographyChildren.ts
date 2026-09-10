import type { ReactNode } from "react";

import { applyTypography, type TypographyOptions } from "./typography";

/** Format direct text children without inspecting or cloning opaque React elements. */
export function typographyChildren(
    children: ReactNode,
    options?: TypographyOptions,
): ReactNode {
    if (typeof children === "string") return applyTypography(children, options);
    if (Array.isArray(children))
        return children.map((child) => typographyChildren(child, options));
    return children;
}
