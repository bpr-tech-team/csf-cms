import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InitTheme } from "./index";
import { ThemeProvider } from "../index";
import { themeLocalStorageKey } from "../shared";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
});

function initialize({
    stored,
    dark = false,
    blocked = false,
}: {
    stored?: string;
    dark?: boolean;
    blocked?: boolean;
} = {}) {
    if (stored) localStorage.setItem(themeLocalStorageKey, stored);
    vi.stubGlobal(
        "matchMedia",
        vi.fn(() => ({ matches: dark })),
    );
    if (blocked) {
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            throw new DOMException("Storage is unavailable", "SecurityError");
        });
    }
    const html = renderToStaticMarkup(<InitTheme />);
    const container = document.createElement("div");
    container.innerHTML = html;
    const script = container.querySelector("script")!;
    // Execute the actual server-rendered script without a Next.js bootstrap.
    window.eval(script.textContent!);
    return html;
}

describe("theme before hydration", () => {
    it("emits an immediately executable inline script and respects the saved theme", () => {
        const html = initialize({ stored: "dark" });
        expect(html).not.toContain("__next_s");
        expect(document.documentElement.dataset.theme).toBe("dark");
        render(<ThemeProvider>Visible content</ThemeProvider>);
        expect(document.documentElement.dataset.theme).toBe("dark");
    });

    it("keeps an explicit light theme when the system is dark", () => {
        initialize({ stored: "light", dark: true });
        expect(document.documentElement.dataset.theme).toBe("light");
    });

    it.each([undefined, "invalid"])(
        "uses the system preference for %s",
        (stored) => {
            initialize({ stored, dark: true });
            expect(document.documentElement.dataset.theme).toBe("dark");
        },
    );

    it("survives blocked storage before and during hydration", () => {
        initialize({ blocked: true, dark: true });
        expect(document.documentElement.dataset.theme).toBe("dark");
        expect(() =>
            render(<ThemeProvider>Visible content</ThemeProvider>),
        ).not.toThrow();
        expect(document.documentElement.dataset.theme).toBe("dark");
    });

    it("retains a readable default when browser preference APIs fail", () => {
        initialize({ blocked: true });
        vi.stubGlobal("matchMedia", () => {
            throw new Error("Unavailable");
        });
        render(<ThemeProvider>Visible content</ThemeProvider>);
        expect(document.documentElement.dataset.theme).toBe("light");
    });
});
