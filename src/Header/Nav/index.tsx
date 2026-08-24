"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { withLocalePrefix } from "@/i18n/config";

import { CMSLink } from "@/components/Link";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

export const HeaderNav: React.FC<{
    data: HeaderType;
    locale: AppLocale;
}> = ({ data, locale }) => {
    const navItems = data?.navItems || [];

    return (
        <nav className="flex gap-3 items-center">
            {navItems.map(({ link }, i) => {
                return (
                    <CMSLink
                        key={i}
                        {...link}
                        appearance="link"
                        locale={locale}
                    />
                );
            })}
            <Link href={withLocalePrefix("/search", locale)}>
                <span className="sr-only">
                    {locale === "cs" ? "Vyhledávání" : "Search"}
                </span>
                <SearchIcon className="w-5 text-primary" />
            </Link>
        </nav>
    );
};
