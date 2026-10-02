import type { GalleryBlock } from "@/payload-types";

export const getGalleryImages = (images?: GalleryBlock["images"] | null) =>
    (images || []).flatMap(({ id, image }) =>
        image &&
        typeof image === "object" &&
        image.url &&
        image.mimeType?.startsWith("image/")
            ? [{ id: id ?? String(image.id), image }]
            : [],
    );
