import { describe, expect, it } from "vitest";

import { getImageMediaUrl } from "./getImageMediaUrl";

const image = {
    url: "/api/media/file/hero.webp",
    _objectKey: "original-file-key",
    updatedAt: "2026-10-01T00:00:00.000Z",
};

describe("image cache identity", () => {
    it("keeps a Blob image cached when only metadata changes", () => {
        expect(
            getImageMediaUrl({
                ...image,
                updatedAt: "2026-10-22T00:00:00.000Z",
            }),
        ).toBe(getImageMediaUrl(image));
    });

    it("invalidates a replacement even when it reuses the same filename", () => {
        expect(
            getImageMediaUrl({ ...image, _objectKey: "replacement-file-key" }),
        ).not.toBe(getImageMediaUrl(image));
    });

    it("keeps timestamp invalidation for legacy files without immutable keys", () => {
        const legacy = { ...image, _objectKey: null };
        expect(
            getImageMediaUrl({
                ...legacy,
                updatedAt: "2026-10-22T00:00:00.000Z",
            }),
        ).not.toBe(getImageMediaUrl(legacy));
    });
});
