import type { AppLocale } from "@/i18n/config";
import type { BranchDirectoryEntry } from "@/utilities/getBranches";
import { getPagePath } from "@/utilities/getPagePath";

import { getCanonicalUrl, seoConfig } from "./config";

export const branchPostalAddress = (value?: string | null) => {
    const address = value?.trim();
    if (!address) return undefined;

    const lines = address
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    const locality = /^(\d{3})\s+(\d{2})\s+(.+)$/u.exec(lines.at(-1) ?? "");

    // Existing Czech addresses end with "500 02 Hradec Králové". Only
    // split that explicit format; other addresses remain valid Schema.org Text.
    if (lines.length < 2 || !locality) return address;

    return {
        "@type": "PostalAddress",
        streetAddress: lines.slice(0, -1).join(", "),
        postalCode: `${locality[1]} ${locality[2]}`,
        addressLocality: locality[3],
        addressCountry: "CZ",
    };
};

export const branchJsonLd = (
    branch: BranchDirectoryEntry,
    locale: AppLocale,
) => {
    const title = branch.title?.trim();
    const address = branchPostalAddress(branch.branchInfo?.address);
    if (
        branch.pageType !== "branch" ||
        !title ||
        !branch.slug?.trim() ||
        !address
    )
        return null;

    const url = getCanonicalUrl(getPagePath(branch, locale));

    return {
        "@type": "LocalBusiness",
        "@id": `${getCanonicalUrl()}/#branch-${branch.id}`,
        name: title.startsWith(`${seoConfig.siteName} `)
            ? title
            : `${seoConfig.siteName} ${title}`,
        url,
        address,
        telephone: branch.branchInfo?.phones?.[0]?.number?.trim() || undefined,
        email: branch.branchInfo?.email?.trim() || undefined,
        branchOf: { "@id": `${getCanonicalUrl()}/#organization` },
    };
};
