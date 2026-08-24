import { getServerSideSitemap } from "next-sitemap";
import { getPayload } from "payload";
import config from "@payload-config";
import { defaultLocale, locales, withLocalePrefix } from "@/i18n/config";
import { unstable_cache } from "next/cache";
import { getCanonicalUrl } from "@/seo/config";

const getPostsSitemap = unstable_cache(
    async () => {
        const payload = await getPayload({ config });
        const results = await payload.find({
            collection: "posts",
            overrideAccess: false,
            draft: false,
            depth: 0,
            limit: 1000,
            locale: "all",
            pagination: false,
            where: {
                _status: {
                    equals: "published",
                },
            },
            select: {
                slug: true,
                updatedAt: true,
            },
        });

        const dateFallback = new Date().toISOString();

        const sitemap = results.docs
            ? results.docs.flatMap((post) =>
                  locales
                      .map((locale) => {
                          const slug =
                              typeof post.slug === "string"
                                  ? post.slug
                                  : post.slug?.[locale] ||
                                    post.slug?.[defaultLocale];

                          if (!slug) {
                              return null;
                          }

                          return {
                              loc: getCanonicalUrl(
                                  withLocalePrefix(`/posts/${slug}`, locale),
                              ),
                              lastmod: post.updatedAt || dateFallback,
                          };
                      })
                      .filter(
                          (entry): entry is { lastmod: string; loc: string } =>
                              Boolean(entry),
                      ),
              )
            : [];

        return sitemap;
    },
    ["posts-sitemap"],
    {
        tags: ["posts-sitemap"],
    },
);

export async function GET() {
    const sitemap = await getPostsSitemap();

    return getServerSideSitemap(sitemap);
}
