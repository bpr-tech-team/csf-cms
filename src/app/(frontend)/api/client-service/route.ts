export async function POST() {
    // TODO: Connect client-service authentication and establish the customer session.
    // Do not store credentials in Payload form submissions or log request bodies.
    return Response.json(
        { code: "NOT_IMPLEMENTED" },
        { status: 501, headers: { "Cache-Control": "no-store" } },
    );
}
