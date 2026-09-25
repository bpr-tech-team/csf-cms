"use client";

import {
    Link,
    NavGroup,
    parseSearchParams,
    useAuth,
    useConfig,
    useListQuery,
    useLocale,
    useNav,
} from "@payloadcms/ui";
import { usePathname, useSearchParams } from "next/navigation";
import { formatAdminURL } from "payload/shared";

import { activePageType, pageTypeViews, pageTypeWhere } from "./views";
import "./styles.css";

export function PageTypeNav() {
    const { permissions } = useAuth();
    const { config } = useConfig();
    const { navOpen } = useNav();
    const locale = useLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const listURL = formatAdminURL({
        adminRoute: config.routes.admin,
        path: "/collections/pages",
    });
    const activeType =
        pathname === listURL
            ? activePageType(parseSearchParams(searchParams).where)
            : undefined;

    if (!permissions?.collections?.pages?.read) return null;

    return (
        <NavGroup label="Stránky podle typu">
            {pageTypeViews.map(({ value, label }) => {
                const query = new URLSearchParams({
                    "where[and][0][pageType][equals]": value,
                    page: "1",
                });
                if (locale?.code) query.set("locale", locale.code);
                const isActive = value === activeType;

                return (
                    <Link
                        aria-current={isActive ? "page" : undefined}
                        className="nav__link"
                        href={`${listURL}?${query}`}
                        id={`nav-pages-${value}`}
                        key={value}
                        prefetch={false}
                        tabIndex={navOpen ? undefined : -1}
                    >
                        {isActive && <div className="nav__link-indicator" />}
                        <span className="nav__link-label">{label}</span>
                    </Link>
                );
            })}
        </NavGroup>
    );
}

export function PageTypeTabs() {
    const { query, refineListData } = useListQuery();
    const activeType = activePageType(query.where);
    const views = [
        { value: undefined, label: "Všechny stránky" },
        ...pageTypeViews,
    ];

    return (
        <div aria-label="Typ stránky" className="page-type-views" role="group">
            {views.map(({ value, label }) => (
                <button
                    aria-pressed={value === activeType}
                    className="page-type-views__button"
                    key={value ?? "all"}
                    onClick={() => {
                        // Start a fresh view; retain locale, columns and sorting.
                        void refineListData({
                            page: 1,
                            search: undefined,
                            where: value ? pageTypeWhere(value) : undefined,
                        });
                    }}
                    type="button"
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
