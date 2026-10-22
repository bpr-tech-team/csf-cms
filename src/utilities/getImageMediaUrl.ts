import type { Media } from "@/payload-types";

import { getMediaUrl } from "./getMediaUrl";

type ImageSource = Pick<Media, "url" | "updatedAt" | "_objectKey">;

export const getImageMediaUrl = (image: ImageSource): string =>
    // Blob reserves a new object key on replacement; alt/caption edits keep it.
    // Legacy/local files may be overwritten, so retain their timestamp version.
    getMediaUrl(image.url, image._objectKey || image.updatedAt);
