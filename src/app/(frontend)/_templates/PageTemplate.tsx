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
import React, { cache } from "react";
import { getPayload } from "payload";

type PageParams = {
    slug?: string;
};

export type PageTemplateArgs = {
    locale: AppLocale;
    params: Promise<PageParams>;
    pathPrefix?: string;
};

export async function generatePageStaticParams(locale: AppLocale) {
    const payload = await getPayload({ config: configPromise });
    const pages = await payload.find({
        collection: "pages",
        draft: false,
        limit: 1000,
        locale: "all",
        overrideAccess: false,
        pagination: false,
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
        .filter((slug): slug is string => Boolean(slug) && slug !== "home")
        .map((slug) => {
            return { slug };
        });

    return params;
}

export async function PageTemplate({
    locale,
    params: paramsPromise,
    pathPrefix,
}: PageTemplateArgs) {
    const { isEnabled: draft } = await draftMode();
    const { slug = "home" } = await paramsPromise;
    const decodedSlug = decodeURIComponent(slug);
    const path =
        decodedSlug === "home"
            ? "/"
            : `/${pathPrefix ? `${pathPrefix}/` : ""}${decodedSlug}`;
    const url = withLocalePrefix(path, locale);
    const page = await queryPageBySlug({
        locale,
        slug: decodedSlug,
    });

    if (!page) {
        return <PayloadRedirects locale={locale} url={url} />;
    }

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
            />
        </article>
    );
}

export async function generatePageMetadata({
    locale,
    params: paramsPromise,
    pathPrefix,
}: PageTemplateArgs): Promise<Metadata> {
    const { slug = "home" } = await paramsPromise;
    const decodedSlug = decodeURIComponent(slug);
    const page = await queryPageBySlug({
        locale,
        slug: decodedSlug,
    });

    return generateMeta({
        doc: page,
        locale,
        path: withLocalePrefix(
            decodedSlug === "home"
                ? "/"
                : `/${pathPrefix ? `${pathPrefix}/` : ""}${decodedSlug}`,
            locale,
        ),
    });
}

const queryPageBySlug = cache(
    async ({ locale, slug }: { locale: AppLocale; slug: string }) => {
        const { isEnabled: draft } = await draftMode();
        const payload = await getPayload({ config: configPromise });

        const result = await payload.find({
            collection: "pages",
            draft,
            fallbackLocale: locale === defaultLocale ? false : defaultLocale,
            limit: 1,
            locale,
            overrideAccess: draft,
            pagination: false,
            where: {
                slug: {
                    equals: slug,
                },
            },
        });

        if (result.docs?.[0]) {
            return result.docs[0];
        }

        if (locale === defaultLocale) {
            return null;
        }

        const fallbackResult = await payload.find({
            collection: "pages",
            draft,
            limit: 1,
            locale: defaultLocale,
            overrideAccess: draft,
            pagination: false,
            where: {
                slug: {
                    equals: slug,
                },
            },
        });

        const fallbackDoc = fallbackResult.docs?.[0];

        if (!fallbackDoc) {
            return null;
        }

        return payload.findByID({
            collection: "pages",
            draft,
            fallbackLocale: defaultLocale,
            id: fallbackDoc.id,
            locale,
            overrideAccess: draft,
        });
    },
);
