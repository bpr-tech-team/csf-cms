"use client";

import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Header } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { withLocalePrefix } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { Logo } from "@/components/Logo/Logo";
import { HeaderNav, headerFocus } from "./Nav";

interface HeaderClientProps {
    data: Header;
    locale: AppLocale;
}

export const HeaderClient: React.FC<HeaderClientProps> = (props) => {
    const pathname = usePathname();
    const { setHeaderTheme } = useHeaderTheme();
    useEffect(() => {
        setHeaderTheme(null);
    }, [pathname, setHeaderTheme]);
    return <HeaderNavigation key={pathname} {...props} pathname={pathname} />;
};

function HeaderNavigation({
    data,
    locale,
    pathname,
}: HeaderClientProps & { pathname: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const messages = frontendMessages[locale];
    const logo = (
        <Link
            aria-label={messages.homeLinkLabel}
            className={`shrink-0 rounded-sm ${headerFocus}`}
            href={withLocalePrefix("/", locale)}
            onClick={() => setIsMenuOpen(false)}
        >
            <Logo
                loading="eager"
                priority="high"
                className="w-[82px] xl:w-25"
            />
        </Link>
    );

    return (
        <header
            className="relative z-40 border-b border-paper-0/20 bg-ink-900 text-paper-0"
            data-theme="dark"
        >
            <div className="container flex h-[71px] items-center justify-between pr-3 xl:h-[103px] xl:gap-16 xl:pr-8">
                {logo}
                <HeaderNav
                    className="ml-auto hidden xl:flex"
                    data={data}
                    locale={locale}
                    pathname={pathname}
                    variant="desktop"
                />
                <button
                    ref={menuButtonRef}
                    type="button"
                    aria-controls="site-navigation"
                    aria-expanded={isMenuOpen}
                    aria-label={messages.menuOpen}
                    className={`size-12 shrink-0 rounded-sm xl:hidden ${headerFocus}`}
                    onClick={() => setIsMenuOpen(true)}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/media/block/header/menu.svg"
                        alt=""
                        width={48}
                        height={48}
                    />
                </button>
            </div>
            {isMenuOpen && (
                <MobileMenu
                    data={data}
                    locale={locale}
                    pathname={pathname}
                    onClose={closeMenu}
                    returnFocusRef={menuButtonRef}
                    logo={logo}
                />
            )}
        </header>
    );
}

function MobileMenu({
    data,
    locale,
    pathname,
    onClose,
    returnFocusRef,
    logo,
}: HeaderClientProps & {
    pathname: string;
    onClose: () => void;
    returnFocusRef: React.RefObject<HTMLButtonElement | null>;
    logo: React.ReactNode;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        const trigger = returnFocusRef.current;
        const previousOverflow = document.body.style.overflow;
        dialog?.showModal();
        document.body.style.overflow = "hidden";
        const desktop = window.matchMedia("(min-width: 80rem)");
        const closeAtDesktop = () => {
            if (desktop.matches) onClose();
        };
        desktop.addEventListener("change", closeAtDesktop);
        closeAtDesktop();
        return () => {
            desktop.removeEventListener("change", closeAtDesktop);
            dialog?.close();
            document.body.style.overflow = previousOverflow;
            trigger?.focus();
        };
    }, [returnFocusRef, onClose]);
    const messages = frontendMessages[locale];
    return (
        <dialog
            ref={dialogRef}
            id="site-navigation"
            aria-label={messages.mainNavigation}
            className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-ink-900 p-0 text-paper-0 backdrop:bg-ink-900 cursor-auto! [&_*]:cursor-auto!"
            data-theme="dark"
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <div className="flex min-h-full flex-col">
                <div className="flex h-18 shrink-0 items-center justify-between border-b border-paper-0/20 pl-5 pr-3">
                    {logo}
                    <button
                        type="button"
                        aria-label={messages.menuClose}
                        className={`size-12 rounded-sm ${headerFocus}`}
                        onClick={onClose}
                        autoFocus
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/media/block/header/close.svg"
                            alt=""
                            width={48}
                            height={48}
                        />
                    </button>
                </div>
                <HeaderNav
                    data={data}
                    locale={locale}
                    pathname={pathname}
                    onNavigate={onClose}
                    variant="mobile"
                />
            </div>
        </dialog>
    );
}
