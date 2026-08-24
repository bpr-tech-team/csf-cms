import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import { Search } from "@/search/Component";
import { SetHeaderTheme } from "@/components/SetHeaderTheme";
import type { CardPostData } from "@/components/Card";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import { seoConfig } from "@/seo/config";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";

type SearchParams = {
    q?: string;
};

export type SearchTemplateArgs = {
    locale: AppLocale;
    searchParams: Promise<SearchParams>;
};

export async function SearchTemplate({
    locale,
    searchParams: searchParamsPromise,
}: SearchTemplateArgs) {
    const { q: query } = await searchParamsPromise;
    const payload = await getPayload({ config: configPromise });
    const messages = frontendMessages[locale];

    const posts = await payload.find({
        collection: "search",
        depth: 1,
        fallbackLocale: locale === defaultLocale ? false : defaultLocale,
        limit: 12,
        locale,
        select: {
            title: true,
            slug: true,
            categories: true,
            meta: true,
        },
        pagination: false,
        ...(query
            ? {
                  where: {
                      or: [
                          {
                              title: {
                                  like: query,
                              },
                          },
                          {
                              "meta.description": {
                                  like: query,
                              },
                          },
                          {
                              "meta.title": {
                                  like: query,
                              },
                          },
                          {
                              slug: {
                                  like: query,
                              },
                          },
                      ],
                  },
              }
            : {}),
    });

    return (
        <div className="pt-24 pb-24">
            <SetHeaderTheme theme="light" />
            <div className="container mb-16">
                <div className="prose dark:prose-invert max-w-none text-center">
                    <h1 className="mb-8 lg:mb-16">{messages.searchTitle}</h1>

                    <div className="max-w-[50rem] mx-auto">
                        <Search locale={locale} />
                    </div>
                </div>
            </div>

            {posts.totalDocs > 0 ? (
                <CollectionArchive
                    locale={locale}
                    posts={posts.docs as CardPostData[]}
                />
            ) : (
                <div className="container">{messages.noResultsFound}</div>
            )}
        </div>
    );
}

export function generateSearchMetadata(locale: AppLocale): Metadata {
    const messages = frontendMessages[locale];

    return {
        robots: {
            follow: true,
            index: false,
        },
        title: `${messages.searchTitle}${seoConfig.titleSuffix}`,
    };
}
