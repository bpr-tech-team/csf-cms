"use client";

import type {
    PayloadAdminBarProps,
    PayloadMeUser,
} from "@payloadcms/admin-bar";

import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import { cn } from "@/utilities/ui";
import { useSelectedLayoutSegments } from "next/navigation";
import { PayloadAdminBar } from "@payloadcms/admin-bar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import "./index.scss";

import { getClientSideURL } from "@/utilities/getURL";

const baseClass = "admin-bar";

const collectionLabels = {
    pages: {
        plural: {
            cs: "Stránky",
            en: "Pages",
        },
        singular: {
            cs: "Stránka",
            en: "Page",
        },
    },
    posts: {
        plural: {
            cs: "Články",
            en: "Posts",
        },
        singular: {
            cs: "Článek",
            en: "Post",
        },
    },
};

const Title: React.FC<{ locale: AppLocale }> = ({ locale }) => (
    <span>{locale === "cs" ? "Administrace" : "Dashboard"}</span>
);

export const AdminBar: React.FC<{
    adminBarProps?: PayloadAdminBarProps;
    locale?: AppLocale;
}> = (props) => {
    const { adminBarProps } = props || {};
    const locale = props.locale || defaultLocale;
    const segments = useSelectedLayoutSegments();
    const [show, setShow] = useState(false);
    const collection = (segments.find(
        (segment) => segment in collectionLabels,
    ) || "pages") as keyof typeof collectionLabels;
    const router = useRouter();

    const onAuthChange = React.useCallback((user: PayloadMeUser) => {
        setShow(Boolean(user?.id));
    }, []);

    return (
        <div
            className={cn(baseClass, "py-2 bg-black text-white", {
                block: show,
                hidden: !show,
            })}
        >
            <div className="container">
                <PayloadAdminBar
                    {...adminBarProps}
                    className="py-2 text-white"
                    classNames={{
                        controls: "font-medium text-white",
                        logo: "text-white",
                        user: "text-white",
                    }}
                    cmsURL={getClientSideURL()}
                    collectionSlug={collection}
                    collectionLabels={{
                        plural:
                            collectionLabels[collection]?.plural[locale] ||
                            "Pages",
                        singular:
                            collectionLabels[collection]?.singular[locale] ||
                            "Page",
                    }}
                    logo={<Title locale={locale} />}
                    onAuthChange={onAuthChange}
                    onPreviewExit={() => {
                        fetch("/next/exit-preview").then(() => {
                            router.push(withLocalePrefix("/", locale));
                            router.refresh();
                        });
                    }}
                    style={{
                        backgroundColor: "transparent",
                        padding: 0,
                        position: "relative",
                        zIndex: "unset",
                    }}
                />
            </div>
        </div>
    );
};
