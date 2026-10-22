import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { APIError, type CollectionBeforeChangeHook } from "payload";

export const prepareMediaUpload: CollectionBeforeChangeHook = async ({
    data,
    originalDoc,
    req,
}) => {
    const file = req.file;

    // Unmodified client uploads are already in Blob and must not be re-uploaded.
    if (!file || file.clientUploadContext) return data;

    // Payload 3.90.2 writes processed client uploads to disk, but the Blob
    // adapter only reads file.data. https://github.com/payloadcms/payload/issues/18333
    if (file.tempFilePath) {
        file.data = await readFile(file.tempFilePath);
        file.size = file.data.length;
    }

    if (file.data.length === 0) {
        throw new APIError(
            "The uploaded file is empty. Please upload it again.",
            400,
        );
    }

    // Server uploads and in-place crops also need a fresh storage/cache identity.
    // Keep a destination already reserved for a new processed client upload.
    if (!data._objectKey || data._objectKey === originalDoc?._objectKey) {
        data._objectKey = randomUUID();
    }

    return data;
};
