import { getServerSideSitemap } from "next-sitemap";
import { unstable_cache } from "next/cache";

import { getSitemapEntries } from "@/seo/getSitemapEntries";

const getPostsSitemap = unstable_cache(
    () => getSitemapEntries("posts"),
    ["posts-sitemap"],
    {
        tags: ["posts-sitemap"],
    },
);

export async function GET() {
    const sitemap = await getPostsSitemap();

    return getServerSideSitemap(sitemap);
}
