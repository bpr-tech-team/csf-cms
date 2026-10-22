"use client";

import React, { useEffect } from "react";

import { getPreferredTheme } from "./shared";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            getPreferredTheme(),
        );
    }, []);

    return <>{children}</>;
};
