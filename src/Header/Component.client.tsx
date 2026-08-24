"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import type { Header } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { withLocalePrefix } from "@/i18n/config";

import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";

interface HeaderClientProps {
    data: Header;
    locale: AppLocale;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
    const { headerTheme, setHeaderTheme } = useHeaderTheme();
    const pathname = usePathname();
    const theme = headerTheme ?? null;

    useEffect(() => {
        setHeaderTheme(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <header
            className="container relative z-20   "
            {...(theme ? { "data-theme": theme } : {})}
        >
            <div className="py-8 flex justify-between">
                <Link href={withLocalePrefix("/", locale)}>
                    <Logo loading="eager" priority="high" />
                </Link>
                <HeaderNav data={data} locale={locale} />
            </div>
        </header>
    );
};
