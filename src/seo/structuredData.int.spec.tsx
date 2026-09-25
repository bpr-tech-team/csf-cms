import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { JsonLd } from "./structuredData";

function parseRenderedJsonLd(data: unknown) {
    const html = renderToStaticMarkup(<JsonLd data={data} />);

    return new DOMParser().parseFromString(
        `<html><body>${html}<main>After JSON-LD</main></body></html>`,
        "text/html",
    );
}

describe("JSON-LD serialization", () => {
    it.each([
        "</script><script>window.jsonLdProbe = true</script>",
        '</ScRiPt><img src="x" onerror="window.jsonLdProbe = true">',
        "<!--<script></script><script>window.jsonLdProbe = true</script>",
    ])("keeps CMS text inside the JSON-LD script: %s", (text) => {
        const data = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: text,
            description: text,
        };
        const document = parseRenderedJsonLd(data);
        const scripts = document.querySelectorAll("script");

        expect(scripts).toHaveLength(1);
        expect(scripts[0].type).toBe("application/ld+json");
        expect(document.querySelector("img")).toBeNull();
        expect(JSON.parse(scripts[0].textContent || "")).toEqual(data);
        expect(document.querySelector("main")?.textContent).toBe(
            "After JSON-LD",
        );
    });

    it("preserves Unicode, special characters and nested structured data", () => {
        const data = {
            headline: 'Řešení < 5 & > 2 — "IT"',
            description: "First line\nSecond line",
            author: { name: "CSF", url: "https://www.csf.cz/?a=1&b=2" },
            keywords: ["Čeština", "English", "<script>"],
        };
        const document = parseRenderedJsonLd(data);

        expect(
            JSON.parse(document.querySelector("script")?.textContent || ""),
        ).toEqual(data);
    });
});
