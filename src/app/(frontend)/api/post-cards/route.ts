import { getPostCards } from "@/utilities/getPostCards";
import { parsePostCardsQuery } from "@/utilities/postsGrid";

const headers = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
    const query = parsePostCardsQuery(new URL(request.url).searchParams);
    if (!query) {
        return Response.json(
            { error: "Invalid query parameters." },
            { status: 400, headers },
        );
    }
    try {
        return Response.json(await getPostCards(query), { headers });
    } catch (error) {
        console.error("Could not load post cards", error);
        return Response.json(
            { error: "Could not load posts." },
            { status: 500, headers },
        );
    }
}
