import type { PayloadRequest } from "payload";

import { revalidateTag } from "next/cache";

export const revalidateRedirects = <T>({
    doc,
    req: { payload, context },
}: {
    doc: T;
    req: PayloadRequest;
}): T => {
    if (context.disableRevalidate) return doc;
    payload.logger.info(`Revalidating redirects`);

    revalidateTag("redirects", { expire: 0 });

    return doc;
};
