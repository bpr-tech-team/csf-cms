import { iconCatalog } from "@/utilities/fontAwesome.server";

export function GET() {
    return Response.json(iconCatalog, {
        headers: { "Cache-Control": "public, max-age=86400" },
    });
}
