import type { CollectionAfterReadHook } from "payload";
import type { Page } from "@/payload-types";

export const populateAuthors: CollectionAfterReadHook<Page> = async ({
    doc,
    req,
}) => {
    if (doc.pageType !== "post" || !doc.authors?.length) return doc;

    const ids = doc.authors.map((author) =>
        typeof author === "object" ? author.id : author,
    );
    // Users are private. Read only the public names for article attribution,
    // and retain the editor's selection order without exposing user records.
    const { docs } = await req.payload.find({
        collection: "users",
        where: { id: { in: ids } },
        select: { name: true },
        depth: 0,
        pagination: false,
        overrideAccess: true,
        req,
    });
    const names = new Map(docs.map(({ id, name }) => [id, name]));
    doc.populatedAuthors = ids
        .filter((id) => names.has(id))
        .map((id) => ({ id: String(id), name: names.get(id) }));
    return doc;
};
