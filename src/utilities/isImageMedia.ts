import type { Media } from "@/payload-types";

export const isImageMedia = (
    resource?: Media | number | null,
): resource is Media & { url: string } =>
    Boolean(
        resource &&
        typeof resource === "object" &&
        resource.url &&
        resource.mimeType?.startsWith("image/"),
    );
