import type { Media } from "@/payload-types";

export function getPdfDownloadUrl(file?: Media | number | null) {
    if (
        !file ||
        typeof file !== "object" ||
        file.mimeType !== "application/pdf"
    )
        return null;

    const url = file.url;
    if (!url) return null;
    if (url.startsWith("/") && !url.startsWith("//")) return url;

    if (!URL.canParse(url)) return null;
    const downloadUrl = new URL(url);
    if (!["https:", "http:"].includes(downloadUrl.protocol)) return null;

    if (downloadUrl.hostname.endsWith(".public.blob.vercel-storage.com")) {
        // The download attribute applies only to same-origin HTTP URLs.
        downloadUrl.searchParams.set("download", "1");
    }
    return downloadUrl.href;
}
