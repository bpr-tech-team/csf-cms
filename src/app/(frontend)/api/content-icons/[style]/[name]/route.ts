import { fontAwesomeSVG } from "@/utilities/fontAwesome.server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ style: string; name: string }> },
) {
    const { style, name } = await params;
    const svg = fontAwesomeSVG(`${style}/${name}`);
    if (!svg) return new Response("Not found", { status: 404 });
    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
            "X-Content-Type-Options": "nosniff",
            "Content-Security-Policy": "default-src 'none'; sandbox",
        },
    });
}
