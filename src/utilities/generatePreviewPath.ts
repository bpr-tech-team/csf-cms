import { PreviewSearchParams } from "@/app/(frontend)/next/preview/route";
import { defaultLocale, isLocale } from "@/i18n/config";
import { PayloadRequest } from "payload";
import type { Page } from "@/payload-types";
import { getPagePath } from "./getPagePath";

type Props = {
    collection: "pages";
    slug: string;
    req: PayloadRequest;
    pageType?: Page["pageType"];
};

export const generatePreviewPath = ({ req, slug, pageType }: Props) => {
    if (slug === undefined || slug === null) {
        return null;
    }

    const locale = isLocale(req.locale) ? req.locale : defaultLocale;
    const path = getPagePath({ slug, pageType }, locale);

    const encodedParams = new URLSearchParams({
        path,
        previewSecret: process.env.PREVIEW_SECRET || "",
    } satisfies PreviewSearchParams);

    const url = `/next/preview?${encodedParams.toString()}`;

    return url;
};
