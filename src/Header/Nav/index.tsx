"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";

import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/ui";

type HeaderLink = NonNullable<HeaderType["navItems"]>[number]["link"];

const defaultNavItems: Record<AppLocale, HeaderLink[]> = {
    cs: [
        { type: "custom", label: "O nás", url: "/o-nas" },
        { type: "custom", label: "Produkty", url: "/produkty" },
        { type: "custom", label: "Služby", url: "/sluzby" },
        { type: "custom", label: "Case Studies", url: "/case-studies" },
    ],
    en: [
        { type: "custom", label: "About us", url: "/o-nas" },
        { type: "custom", label: "Products", url: "/produkty" },
        { type: "custom", label: "Services", url: "/sluzby" },
        { type: "custom", label: "Case Studies", url: "/case-studies" },
    ],
};

const hasTarget = (link?: HeaderLink | null) =>
    Boolean(
        link?.url ||
        (typeof link?.reference?.value === "object" &&
            link.reference.value.slug),
    );

export const HeaderNav: React.FC<{
    className?: string;
    data: HeaderType;
    locale: AppLocale;
    onNavigate?: () => void;
    variant: "desktop" | "mobile";
}> = ({ className, data, locale, onNavigate, variant }) => {
    const configuredItems = (data?.navItems || []).filter(({ link }) =>
        hasTarget(link),
    );
    const navItems = configuredItems.length
        ? configuredItems.map(({ link }) => link)
        : defaultNavItems[locale];
    const customerZoneLink = hasTarget(data.customerZoneLink)
        ? data.customerZoneLink
        : {
              type: "custom" as const,
              label: locale === "cs" ? "Zákaznická zóna" : "Customer zone",
              url: "/zakaznicka-zona",
          };
    const contactLink = hasTarget(data.contactLink)
        ? data.contactLink
        : {
              type: "custom" as const,
              label: locale === "cs" ? "Kontaktovat CSF" : "Contact CSF",
              url: "/kontakt",
          };
    const isMobile = variant === "mobile";

    return (
        <nav
            aria-label={locale === "cs" ? "Hlavní navigace" : "Main navigation"}
            className={cn(
                isMobile
                    ? "flex flex-col items-stretch gap-1"
                    : "items-center text-[0.875rem] leading-[1.3125rem]",
                className,
            )}
            onClickCapture={(event) => {
                if ((event.target as HTMLElement).closest("a")) onNavigate?.();
            }}
        >
            <div
                className={cn(
                    "flex",
                    isMobile
                        ? "flex-col items-stretch gap-1"
                        : "items-center gap-10",
                )}
            >
                {navItems.map((link, index) => (
                    <CMSLink
                        className={cn(
                            "rounded-sm text-white no-underline transition-colors duration-fast hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary",
                            isMobile &&
                                "flex min-h-11 items-center border-b border-white/10 py-2",
                        )}
                        key={`${link.label}-${index}`}
                        {...link}
                        locale={locale}
                    />
                ))}
            </div>

            <CMSLink
                {...customerZoneLink}
                className={cn(
                    "rounded-sm text-white no-underline transition-colors duration-fast hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary",
                    isMobile ? "mt-4 flex min-h-11 items-center py-2" : "ml-40",
                )}
                locale={locale}
            />
            <CMSLink
                {...contactLink}
                appearance="default"
                className={cn(isMobile ? "mt-4 w-full" : "ml-8")}
                locale={locale}
            />
        </nav>
    );
};
