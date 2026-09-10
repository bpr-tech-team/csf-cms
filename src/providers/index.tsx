import React from "react";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { LocaleProvider } from "./Locale";

import { HeaderThemeProvider } from "./HeaderTheme";
import { ThemeProvider } from "./Theme";

export const Providers: React.FC<{
    children: React.ReactNode;
    locale?: AppLocale;
}> = ({ children, locale = defaultLocale }) => {
    return (
        <LocaleProvider locale={locale}>
            <ThemeProvider>
                <HeaderThemeProvider>{children}</HeaderThemeProvider>
            </ThemeProvider>
        </LocaleProvider>
    );
};
