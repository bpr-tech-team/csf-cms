import { getCachedGlobal } from "@/utilities/getGlobals";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import Link from "next/link";
import React from "react";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";

export async function Footer({
    locale = defaultLocale,
}: {
    locale?: AppLocale;
}) {
    const footerData = await getCachedGlobal("footer", 1, locale)();
    const legacyNavItems = footerData?.navItems || [];
    const columns = footerData?.columns?.length
        ? footerData.columns
        : legacyNavItems.length
          ? [
                {
                    title: locale === "cs" ? "Navigace" : "Navigation",
                    links: legacyNavItems,
                },
            ]
          : [];
    const year = new Date().getFullYear();
    const tagline = footerData?.tagline;

    return (
        <footer
            className="mt-auto border-t border-border-dark bg-olive-950 text-white"
            data-theme="dark"
        >
            <div className="container grid grid-cols-1 gap-x-6 gap-y-10 py-16 sm:grid-cols-2 md:grid-cols-4">
                <div className="flex flex-col items-start gap-6 sm:col-span-2 md:col-span-1">
                    <Link
                        aria-label={
                            locale === "cs" ? "CSF — domů" : "CSF — home"
                        }
                        className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-olive-950"
                        href={withLocalePrefix("/", locale)}
                    >
                        <Logo />
                    </Link>
                    <p className="max-w-68 text-body-sm leading-6 font-normal text-neutral-inverse-muted">
                        © {year} CSF ICT Solutions. All rights reserved.
                        {tagline && (
                            <>
                                <br />
                                {tagline}
                            </>
                        )}
                    </p>
                </div>

                {columns.map((column, columnIndex) => (
                    <nav
                        aria-label={column.title}
                        className="flex flex-col items-start gap-4"
                        key={`${column.title}-${column.id || columnIndex}`}
                    >
                        <h2 className="text-xs leading-4 font-bold tracking-widest text-brand-400 uppercase">
                            {column.title}
                        </h2>
                        <ul className="flex flex-col gap-4">
                            {(column.links || []).map(({ link, id }, index) => (
                                <li key={id || `${link.label}-${index}`}>
                                    <CMSLink
                                        {...link}
                                        className="text-body-md leading-6 font-normal text-neutral-inverse-muted no-underline transition-colors duration-fast hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
                                        locale={locale}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
        </footer>
    );
}
