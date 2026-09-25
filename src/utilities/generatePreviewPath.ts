import { PreviewSearchParams } from "@/app/(frontend)/next/preview/route";
import { defaultLocale, isLocale, withLocalePrefix } from "@/i18n/config";
import { PayloadRequest, CollectionSlug } from "payload";
import type { Page } from "@/payload-types";
import { getPagePath } from "./getPagePath";

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
    posts: "/posts",
    pages: "",
};

type Props = {
    collection: keyof typeof collectionPrefixMap;
    slug: string;
    req: PayloadRequest;
    pageType?: Page["pageType"];
};

export const generatePreviewPath = ({
    collection,
    req,
    slug,
    pageType,
}: Props) => {
    if (slug === undefined || slug === null) {
        return null;
    }

    // Encode to support slugs with special characters
    const encodedSlug = encodeURIComponent(slug);

    const locale = isLocale(req.locale) ? req.locale : defaultLocale;
    const path = withLocalePrefix(
        collection === "pages"
            ? getPagePath({ slug, pageType }, locale)
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
