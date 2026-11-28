import { getServerSideSitemap } from "next-sitemap";
import { unstable_cache } from "next/cache";

import { getSitemapEntries } from "@/seo/getSitemapEntries";

const getPagesSitemap = unstable_cache(
    () => getSitemapEntries("pages"),
    ["pages-sitemap"],
    {
        tags: ["pages-sitemap"],
    },
);

export async function GET() {
    const sitemap = await getPagesSitemap();

    return getServerSideSitemap(sitemap);
}
