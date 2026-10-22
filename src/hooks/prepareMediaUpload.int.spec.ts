// @vitest-environment node

import { readFile } from "node:fs/promises";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("node:fs/promises", () => ({ readFile: vi.fn() }));

import { prepareMediaUpload } from "./prepareMediaUpload";
import { getImageMediaUrl } from "@/utilities/getImageMediaUrl";

type File = {
    data: Buffer;
    size: number;
    clientUploadContext?: object;
    tempFilePath?: string;
};
const file = (): File => ({ data: Buffer.from("image bytes"), size: 11 });
const run = async (
    data: Record<string, unknown>,
    upload?: File,
    previousKey?: string,
) => {
    const req = { file: upload };
    await prepareMediaUpload({
        data,
        req,
        originalDoc: { _objectKey: previousKey },
    } as unknown as Parameters<typeof prepareMediaUpload>[0]);
    return data;
};

beforeEach(() => vi.clearAllMocks());

describe("upload source identity", () => {
    it("preserves the source on metadata-only edits", async () => {
        const data = await run(
            { _objectKey: "old-key", alt: "Updated description" },
            undefined,
            "old-key",
        );
        expect(data._objectKey).toBe("old-key");
    });

    it("keeps direct client uploads at their signed destination", async () => {
        const data = await run(
            { _objectKey: "signed-key" },
            { ...file(), clientUploadContext: {} },
            "old-key",
        );
        expect(data._objectKey).toBe("signed-key");
    });

    it("assigns a reusable immutable key to a new server upload", async () => {
        const data = await run({}, file());
        expect(data._objectKey).toEqual(expect.any(String));
    });

    it("invalidates an in-place crop even when filename and dimensions do not change", async () => {
        const data = await run({ _objectKey: "old-key" }, file(), "old-key");
        const source = {
            url: "/api/media/file/photo.webp",
            updatedAt: "2026-10-22",
        };
        expect(
            getImageMediaUrl({
                ...source,
                _objectKey: String(data._objectKey),
            }),
        ).not.toBe(getImageMediaUrl({ ...source, _objectKey: "old-key" }));
    });

    it("keeps the newly reserved key and bytes of a processed client upload", async () => {
        vi.mocked(readFile).mockResolvedValue(Buffer.from("processed image"));
        const upload = {
            ...file(),
            data: Buffer.alloc(0),
            tempFilePath: "/tmp/processed-upload",
        };
        const data = await run(
            { _objectKey: "new-signed-key" },
            upload,
            "old-key",
        );
        expect(data._objectKey).toBe("new-signed-key");
        expect(upload.data.toString()).toBe("processed image");
        expect(upload.size).toBe(upload.data.length);
    });

    it("rejects an empty upload before issuing a new identity", async () => {
        await expect(
            run(
                { _objectKey: "old-key" },
                { data: Buffer.alloc(0), size: 0 },
                "old-key",
            ),
        ).rejects.toMatchObject({ status: 400 });
    });
});
