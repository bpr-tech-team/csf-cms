import type { Page } from "@/payload-types";
import type { Where } from "payload";

export const pageTypeViews = [
    { value: "standard", label: "Standardní stránky" },
    { value: "service", label: "Služby" },
    { value: "computer", label: "Počítače" },
    { value: "branch", label: "Pobočky" },
] as const satisfies { value: Page["pageType"]; label: string }[];

export function pageTypeWhere(pageType: Page["pageType"]): Where {
    return { and: [{ pageType: { equals: pageType } }] };
}

// Payload's filter editor can wrap conditions in AND / OR groups.
export function activePageType(where: unknown): Page["pageType"] | undefined {
    if (!where || typeof where !== "object") return undefined;

    const filter = where as Where;
    const value = !Array.isArray(filter.pageType)
        ? filter.pageType?.equals
        : undefined;
    if (pageTypeViews.some((view) => view.value === value)) {
        return value as Page["pageType"];
    }

    if (Array.isArray(filter.and)) {
        const types = filter.and.map(activePageType).filter(Boolean);
        if (types.length && types.every((type) => type === types[0])) {
            return types[0];
        }
    }

    if (Array.isArray(filter.or) && filter.or.length) {
        const types = filter.or.map(activePageType);
        if (types.every((type) => type === types[0])) return types[0];
    }

    return undefined;
}
