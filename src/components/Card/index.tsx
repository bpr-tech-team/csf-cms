"use client";
import { applyTypography } from "@/utilities/typography";

import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { cn } from "@/utilities/ui";
import useClickableCard from "@/utilities/useClickableCard";
import Link from "next/link";
import React from "react";

import { getPagePath } from "@/utilities/getPagePath";
import type { PostCardData } from "@/utilities/postCards";

import { Media } from "@/components/Media";

export type CardPostData = PostCardData;

export const Card: React.FC<{
    alignItems?: "center";
    className?: string;
    doc?: CardPostData;
    locale?: AppLocale;
    theme?: "light" | "dark";
    title?: string;
}> = (props) => {
    const { cardRef, linkRef } = useClickableCard({});
    const {
        className,
        doc,
        locale = defaultLocale,
        theme = "light",
        title: titleFromProps,
    } = props;
    const messages = frontendMessages[locale];

    const { slug, heroImage, excerpt, title } = doc || {};

    const titleToUse = titleFromProps || title;
    const href = getPagePath({ slug, pageType: "post" }, locale);

    return (
        <article
            className={cn(
                "border border-border rounded-lg overflow-hidden bg-card text-card-foreground hover:cursor-pointer",
                className,
            )}
            ref={cardRef}
        >
            <div className="relative w-full ">
                {(!heroImage || typeof heroImage !== "object") && (
                    <div className="">
                        {applyTypography(messages.noImage, { locale })}
                    </div>
                )}
                {heroImage && typeof heroImage === "object" && (
                    <Media resource={heroImage} size="33vw" />
                )}
            </div>
            <div className="p-4">
                {titleToUse && (
                    <div
                        className={cn(
                            "prose",
                            theme === "dark" && "prose-invert",
                        )}
                    >
                        <h3>
                            <Link
                                className="not-prose"
                                href={href}
                                ref={linkRef}
                            >
                                {applyTypography(titleToUse, { locale })}
                            </Link>
                        </h3>
                    </div>
                )}
                {excerpt && (
                    <div className="mt-2">
                        <p>{applyTypography(excerpt, { locale })}</p>
                    </div>
                )}
            </div>
        </article>
    );
};
