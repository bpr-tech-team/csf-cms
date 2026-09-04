import type { Metadata } from "next";

import { JsonLd, blogPostingJsonLd } from "@/seo/structuredData";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { PostHero } from "@/heros/PostHero";
import { RelatedPosts } from "@/blocks/RelatedPosts/Component";
import { SetHeaderTheme } from "@/components/SetHeaderTheme";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import type { Post } from "@/payload-types";
import RichText from "@/components/RichText";
import { generateMeta } from "@/utilities/generateMeta";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import React, { cache } from "react";
import { getPayload } from "payload";

type PostParams = {
    slug?: string;
};

export type PostTemplateArgs = {
    locale: AppLocale;
    params: Promise<PostParams>;
};

export async function generatePostStaticParams(locale: AppLocale) {
    const payload = await getPayload({ config: configPromise });
    const posts = await payload.find({
        collection: "posts",
        draft: false,
        limit: 1000,
        locale: "all",
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    });

    return posts.docs
        .map(({ slug }) => {
            if (typeof slug === "string") {
                return slug;
            }

            return slug?.[locale] || slug?.[defaultLocale];
        })
        .filter((slug): slug is string => Boolean(slug))
        .map((slug) => {
            return { slug };
        });
}

export async function PostTemplate({
    locale,
    params: paramsPromise,
}: PostTemplateArgs) {
    const { isEnabled: draft } = await draftMode();
    const { slug = "" } = await paramsPromise;
    const decodedSlug = decodeURIComponent(slug);
    const path = `/posts/${decodedSlug}`;
    const url = withLocalePrefix(path, locale);
    const post = await queryPostBySlug({ locale, slug: decodedSlug });

    if (!post) return <PayloadRedirects locale={locale} url={url} />;

    return (
        <article className="pt-16 pb-16">
            <SetHeaderTheme theme="dark" />

            <PayloadRedirects disableNotFound locale={locale} url={url} />

            {draft && <LivePreviewListener />}

            <JsonLd data={blogPostingJsonLd(post, locale, url)} />
            <PostHero locale={locale} post={post} />

            <div className="flex flex-col items-center gap-4 pt-8">
                <div className="container">
                    <RichText
                        className="mx-auto max-w-3xl"
                        data={post.content}
                        enableGutter={false}
                    />
                    {post.relatedPosts && post.relatedPosts.length > 0 && (
                        <RelatedPosts
                            className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                            docs={post.relatedPosts.filter(
                                (post) => typeof post === "object",
                            )}
                            locale={locale}
                        />
                    )}
                </div>
            </div>
        </article>
    );
}

export async function generatePostMetadata({
    locale,
    params: paramsPromise,
}: PostTemplateArgs): Promise<Metadata> {
    const { slug = "" } = await paramsPromise;
    const decodedSlug = decodeURIComponent(slug);
    const path = withLocalePrefix(`/posts/${decodedSlug}`, locale);
    const post = await queryPostBySlug({ locale, slug: decodedSlug });

    return generateMeta({ doc: post, locale, path });
}

const queryPostBySlug = cache(
    async ({ locale, slug }: { locale: AppLocale; slug: string }) => {
        const { isEnabled: draft } = await draftMode();
        const payload = await getPayload({ config: configPromise });

        const result = await payload.find({
            collection: "posts",
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
            return result.docs[0] as Post;
        }

        if (locale === defaultLocale) {
            return null;
        }

        const fallbackResult = await payload.find({
            collection: "posts",
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
            collection: "posts",
            draft,
            fallbackLocale: defaultLocale,
            id: fallbackDoc.id,
            locale,
            overrideAccess: draft,
        }) as Promise<Post>;
    },
);
