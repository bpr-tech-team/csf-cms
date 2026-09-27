"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import type { Header as HeaderType } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { CMSLink } from "@/components/Link";
import { ContentIcon } from "@/components/ContentIcon";
import { frontendMessages } from "@/i18n/frontend";
import { getLinkHref, isCurrentLink } from "@/utilities/getLinkHref";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

export const headerFocus =
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500";

export const HeaderNav: React.FC<{
    className?: string;
    data: HeaderType;
    locale: AppLocale;
    pathname: string;
    onNavigate?: () => void;
    variant: "desktop" | "mobile";
}> = ({ className, data, locale, pathname, onNavigate, variant }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const navRef = useRef<HTMLElement>(null);
    const triggers = useRef(new Map<number, HTMLButtonElement>());
    const hoverOpenedIndex = useRef<number | null>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const id = useId();
    const isMobile = variant === "mobile";
    const messages = frontendMessages[locale];
    const navItems = (data.navItems || []).filter((item) =>
        item.itemType === "dropdown"
            ? item.label &&
              item.children?.some((child) => getLinkHref(child.link, locale))
            : getLinkHref(item.link, locale),
    );
    const customerZoneLink = getLinkHref(data.customerZoneLink, locale)
        ? data.customerZoneLink
        : null;
    const contactLink = getLinkHref(data.contactLink, locale)
        ? data.contactLink
        : null;

    const cancelClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = null;
    };

    useEffect(
        () => () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
        },
        [],
    );

    useEffect(() => {
        if (isMobile || openIndex === null) return;
        const closeOutside = (event: PointerEvent) => {
            if (!navRef.current?.contains(event.target as Node))
                setOpenIndex(null);
        };
        const closeOnResize = () => setOpenIndex(null);
        document.addEventListener("pointerdown", closeOutside);
        window.addEventListener("resize", closeOnResize);
        return () => {
            document.removeEventListener("pointerdown", closeOutside);
            window.removeEventListener("resize", closeOnResize);
        };
    }, [isMobile, openIndex]);

    const close = () => {
        cancelClose();
        setOpenIndex(null);
        onNavigate?.();
    };

    return (
        <nav
            ref={navRef}
            aria-label={messages.mainNavigation}
            className={cn(
                isMobile
                    ? "flex min-h-0 flex-1 flex-col px-5 pt-2"
                    : "flex items-center text-body-sm",
                className,
            )}
            onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) close();
            }}
            onPointerEnter={cancelClose}
            onPointerLeave={(event) => {
                if (!isMobile && event.pointerType === "mouse") {
                    cancelClose();
                    closeTimer.current = setTimeout(() => {
                        if (!navRef.current?.contains(document.activeElement))
                            setOpenIndex(null);
                    }, 180);
                }
            }}
            onBlur={(event) => {
                if (
                    !isMobile &&
                    !event.currentTarget.contains(event.relatedTarget)
                ) {
                    cancelClose();
                    setOpenIndex(null);
                }
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape" && openIndex !== null) {
                    event.preventDefault();
                    event.stopPropagation();
                    triggers.current.get(openIndex)?.focus();
                    setOpenIndex(null);
                }
            }}
        >
            <ul
                className={cn(
                    "m-0 list-none p-0",
                    isMobile ? "flex flex-col" : "flex items-center gap-6",
                )}
            >
                {navItems.map((item, index) => {
                    const children = (item.children || []).filter((child) =>
                        getLinkHref(child.link, locale),
                    );
                    const isDropdown = item.itemType === "dropdown";
                    const isOpen = openIndex === index;
                    const overview =
                        item.showOverviewLink &&
                        getLinkHref(item.overviewLink, locale)
                            ? item.overviewLink
                            : null;
                    const current = isDropdown
                        ? children.some((child) =>
                              isCurrentLink(
                                  pathname,
                                  getLinkHref(child.link, locale),
                              ),
                          ) ||
                          isCurrentLink(pathname, getLinkHref(overview, locale))
                        : isCurrentLink(
                              pathname,
                              getLinkHref(item.link, locale),
                          );
                    const itemClass = cn(
                        headerFocus,
                        "relative flex items-center text-left no-underline transition-colors hover:text-brand-500",
                        isMobile
                            ? "min-h-15 w-full justify-between py-3 text-lg font-medium"
                            : "min-h-26 gap-1.5 text-sm",
                        isOpen || current ? "text-brand-500" : "text-paper-0",
                        !isMobile &&
                            (isOpen || current) &&
                            "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-500",
                    );
                    return (
                        <li
                            key={item.id || index}
                            className={cn(
                                isMobile && "border-b border-paper-0/10",
                            )}
                        >
                            {isDropdown ? (
                                <>
                                    <button
                                        type="button"
                                        id={`${id}-trigger-${index}`}
                                        aria-expanded={isOpen}
                                        aria-controls={`${id}-panel-${index}`}
                                        className={itemClass}
                                        ref={(node) => {
                                            if (node)
                                                triggers.current.set(
                                                    index,
                                                    node,
                                                );
                                            else triggers.current.delete(index);
                                        }}
                                        onClick={() => {
                                            cancelClose();
                                            setOpenIndex(
                                                hoverOpenedIndex.current ===
                                                    index
                                                    ? index
                                                    : isOpen
                                                      ? null
                                                      : index,
                                            );
                                            hoverOpenedIndex.current = null;
                                        }}
                                        onPointerEnter={(event) => {
                                            if (
                                                !isMobile &&
                                                event.pointerType === "mouse"
                                            ) {
                                                cancelClose();
                                                if (!isOpen)
                                                    hoverOpenedIndex.current =
                                                        index;
                                                setOpenIndex(index);
                                            }
                                        }}
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "ArrowDown" &&
                                                !isMobile
                                            ) {
                                                event.preventDefault();
                                                setOpenIndex(index);
                                                requestAnimationFrame(() =>
                                                    document
                                                        .getElementById(
                                                            `${id}-panel-${index}`,
                                                        )
                                                        ?.querySelector("a")
                                                        ?.focus(),
                                                );
                                            }
                                        }}
                                    >
                                        {applyTypography(item.label, {
                                            locale,
                                        })}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            alt=""
                                            aria-hidden
                                            src={`/media/block/header/${isMobile ? "mobile-" : ""}chevron-${isOpen ? "up" : "down"}.svg`}
                                            width={isMobile ? 24 : 9.5}
                                            height={isMobile ? 24 : 5.5}
                                        />
                                    </button>
                                    <div
                                        id={`${id}-panel-${index}`}
                                        aria-labelledby={`${id}-trigger-${index}`}
                                        hidden={!isOpen}
                                        className={cn(
                                            !isMobile &&
                                                "absolute inset-x-0 top-full max-h-[calc(100dvh-104px)] overflow-y-auto border-b border-paper-0/20 bg-ink-900 shadow-floating",
                                        )}
                                    >
                                        <div
                                            className={
                                                isMobile
                                                    ? "pb-4"
                                                    : "container py-10"
                                            }
                                        >
                                            {!isMobile && (
                                                <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-paper-0/50">
                                                    {applyTypography(
                                                        item.label,
                                                        { locale },
                                                    )}
                                                </p>
                                            )}
                                            <ul
                                                className={cn(
                                                    "m-0 grid list-none p-0",
                                                    isMobile
                                                        ? "gap-1"
                                                        : "grid-cols-3 gap-2",
                                                )}
                                            >
                                                {children.map(
                                                    (child, childIndex) => {
                                                        const active =
                                                            isCurrentLink(
                                                                pathname,
                                                                getLinkHref(
                                                                    child.link,
                                                                    locale,
                                                                ),
                                                            );
                                                        return (
                                                            <li
                                                                key={
                                                                    child.id ||
                                                                    childIndex
                                                                }
                                                            >
                                                                <CMSLink
                                                                    {...child.link}
                                                                    label={null}
                                                                    locale={
                                                                        locale
                                                                    }
                                                                    aria-current={
                                                                        active
                                                                            ? "page"
                                                                            : undefined
                                                                    }
                                                                    className={cn(
                                                                        headerFocus,
                                                                        "group flex h-full items-center rounded-xl no-underline transition-colors hover:bg-paper-0/[0.06] hover:text-brand-500",
                                                                        isMobile
                                                                            ? "gap-3.5 py-1.5 text-base text-paper-0/85"
                                                                            : "gap-4 p-3.5 text-base font-medium text-paper-0",
                                                                        active &&
                                                                            "bg-paper-0/[0.06] text-brand-500",
                                                                    )}
                                                                >
                                                                    <span
                                                                        className={cn(
                                                                            "flex shrink-0 items-center justify-center bg-brand-500/16 text-brand-500 group-hover:bg-brand-500/32",
                                                                            isMobile
                                                                                ? "size-9 rounded-[8px]"
                                                                                : "size-11 rounded-[10px]",
                                                                        )}
                                                                    >
                                                                        <ContentIcon
                                                                            icon={
                                                                                child.icon
                                                                            }
                                                                            className={
                                                                                isMobile
                                                                                    ? "size-[22px]"
                                                                                    : "size-[26px]"
                                                                            }
                                                                        />
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            child
                                                                                .link
                                                                                .label
                                                                        }
                                                                    </span>
                                                                </CMSLink>
                                                            </li>
                                                        );
                                                    },
                                                )}
                                            </ul>
                                            {overview && (
                                                <div
                                                    className={
                                                        isMobile
                                                            ? "pt-4"
                                                            : "mt-8 border-t border-paper-0/10 pt-6 pl-4"
                                                    }
                                                >
                                                    <CMSLink
                                                        {...overview}
                                                        locale={locale}
                                                        className={cn(
                                                            headerFocus,
                                                            "inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:underline",
                                                        )}
                                                    >
                                                        <span aria-hidden>
                                                            →
                                                        </span>
                                                    </CMSLink>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <CMSLink
                                    {...item.link}
                                    locale={locale}
                                    aria-current={current ? "page" : undefined}
                                    className={itemClass}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
            {customerZoneLink && (
                <CMSLink
                    {...customerZoneLink}
                    locale={locale}
                    className={cn(
                        headerFocus,
                        "text-paper-0 no-underline hover:text-brand-500",
                        isMobile
                            ? "flex min-h-15 items-center border-b border-paper-0/10 py-3 text-lg font-medium"
                            : "ml-32 text-sm",
                    )}
                />
            )}
            {contactLink && (
                <div
                    className={
                        isMobile
                            ? "mt-auto pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
                            : "ml-8"
                    }
                >
                    <CMSLink
                        {...contactLink}
                        locale={locale}
                        appearance="default"
                        className={
                            isMobile ? "h-13 w-full" : "px-4 text-[13px]"
                        }
                    />
                </div>
            )}
        </nav>
    );
};
