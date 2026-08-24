import { getServerSideSitemap } from "next-sitemap";
import { getPayload } from "payload";
import config from "@payload-config";
import { locales, defaultLocale, withLocalePrefix } from "@/i18n/config";
import { unstable_cache } from "next/cache";
import { getCanonicalUrl, getSiteUrl } from "@/seo/config";

const getPagesSitemap = unstable_cache(
    async () => {
        const payload = await getPayload({ config });
        const SITE_URL = getSiteUrl();

        const results = await payload.find({
            collection: "pages",
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

        const defaultSitemap = [
            ...locales.map((locale) => ({
                loc: `${SITE_URL}${withLocalePrefix("/posts", locale)}`,
                lastmod: dateFallback,
            })),
        ];

        const sitemap = results.docs
            ? results.docs.flatMap((page) =>
                  locales
                      .map((locale) => {
                          const slug =
                              typeof page.slug === "string"
                                  ? page.slug
                                  : page.slug?.[locale] ||
                                    page.slug?.[defaultLocale];

                          if (!slug) {
                              return null;
                          }

                          return {
                              loc: getCanonicalUrl(
                                  withLocalePrefix(
                                      slug === "home" ? "/" : `/${slug}`,
                                      locale,
                                  ),
                              ),
                              lastmod: page.updatedAt || dateFallback,
                          };
                      })
                      .filter(
                          (entry): entry is { lastmod: string; loc: string } =>
                              Boolean(entry),
                      ),
              )
            : [];

        return [...defaultSitemap, ...sitemap];
    },
    ["pages-sitemap"],
    {
        tags: ["pages-sitemap"],
    },
);

export async function GET() {
    const sitemap = await getPagesSitemap();

    return getServerSideSitemap(sitemap);
}
