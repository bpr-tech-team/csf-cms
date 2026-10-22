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
import { cn } from "@/utilities/ui";
import { HeaderNav, headerFocus } from "./Nav";
import styles from "./styles.module.css";

interface HeaderClientProps {
    data: Header;
    locale: AppLocale;
}

const headerRowClassName =
    "container flex h-[calc(var(--site-header-height)-1px)] items-center justify-between pr-3";

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
    const [menuState, setMenuState] = useState<"closed" | "open" | "closing">(
        "closed",
    );
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const closeMenu = useCallback(() => setMenuState("closed"), []);
    const requestMenuClose = useCallback(
        () => setMenuState((state) => (state === "open" ? "closing" : state)),
        [],
    );
    const messages = frontendMessages[locale];
    const logo = (
        <Link
            aria-label={messages.homeLinkLabel}
            className={`shrink-0 rounded-sm ${headerFocus}`}
            href={withLocalePrefix("/", locale)}
            onClick={requestMenuClose}
        >
            <Logo loading="eager" priority="high" />
        </Link>
    );

    return (
        <header
            className="sticky top-0 z-50 border-b border-paper-0/20 bg-ink-900 text-paper-0"
            data-theme="dark"
        >
            <div className={`${headerRowClassName} xl:gap-16 xl:pr-8`}>
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
                    aria-expanded={menuState === "open"}
                    aria-label={messages.menuOpen}
                    className={`size-12 shrink-0 rounded-sm xl:hidden ${headerFocus}`}
                    onClick={() => setMenuState("open")}
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
            {menuState !== "closed" && (
                <MobileMenu
                    data={data}
                    locale={locale}
                    pathname={pathname}
                    isClosing={menuState === "closing"}
                    onClose={closeMenu}
                    onRequestClose={requestMenuClose}
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
    isClosing,
    onClose,
    onRequestClose,
    returnFocusRef,
    logo,
}: HeaderClientProps & {
    pathname: string;
    isClosing: boolean;
    onClose: () => void;
    onRequestClose: () => void;
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

    useEffect(() => {
        if (!isClosing) return;
        let cancelled = false;
        const animations =
            dialogRef.current?.getAnimations({ subtree: true }) || [];
        void Promise.allSettled(
            animations.map((animation) => animation.finished),
        ).then(() => {
            if (!cancelled) onClose();
        });
        return () => {
            cancelled = true;
        };
    }, [isClosing, onClose]);

    const messages = frontendMessages[locale];
    return (
        <dialog
            ref={dialogRef}
            id="site-navigation"
            aria-label={messages.mainNavigation}
            className={cn(
                "fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-ink-900 p-0 text-paper-0 backdrop:bg-ink-900",
                isClosing && styles.closing,
            )}
            data-theme="dark"
            onCancel={(event) => {
                event.preventDefault();
                onRequestClose();
            }}
        >
            <div className="flex min-h-full flex-col" inert={isClosing}>
                <div className="shrink-0 border-b border-paper-0/20">
                    <div className={headerRowClassName}>
                        {logo}
                        <button
                            type="button"
                            aria-label={messages.menuClose}
                            className={`size-12 rounded-sm ${headerFocus}`}
                            onClick={onRequestClose}
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
                </div>
                <HeaderNav
                    className={
                        isClosing
                            ? undefined
                            : "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2 motion-safe:duration-240 motion-safe:ease-standard"
                    }
                    data={data}
                    locale={locale}
                    pathname={pathname}
                    onNavigate={onRequestClose}
                    variant="mobile"
                />
            </div>
        </dialog>
    );
}
