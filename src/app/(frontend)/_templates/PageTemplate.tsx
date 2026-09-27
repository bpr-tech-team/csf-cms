import type { Metadata } from "next";

import { PayloadRedirects } from "@/components/PayloadRedirects";
import { SetHeaderTheme } from "@/components/SetHeaderTheme";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { PAGE_HERO_BLOCK_TYPES } from "@/collections/Pages/validateLayout";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import { generateMeta } from "@/utilities/generateMeta";
import { cn } from "@/utilities/ui";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import { getPayload } from "payload";
import { findPageBySlug } from "@/utilities/findPageBySlug";
import {
    getPagePath,
    pagePathPrefixes,
    type PageType,
} from "@/utilities/getPagePath";

type PageParams = {
    slug?: string;
};

export type PageTemplateArgs = {
    locale: AppLocale;
    params: Promise<PageParams>;
    pageType?: PageType;
};

export async function generatePageStaticParams(
    locale: AppLocale,
    pageType: PageType = "standard",
) {
    const payload = await getPayload({ config: configPromise });
    const pages = await payload.find({
        collection: "pages",
        draft: false,
        limit: 1000,
        locale: "all",
        overrideAccess: false,
        pagination: false,
        where: {
            pageType: { equals: pageType },
        },
        select: {
            slug: true,
        },
    });

    const params = pages.docs
        ?.map(({ slug }) => {
            if (typeof slug === "string") {
                return slug;
            }

            return slug?.[locale] || slug?.[defaultLocale];
        })
        .filter(
            (slug): slug is string =>
                Boolean(slug) && !(pageType === "standard" && slug === "home"),
        )
        .map((slug) => {
            return { slug };
        });

    return params;
}

export async function PageTemplate({
    locale,
    params: paramsPromise,
    pageType = "standard",
}: PageTemplateArgs) {
    const { isEnabled: draft } = await draftMode();
    const { slug } = await paramsPromise;
    const { page, url } = await resolvePageRoute(locale, slug, pageType);

    if (!page) {
        return <PayloadRedirects locale={locale} url={url} />;
    }

    const canonicalPath = getPagePath(page, locale);
    // Proxy handles aliases before ISR. Never render a duplicate if it is
    // bypassed (for example during draft preview).
    if (url !== canonicalPath) notFound();

    const { layout } = page;
    const firstBlock = layout[0];
    const firstBlockType = firstBlock?.blockType;
    const startsWithHero = PAGE_HERO_BLOCK_TYPES.some(
        (blockType) => blockType === firstBlockType,
    );

    return (
        <article className={cn("pt-16", startsWithHero ? "pb-0" : "pb-24")}>
            <SetHeaderTheme theme={startsWithHero ? "dark" : "light"} />
            <PayloadRedirects disableNotFound locale={locale} url={url} />

            {draft && <LivePreviewListener />}

            <RenderBlocks
                blocks={layout}
                locale={locale}
                isFirstSection={startsWithHero}
                page={page}
                draft={draft}
            />
        </article>
    );
}

export async function generatePageMetadata({
    locale,
    params: paramsPromise,
    pageType = "standard",
}: PageTemplateArgs): Promise<Metadata> {
    const { slug } = await paramsPromise;
    const { page, url } = await resolvePageRoute(locale, slug, pageType);

    return generateMeta({
        doc: page,
        locale,
        path: page ? getPagePath(page, locale) : url,
    });
}

const resolvePageRoute = cache(
    async (locale: AppLocale, slug: string | undefined, pageType: PageType) => {
        const prefix = pagePathPrefixes[pageType][locale];
        // Next.js already decodes route params; encode exactly once for URLs.
        const url = withLocalePrefix(
            slug === undefined
                ? "/"
                : `/${prefix ? `${prefix}/` : ""}${encodeURIComponent(slug)}`,
            locale,
        );
        const { isEnabled: draft } = await draftMode();
        const page = await findPageBySlug({
            locale,
            slug: slug ?? "home",
            pageTypes: [pageType],
            draft,
        });
        return { page, url };
    },
);
