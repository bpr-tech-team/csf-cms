import { getCachedGlobal } from "@/utilities/getGlobals";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import Link from "next/link";
import React from "react";

import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";

export async function Footer({
    locale = defaultLocale,
}: {
    locale?: AppLocale;
}) {
    const footerData = await getCachedGlobal("footer", 1, locale)();

    const navItems = footerData?.navItems || [];

    return (
        <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
            <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
                <Link
                    className="flex items-center"
                    href={withLocalePrefix("/", locale)}
                >
                    <Logo />
                </Link>

                <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
                    <ThemeSelector />
                    <nav className="flex flex-col md:flex-row gap-4">
                        {navItems.map(({ link }, i) => {
                            return (
                                <CMSLink
                                    className="text-white"
                                    key={i}
                                    {...link}
                                    locale={locale}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
