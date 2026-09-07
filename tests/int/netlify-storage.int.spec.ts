// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PayloadRequest } from "payload";
import { Media } from "@/collections/Media";

const stores = vi.hoisted(() => ({
    production: { set: vi.fn(), delete: vi.fn(), getWithMetadata: vi.fn() },
    preview: { set: vi.fn(), delete: vi.fn(), getWithMetadata: vi.fn() },
}));

vi.mock("@netlify/blobs", () => ({
    getStore: () => stores.production,
    getDeployStore: () => stores.preview,
}));

import { netlifyStorageAdapter } from "@/storage/netlify";

const request = (method = "GET", headers: Record<string, string> = {}) =>
    ({ method, headers: new Headers(headers) }) as PayloadRequest;
const params = { collection: "media", filename: "photo.webp" };
const adapter = netlifyStorageAdapter({ collection: Media });

describe("Netlify media storage", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.stubEnv("NETLIFY_STORAGE_CONTEXT", "production");
    });
    afterEach(() => vi.unstubAllEnvs());

    it("uploads binary data with its MIME type to persistent production storage", async () => {
        await adapter.handleUpload({
            collection: Media,
            data: {},
            clientUploadContext: undefined,
            req: request(),
            file: {
                filename: "photo.webp",
                buffer: Buffer.from("image"),
                filesize: 5,
                mimeType: "image/webp",
            },
        });
        expect(stores.production.set).toHaveBeenCalledWith(
            "photo.webp",
            new Uint8Array(Buffer.from("image")),
            { metadata: { contentType: "image/webp" } },
        );
        expect(stores.preview.set).not.toHaveBeenCalled();
    });

    it("isolates preview deletions from production", async () => {
        vi.stubEnv("NETLIFY_STORAGE_CONTEXT", "preview");
        await adapter.handleDelete({
            collection: Media,
            doc: {
                id: 1,
                filename: params.filename,
                filesize: 5,
                height: 1,
                width: 1,
                mimeType: "image/webp",
                sizes: {},
            },
            filename: params.filename,
            req: request(),
        });
        expect(stores.preview.delete).toHaveBeenCalledWith(params.filename);
        expect(stores.production.delete).not.toHaveBeenCalled();
    });

    it("serves image bytes and MIME type without needing a database document", async () => {
        stores.production.getWithMetadata.mockResolvedValue({
            data: new Response("image").body,
            etag: "v1",
            metadata: { contentType: "image/webp" },
        });
        const response = await adapter.staticHandler(request(), { params });
        expect(response.status).toBe(200);
        expect(response.headers.get("content-type")).toBe("image/webp");
        expect(await response.text()).toBe("image");
    });

    it("returns 404 for missing files", async () => {
        stores.production.getWithMetadata.mockResolvedValue(null);
        expect(
            (await adapter.staticHandler(request(), { params })).status,
        ).toBe(404);
    });

    it("returns a bodyless 304 for an unchanged file", async () => {
        const cancel = vi.fn();
        stores.production.getWithMetadata.mockResolvedValue({
            data: new ReadableStream({ cancel }),
            etag: "v1",
            metadata: {},
        });
        const response = await adapter.staticHandler(
            request("GET", { "if-none-match": '"v1"' }),
            { params },
        );
        expect(response.status).toBe(304);
        expect(response.body).toBeNull();
        expect(cancel).toHaveBeenCalled();
    });
});
