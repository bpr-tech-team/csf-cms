import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { BranchDirectoryEntry } from "@/utilities/getBranches";
import { branchJsonLd, branchPostalAddress } from "./branchData";
import { getCanonicalUrl } from "./config";
import {
    JsonLd,
    organizationJsonLd,
    professionalServiceJsonLd,
} from "./structuredData";

const branch: BranchDirectoryEntry = {
    id: 12,
    title: "Hradec Králové",
    slug: "hradec-kralove",
    pageType: "branch",
    branchInfo: {
        mapPosition: "hradec-kralove",
        address: "Střelecká 672\n500 02 Hradec Králové",
        phones: [{ number: "+420 495 533 495" }],
        email: "info@example.com",
        icon: { source: "fontawesome", fontAwesome: "solid/location-dot" },
    },
};

describe("branch structured data", () => {
    it("uses current branch contacts and the canonical localized page URL", () => {
        const data = branchJsonLd(
            { ...branch, title: "Hradec office", slug: "hradec-office" },
            "en",
        )!;
        expect(data.name).toBe("CSF Hradec office");
        expect(data.url).toBe(getCanonicalUrl("/en/contact/hradec-office"));
        expect(data.telephone).toBe("+420 495 533 495");
        expect(data.email).toBe("info@example.com");
        expect(data.address).toEqual({
            "@type": "PostalAddress",
            streetAddress: "Střelecká 672",
            postalCode: "500 02",
            addressLocality: "Hradec Králové",
            addressCountry: "CZ",
        });
        expect(data["@id"]).toBe(branchJsonLd(branch, "cs")!["@id"]);
    });

    it("reflects a changed address and phone without a separate SEO copy", () => {
        const changed = {
            ...branch,
            branchInfo: {
                ...branch.branchInfo!,
                address: "Nová 25\n110 00 Praha",
                phones: [{ number: "+420 123 456 789" }],
            },
        };
        const data = professionalServiceJsonLd(undefined, {
            branches: [changed],
            headOffice: changed,
        });
        expect(data.address).toEqual(data.department[0].address);
        expect(data.department[0].telephone).toBe("+420 123 456 789");
        expect(JSON.stringify(data)).not.toContain("Střelecká");
    });

    it("includes published test pages passed by the public directory", () => {
        const testPage = {
            ...branch,
            id: 256,
            title: "Test pobočky – Hradec Králové",
            slug: "test-branch-hradec-kralove",
        };
        const data = professionalServiceJsonLd(undefined, {
            branches: [branch, testPage],
        });
        expect(data.department).toHaveLength(2);
        expect(data.department.map((entry) => entry["@id"])).toEqual([
            `${getCanonicalUrl()}/#branch-12`,
            `${getCanonicalUrl()}/#branch-256`,
        ]);
    });

    it("does not guess a head office or substitute another branch", () => {
        expect(organizationJsonLd({}, undefined).address).toBeUndefined();
        expect(
            professionalServiceJsonLd({}, { branches: [branch] }).address,
        ).toBeUndefined();
        expect(organizationJsonLd({}, branch).address).toEqual(
            branchPostalAddress(branch.branchInfo!.address),
        );
    });

    it.each(["Somewhere abroad", "148 W 51st St\n10019 New York", "Praha"])(
        "preserves unstructured address text without inventing its parts: %s",
        (address) => {
            expect(branchPostalAddress(address)).toBe(address);
        },
    );

    it("normalizes explicit Czech postal formatting without losing address lines", () => {
        expect(
            branchPostalAddress(
                "Záběhlický zámek\r\n Za potokem 46/4\r\n106\u00a000 Praha 10-Záběhlice",
            ),
        ).toEqual({
            "@type": "PostalAddress",
            streetAddress: "Záběhlický zámek, Za potokem 46/4",
            postalCode: "106 00",
            addressLocality: "Praha 10-Záběhlice",
            addressCountry: "CZ",
        });
    });

    it("omits incomplete branch entries and does not duplicate an existing brand prefix", () => {
        expect(branchJsonLd({ ...branch, slug: "" }, "cs")).toBeNull();
        expect(
            branchJsonLd({ ...branch, pageType: "standard" }, "cs"),
        ).toBeNull();
        expect(
            branchJsonLd({ ...branch, title: "CSF Praha" }, "cs")?.name,
        ).toBe("CSF Praha");
    });

    it("escapes CMS text before placing structured data in a script", () => {
        const payload = professionalServiceJsonLd(
            {},
            {
                branches: [
                    { ...branch, title: "</script><script>alert(1)</script>" },
                ],
            },
        );
        const html = renderToStaticMarkup(<JsonLd data={payload} />);
        expect(html).not.toContain("</script><script>");
        expect(html).toContain("\\u003c/script>");
    });
});
