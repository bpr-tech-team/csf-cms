"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type AppLocale } from "@/i18n/config";

const LocaleContext = createContext<AppLocale>(defaultLocale);

export function LocaleProvider({
    children,
    locale,
}: {
    children: ReactNode;
    locale: AppLocale;
}) {
    return (
        <LocaleContext.Provider value={locale}>
            {children}
        </LocaleContext.Provider>
    );
}

export const useLocale = () => useContext(LocaleContext);
