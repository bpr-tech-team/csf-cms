import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import { SetHeaderTheme } from "@/components/SetHeaderTheme";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { getCanonicalUrl, seoConfig } from "@/seo/config";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { notFound } from "next/navigation";
import React from "react";

const postsPerPage = 12;

export async function PostsArchiveTemplate({
    locale,
    pageNumber = 1,
}: {
    locale: AppLocale;
    pageNumber?: number;
}) {
    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        notFound();
    }

    const payload = await getPayload({ config: configPromise });
    const messages = frontendMessages[locale];

    const posts = await payload.find({
        collection: "posts",
        depth: 1,
        fallbackLocale: locale === defaultLocale ? false : defaultLocale,
        limit: postsPerPage,
        locale,
        overrideAccess: false,
        page: pageNumber,
        select: {
            title: true,
            slug: true,
            categories: true,
            meta: true,
        },
    });

    return (
        <div className="pt-24 pb-24">
            <SetHeaderTheme theme="light" />
            <div className="container mb-16">
                <div className="prose dark:prose-invert max-w-none">
                    <h1>{messages.postsTitle}</h1>
                </div>
            </div>

            <div className="container mb-8">
                <PageRange
                    collectionLabels={{
                        plural: messages.postsPlural,
                        singular: messages.postsSingular,
                    }}
                    currentPage={posts.page}
                    limit={postsPerPage}
                    locale={locale}
                    totalDocs={posts.totalDocs}
                />
            </div>

            <CollectionArchive locale={locale} posts={posts.docs} />

            <div className="container">
                {posts.totalPages > 1 && posts.page && (
                    <Pagination
                        locale={locale}
                        page={posts.page}
                        totalPages={posts.totalPages}
                    />
                )}
            </div>
        </div>
    );
}

export function generatePostsArchiveMetadata({
    locale,
    pageNumber,
}: {
    locale: AppLocale;
    pageNumber?: string;
}): Metadata {
    const messages = frontendMessages[locale];
    const path = pageNumber ? `/posts/page/${pageNumber}` : "/posts";

    return {
        alternates: {
            canonical: getCanonicalUrl(withLocalePrefix(path, locale)),
        },
        description: messages.postsDescription,
        robots: pageNumber
            ? {
                  follow: true,
                  index: false,
              }
            : undefined,
        title: pageNumber
            ? `${messages.postsTitle} – ${locale === "cs" ? "strana" : "page"} ${pageNumber || ""}${seoConfig.titleSuffix}`
            : `${messages.postsTitle}${seoConfig.titleSuffix}`,
    };
}

export async function generatePostsPageStaticParams(locale: AppLocale) {
    const payload = await getPayload({ config: configPromise });
    const { totalDocs } = await payload.count({
        collection: "posts",
        locale,
        overrideAccess: false,
    });

    const totalPages = Math.ceil(totalDocs / postsPerPage);
    const pages: { pageNumber: string }[] = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push({ pageNumber: String(i) });
    }

    return pages;
}
