"use client";

import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { useEffect } from "react";

export const SetHeaderTheme: React.FC<{
    theme: "dark" | "light" | null;
}> = ({ theme }) => {
    const { setHeaderTheme } = useHeaderTheme();

    useEffect(() => {
        setHeaderTheme(theme);
    }, [setHeaderTheme, theme]);

    return <React.Fragment />;
};
