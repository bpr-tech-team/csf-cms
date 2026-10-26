// @vitest-environment node

import { postgresAdapter } from "@payloadcms/db-postgres";
import type { Config, Field, FieldHook, PayloadRequest } from "payload";
import { verifyClientUploadReceipt } from "payload/internal";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Media } from "@/collections/Media";

afterEach(() => vi.unstubAllEnvs());

async function configureStorage(token: string | undefined) {
    vi.stubEnv("BLOB_READ_WRITE_TOKEN", token);
    vi.stubEnv("STORAGE_VERCEL_BLOB_BASE_URL", undefined);
    vi.resetModules();
    const { plugins } = await import("./index");
    const config: Config = {
        secret: "test-secret",
        db: postgresAdapter({ pool: {} }),
        collections: [Media],
    };
    return plugins[0](config);
}

function getURLAfterRead(fields: Field[], size?: string): FieldHook {
    let nestedFields = fields;
    if (size) {
        for (const name of ["sizes", size]) {
            const group = nestedFields.find(
                (field) =>
                    field.type === "group" &&
                    "name" in field &&
                    field.name === name,
            );
            if (!group || group.type !== "group")
                throw new Error(`Missing ${name} storage fields`);
            nestedFields = group.fields;
        }
    }
    const field = nestedFields.find(
        (field) => field.type === "text" && field.name === "url",
    );
    if (field?.type !== "text" || !field.hooks?.afterRead?.[0])
        throw new Error("Missing storage URL hook");
    return field.hooks.afterRead[0];
}

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
    const configured = await configureStorage("vercel_blob_rw_test_test");
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
            secret: configured.secret,
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

describe("public media delivery", () => {
    it.each([
        {
            prefix: "campaign",
            _objectKey: "existing-key",
            folder: "campaign/existing-key",
        },
        { prefix: "legacy", _objectKey: undefined, folder: "legacy" },
        { prefix: "", _objectKey: undefined, folder: "" },
    ])(
        "serves originals and variants directly from Blob for $folder",
        async ({ prefix, _objectKey, folder }) => {
            const configured = await configureStorage(
                "vercel_blob_rw_test_test",
            );
            const media = configured.collections!.find(
                ({ slug }) => slug === "media",
            )!;
            const data = {
                filename: "hero photo.png",
                prefix,
                _objectKey,
                sizes: { large: { filename: "hero photo-1400x788.png" } },
            };
            for (const size of [undefined, "large"]) {
                const hook = getURLAfterRead(media.fields, size);
                const url = await hook({
                    data,
                    value: "/api/media/file/hero.png",
                } as unknown as Parameters<FieldHook>[0]);
                const filename = size
                    ? "hero%20photo-1400x788.png"
                    : "hero%20photo.png";
                expect(url).toBe(
                    `https://test.public.blob.vercel-storage.com/${folder ? `${folder}/` : ""}${filename}`,
                );
            }
            expect(media.access).toEqual(Media.access);
        },
    );

    it("preserves local storage when Blob is not configured", async () => {
        const configured = await configureStorage(undefined);
        const media = configured.collections!.find(
            ({ slug }) => slug === "media",
        )!;
        expect(media.upload).toEqual(Media.upload);
        const url = media.fields.find(
            (field) => field.type === "text" && field.name === "url",
        );
        expect(url?.type === "text" && url.hooks?.afterRead).toBeUndefined();
        expect(media.access).toEqual(Media.access);
    });
});

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
