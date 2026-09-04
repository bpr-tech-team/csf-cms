"use client";
import { Button } from "@/components/ui/button";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

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
    const { setHeaderTheme } = useHeaderTheme();
    const pathname = usePathname();
    const [openMenuPathname, setOpenMenuPathname] = useState<string | null>(
        null,
    );
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const isMenuOpen = openMenuPathname === pathname;

    useEffect(() => {
        setHeaderTheme(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        if (!isMenuOpen) return;

        const closeMenuOnEscape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;

            setOpenMenuPathname(null);
            menuButtonRef.current?.focus();
        };

        window.addEventListener("keydown", closeMenuOnEscape);

        return () => window.removeEventListener("keydown", closeMenuOnEscape);
    }, [isMenuOpen]);

    return (
        <header
            className="relative z-40 border-b border-white/20 bg-ink-900 text-white"
            data-theme="dark"
        >
            <div className="container flex h-26 items-center justify-between">
                <Link
                    aria-label={locale === "cs" ? "CSF — domů" : "CSF — home"}
                    className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-ink-900"
                    href={withLocalePrefix("/", locale)}
                >
                    <Logo loading="eager" priority="high" />
                </Link>

                <HeaderNav
                    className="ml-auto hidden xl:flex"
                    data={data}
                    locale={locale}
                    variant="desktop"
                />

                <Button
                    aria-controls="site-navigation"
                    aria-expanded={isMenuOpen}
                    aria-label={
                        isMenuOpen
                            ? locale === "cs"
                                ? "Zavřít menu"
                                : "Close menu"
                            : locale === "cs"
                              ? "Otevřít menu"
                              : "Open menu"
                    }
                    className="flex size-12 items-center justify-center rounded-pill border border-white/20 text-white transition-colors duration-fast hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary xl:hidden"
                    onClick={() =>
                        setOpenMenuPathname(isMenuOpen ? null : pathname)
                    }
                    ref={menuButtonRef}
                    size="icon"
                    type="button"
                    variant="ghost"
                >
                    {isMenuOpen ? (
                        <X aria-hidden className="size-5" />
                    ) : (
                        <Menu aria-hidden className="size-5" />
                    )}
                </Button>
            </div>

            {isMenuOpen ? (
                <div
                    className="absolute inset-x-0 top-full border-b border-white/20 bg-ink-900 shadow-floating xl:hidden"
                    id="site-navigation"
                >
                    <div className="container py-6">
                        <HeaderNav
                            data={data}
                            locale={locale}
                            onNavigate={() => setOpenMenuPathname(null)}
                            variant="mobile"
                        />
                    </div>
                </div>
            ) : null}
        </header>
    );
};
