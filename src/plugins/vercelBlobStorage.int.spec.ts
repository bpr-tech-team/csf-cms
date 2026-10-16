// @vitest-environment node

import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { postgresAdapter } from "@payloadcms/db-postgres";
import type { Config, PayloadRequest } from "payload";
import { verifyClientUploadReceipt } from "payload/internal";
import { describe, expect, it, vi } from "vitest";

type UploadTarget = {
    clientUploadContext: { signedReceipt: string };
    filename: string;
    pathname: string;
};

async function createUploadRequest({
    existingObjectKey,
    canWrite = true,
}: {
    existingObjectKey?: string;
    canWrite?: boolean;
} = {}) {
    const config: Config = {
        secret: "test-secret",
        db: postgresAdapter({ pool: {} }),
        collections: [{ slug: "media", fields: [], upload: true }],
    };
    const configured = await vercelBlobStorage({
        collections: { media: true },
        clientUploads: true,
        token: "vercel_blob_rw_test_test",
    })(config);
    const endpoint = configured.endpoints?.find(
        ({ path }) => path === "/vercel-blob-client-upload-route",
    );
    if (!endpoint) throw new Error("Client upload endpoint is missing");

    const existing = {
        id: 74,
        filename: "photo.jpg",
        prefix: "",
        _objectKey: existingObjectKey,
    };
    const req = {
        json: async () => ({
            collectionSlug: "media",
            filename: "photo.jpg",
            mimeType: "image/jpeg",
        }),
        searchParams: new URLSearchParams("issue-client-upload=1"),
        user: { id: 1, collection: "users" },
        t: (key: string) => key,
        payload: {
            secret: config.secret,
            collections: {
                media: {
                    config: {
                        access: {
                            create: () => canWrite,
                            update: () => canWrite,
                        },
                        fields: [],
                        upload: { imageSizes: [] },
                    },
                },
            },
            db: {
                findOne: vi.fn(async ({ where }) =>
                    where.filename.equals === existing.filename
                        ? existing
                        : null,
                ),
            },
            find: vi.fn(async () => ({ docs: [existing] })),
            logger: { error: vi.fn() },
        },
    } as unknown as PayloadRequest;

    const issue = async () => {
        const response = await endpoint.handler(req);
        return (await response.json()) as UploadTarget;
    };

    return { issue, req };
}

describe("Vercel Blob client upload destinations", () => {
    it.each([undefined, "previous-object-key"])(
        "reserves a new name and object key when photo.jpg already exists (%s)",
        async (existingObjectKey) => {
            const { issue, req } = await createUploadRequest({
                existingObjectKey,
            });
            const target = await issue();
            const receipt = verifyClientUploadReceipt({
                collectionSlug: "media",
                req,
                signedReceipt: target.clientUploadContext.signedReceipt,
            });

            expect(target.filename).toMatch(/^[0-9a-f-]{36}-photo\.jpg$/);
            expect(receipt.filename).toBe(target.filename);
            expect(receipt.context._objectKey).toEqual(expect.any(String));
            expect(target.pathname).toBe(
                `${receipt.context._objectKey}/${target.filename}`,
            );
            expect(receipt.context.allowOverwrite).not.toBe(true);
            expect(target.pathname).not.toBe("photo.jpg");
            expect(target.pathname).not.toBe(`${existingObjectKey}/photo.jpg`);
        },
    );

    it("isolates simultaneous uploads with the same filename", async () => {
        const { issue } = await createUploadRequest();
        const [first, second] = await Promise.all([issue(), issue()]);

        expect(first.filename).not.toBe(second.filename);
        expect(first.pathname).not.toBe(second.pathname);
    });

    it("retains collection write access checks", async () => {
        const { issue } = await createUploadRequest({ canWrite: false });

        await expect(issue()).rejects.toMatchObject({ status: 403 });
    });
});
