import type { Page } from "@/payload-types";

export type BranchInfo = NonNullable<Page["branchInfo"]>;

export const BRANCHES_CACHE_TAG = "branches";

export const phoneHref = (phone?: string | null) =>
    `tel:${(phone || "").replace(/[^\d+]/g, "")}`;

export const isGoogleMapsEmbedURL = (value: string) => {
    try {
        const url = new URL(value);
        return (
            url.protocol === "https:" &&
            ["www.google.com", "maps.google.com"].includes(url.hostname) &&
            !url.username &&
            !url.password &&
            !url.port &&
            (url.pathname === "/maps/embed" ||
                url.pathname.startsWith("/maps/embed/") ||
                (["/maps", "/maps/"].includes(url.pathname) &&
                    url.searchParams.get("output") === "embed" &&
                    Boolean(url.searchParams.get("q"))))
        );
    } catch {
        return false;
    }
};

export const branchLabels = {
    cs: {
        address: "Adresa",
        phone: "Telefon",
        email: "E-mail",
        billing: "Fakturační údaje",
        contacts: "Kontaktní údaje",
        hours: "Provozní doba",
        map: "Mapa pobočky",
    },
    en: {
        address: "Address",
        phone: "Phone",
        email: "Email",
        billing: "Billing details",
        contacts: "Contact details",
        hours: "Opening hours",
        map: "Branch location",
    },
} as const;
