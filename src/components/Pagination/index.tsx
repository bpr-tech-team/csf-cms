"use client";

import { useRouter } from "next/navigation";
import { PaginationControls } from "./Controls";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import { cn } from "@/utilities/ui";

export function Pagination({
    className,
    locale = defaultLocale,
    page,
    totalPages,
}: {
    className?: string;
    locale?: AppLocale;
    page: number;
    totalPages: number;
}) {
    const router = useRouter();
    return (
        <div className={cn("my-12", className)}>
            <PaginationControls
                locale={locale}
                page={page}
                totalPages={totalPages}
                onPageChange={(nextPage) =>
                    router.push(
                        withLocalePrefix(`/posts/page/${nextPage}`, locale),
                    )
                }
            />
        </div>
    );
}
