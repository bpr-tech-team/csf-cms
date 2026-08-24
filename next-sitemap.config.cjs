const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://www.csf.cz";

const NORMALIZED_SITE_URL = SITE_URL.startsWith("http")
    ? SITE_URL.replace(/\/$/, "")
    : `https://${SITE_URL.replace(/\/$/, "")}`;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: NORMALIZED_SITE_URL,
    generateRobotsTxt: true,
    exclude: ["/posts-sitemap.xml", "/pages-sitemap.xml", "/*", "/posts/*"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin",
                    "/admin/*",
                    "/api",
                    "/api/*",
                    "/next/preview",
                    "/next/exit-preview",
                    "/next/seed",
                    "/search",
                ],
            },
        ],
        additionalSitemaps: [
            `${NORMALIZED_SITE_URL}/pages-sitemap.xml`,
            `${NORMALIZED_SITE_URL}/posts-sitemap.xml`,
        ],
    },
};
