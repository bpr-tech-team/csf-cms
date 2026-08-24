import { PreviewSearchParams } from "@/app/(frontend)/next/preview/route";
import { defaultLocale, isLocale, withLocalePrefix } from "@/i18n/config";
import { PayloadRequest, CollectionSlug } from "payload";

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    posts: "/posts",
    pages: "",
};

type Props = {
    collection: keyof typeof collectionPrefixMap;
    slug: string;
    req: PayloadRequest;
};

export const generatePreviewPath = ({ collection, req, slug }: Props) => {
    if (slug === undefined || slug === null) {
        return null;
    }

    // Encode to support slugs with special characters
    const encodedSlug = encodeURIComponent(slug);

    const locale = isLocale(req.locale) ? req.locale : defaultLocale;
    const path = withLocalePrefix(
        collection === "pages" && slug === "home"
            ? "/"
            : `${collectionPrefixMap[collection]}/${encodedSlug}`,
        locale,
    );

    const encodedParams = new URLSearchParams({
        path,
        previewSecret: process.env.PREVIEW_SECRET || "",
    } satisfies PreviewSearchParams);

    const url = `/next/preview?${encodedParams.toString()}`;

    return url;
};
