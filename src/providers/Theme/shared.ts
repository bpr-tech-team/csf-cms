import type { Theme } from "./types";
import { themeIsValid } from "./types";

export const themeLocalStorageKey = "payload-theme";

export const defaultTheme = "light";

export const getImplicitPreference = (): Theme | null => {
    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);
    const hasImplicitPreference = typeof mql.matches === "boolean";

    if (hasImplicitPreference) {
        return mql.matches ? "dark" : "light";
    }

    return null;
};

export const getPreferredTheme = (): Theme => {
    try {
        const preference = window.localStorage.getItem(themeLocalStorageKey);
        if (themeIsValid(preference)) return preference;
    } catch {
        // Storage can be unavailable even when the page is otherwise usable.
    }

    try {
        return getImplicitPreference() || defaultTheme;
    } catch {
        return defaultTheme;
    }
};
