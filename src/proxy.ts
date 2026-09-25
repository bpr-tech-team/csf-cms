import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { findPageBySlug } from "@/utilities/findPageBySlug";
import {
    getPagePath,
    getPageRoutePrefixes,
    pagePathPrefixes,
    type PageType,
} from "@/utilities/getPagePath";

export async function proxy(request: NextRequest) {
    // Preview URLs are generated from the draft. The page still validates
    // both Next's signed preview cookie and its canonical path.
    if (
        !["GET", "HEAD"].includes(request.method) ||
        request.cookies.has("__prerender_bypass")
    )
        return NextResponse.next();

    const segments = request.nextUrl.pathname.split("/").filter(Boolean);
    const locale: AppLocale = segments[0] === "en" ? "en" : defaultLocale;
    if (locale === "en") segments.shift();
    const prefix = segments.length === 2 ? segments[0] : "";
    const encodedSlug = segments.at(-1);
    if (!encodedSlug || segments.length > 2) return NextResponse.next();

    let slug: string;
    try {
        slug = decodeURIComponent(encodedSlug);
    } catch {
        return NextResponse.next();
    }
    const pageTypes = (Object.keys(pagePathPrefixes) as PageType[]).filter(
        (type) => getPageRoutePrefixes(type, locale).includes(prefix),
    );
    if (!pageTypes.length) return NextResponse.next();

    const page = await findPageBySlug({
        locale,
        slug,
        pageTypes,
        depth: 0,
        select: { slug: true, pageType: true },
    });
    if (!page) return NextResponse.next();

    const canonicalPath = getPagePath(page, locale);
    if (request.nextUrl.pathname === canonicalPath) return NextResponse.next();

    // Redirect before rendering/ISR, avoiding Next.js's duplicate Location
    // on a cache miss (vercel/next.js#82117). Preserve the query string.
    const destination = request.nextUrl.clone();
    destination.pathname = canonicalPath;
    return NextResponse.redirect(destination, 308);
}

export const config = {
    // Only page routes that can have an old alias or a fallback-language slug.
    // Czech branch URLs need no lookup. Assets, API, admin and posts skip Proxy.
    matcher: [
        "/:slug((?!api$|admin$|posts$|en$|next$|_next$|codex-block-preview$|.*\\.)[^/]+)",
        "/sluzby/:slug",
        "/pocitace/:slug",
        "/en/:slug((?!posts$|.*\\.)[^/]+)",
        "/en/services/:slug",
        "/en/computers/:slug",
        "/en/contact/:slug",
    ],
};
