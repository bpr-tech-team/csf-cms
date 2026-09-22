import { describe, expect, it } from "vitest";

import { sanitizeFlexibleHTML } from "./sanitizeHTML";

describe("Flexible content HTML", () => {
    it("preserves formatted content and responsive iframe embeds", () => {
        const result = sanitizeFlexibleHTML(
            '<p><strong>Text</strong> <a href="/kontakt">Kontakt</a></p><iframe src="https://www.youtube.com/embed/example" title="Video" width="560" height="315" style="width:100%;height:315px" allowfullscreen></iframe>',
        );
        const container = document.createElement("div");
        container.innerHTML = result;
        expect(container.querySelector("strong")?.textContent).toBe("Text");
        const iframe = container.querySelector("iframe")!;
        expect(iframe.src).toBe("https://www.youtube.com/embed/example");
        expect(iframe.title).toBe("Video");
        expect(iframe.style.width).toBe("100%");
        expect(iframe.getAttribute("sandbox")).toBe(
            "allow-scripts allow-presentation",
        );
    });

    it("removes executable markup and dangerous URLs", () => {
        const result = sanitizeFlexibleHTML(
            '<script>alert(1)</script><img src="/photo.webp" onerror="alert(1)"><a href="jav&#x61;script:alert(1)">Link</a><iframe src="javascript:alert(1)"></iframe><iframe srcdoc="<script>alert(1)</script>"></iframe>',
        );
        expect(result).not.toMatch(/script|onerror|srcdoc|iframe/i);
        expect(result).toContain('src="/photo.webp"');
        expect(result).toContain("Link");
    });

    it("enforces isolation even when an embed requests broader permissions", () => {
        const result = sanitizeFlexibleHTML(
            '<iframe src="https://example.com/embed" sandbox="allow-same-origin allow-top-navigation" onload="alert(1)"></iframe><a href="https://example.com" target="_blank">Link</a>',
        );
        expect(result).not.toMatch(
            /allow-same-origin|allow-top-navigation|onload/,
        );
        expect(result).toContain('rel="noopener noreferrer"');
    });

    it("removes CSS that can escape the column or load code", () => {
        const result = sanitizeFlexibleHTML(
            '<div style="position:fixed;width:100%;background-image:url(javascript:alert(1));text-align:center">Text</div>',
        );
        expect(result).toContain("width:100%");
        expect(result).toContain("text-align:center");
        expect(result).not.toMatch(/position|background-image|javascript/);
    });
});
