"use client";

import React, { useEffect, useState } from "react";

import type { Theme } from "./types";

import canUseDOM from "@/utilities/canUseDOM";
import {
    defaultTheme,
    getImplicitPreference,
    themeLocalStorageKey,
} from "./shared";
import { themeIsValid } from "./types";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme] = useState<Theme | undefined>(() => {
        if (!canUseDOM) return undefined;

        const preference = window.localStorage.getItem(themeLocalStorageKey);

        if (themeIsValid(preference)) return preference;

        return getImplicitPreference() || defaultTheme;
    });

    useEffect(() => {
        if (theme) document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return <>{children}</>;
};
