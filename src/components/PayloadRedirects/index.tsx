import type React from "react";
import type { Page, Post } from "@/payload-types";

import { getCachedDocument } from "@/utilities/getDocument";
import { getCachedRedirects } from "@/utilities/getRedirects";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { getPagePath } from "@/utilities/getPagePath";

interface Props {
    disableNotFound?: boolean;
    locale?: AppLocale;
    url: string;
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({
    disableNotFound,
    locale = defaultLocale,
    url,
}) => {
    const redirects = await getCachedRedirects()();

    const redirectItem = redirects.find((redirect) => redirect.from === url);

    if (redirectItem) {
        if (redirectItem.to?.url) {
            redirect(
                redirectItem.to.url.startsWith("/")
                    ? withLocalePrefix(redirectItem.to.url, locale)
                    : redirectItem.to.url,
            );
        }

        const reference = redirectItem.to?.reference;
        if (reference?.value != null) {
            const document =
                typeof reference.value === "object"
                    ? reference.value
                    : ((await getCachedDocument(
                          reference.relationTo,
                          reference.value,
                          locale,
                      )()) as Page | Post);
            if (document?.slug) {
                redirect(
                    withLocalePrefix(
                        reference.relationTo === "pages"
                            ? getPagePath(document as Page)
                            : `/posts/${document.slug}`,
                        locale,
                    ),
                );
            }
        }
    }

    if (disableNotFound) return null;

    notFound();
};
