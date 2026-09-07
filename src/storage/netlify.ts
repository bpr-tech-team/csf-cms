import { getDeployStore, getStore } from "@netlify/blobs";
import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";
import { readFile } from "node:fs/promises";

// Preview writes must never change production media.
const mediaStore = () =>
    process.env.NETLIFY_STORAGE_CONTEXT === "production"
        ? getStore({ name: "payload-media", consistency: "strong" })
        : getDeployStore({ name: "payload-media", consistency: "strong" });

export const netlifyStorageAdapter: Adapter = () => ({
    name: "netlify-blobs",
    async handleUpload({ file }) {
        const buffer = file.tempFilePath
            ? await readFile(file.tempFilePath)
            : file.buffer;
        await mediaStore().set(file.filename, new Uint8Array(buffer), {
            metadata: { contentType: file.mimeType },
        });
    },
    async handleDelete({ filename }) {
        await mediaStore().delete(filename);
    },
    async staticHandler(req, { params, headers: incomingHeaders }) {
        const result = await mediaStore().getWithMetadata(params.filename, {
            type: "stream",
        });
        if (!result) return new Response("Not found", { status: 404 });

        const headers = new Headers(incomingHeaders);
        const mimeType =
            typeof result.metadata.contentType === "string"
                ? result.metadata.contentType
                : "application/octet-stream";
        headers.set("Content-Type", mimeType);
        headers.set("X-Content-Type-Options", "nosniff");
        if (mimeType === "image/svg+xml") {
            headers.set("Content-Security-Policy", "script-src 'none'");
        }
        headers.set("Cache-Control", "public, max-age=0, must-revalidate");
        if (result.etag) {
            const etag = `"${result.etag.replaceAll('"', "")}"`;
            headers.set("ETag", etag);
            if (req.headers.get("if-none-match") === etag) {
                await result.data.cancel();
                return new Response(null, { status: 304, headers });
            }
        }
        if (req.method === "HEAD") {
            await result.data.cancel();
            return new Response(null, { headers });
        }
        return new Response(result.data, { headers });
    },
});
