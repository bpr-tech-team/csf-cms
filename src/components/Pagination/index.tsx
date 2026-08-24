"use client";
import {
    Pagination as PaginationComponent,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import { cn } from "@/utilities/ui";
import { useRouter } from "next/navigation";
import React from "react";

export const Pagination: React.FC<{
    className?: string;
    locale?: AppLocale;
    page: number;
    totalPages: number;
}> = (props) => {
    const router = useRouter();

    const { className, locale = defaultLocale, page, totalPages } = props;
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const hasExtraPrevPages = page - 1 > 1;
    const hasExtraNextPages = page + 1 < totalPages;

    return (
        <div className={cn("my-12", className)}>
            <PaginationComponent>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            disabled={!hasPrevPage}
                            onClick={() => {
                                router.push(
                                    withLocalePrefix(
                                        `/posts/page/${page - 1}`,
                                        locale,
                                    ),
                                );
                            }}
                        />
                    </PaginationItem>

                    {hasExtraPrevPages && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {hasPrevPage && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => {
                                    router.push(
                                        withLocalePrefix(
                                            `/posts/page/${page - 1}`,
                                            locale,
                                        ),
                                    );
                                }}
                            >
                                {page - 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationLink
                            isActive
                            onClick={() => {
                                router.push(
                                    withLocalePrefix(
                                        `/posts/page/${page}`,
                                        locale,
                                    ),
                                );
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>

                    {hasNextPage && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => {
                                    router.push(
                                        withLocalePrefix(
                                            `/posts/page/${page + 1}`,
                                            locale,
                                        ),
                                    );
                                }}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {hasExtraNextPages && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            disabled={!hasNextPage}
                            onClick={() => {
                                router.push(
                                    withLocalePrefix(
                                        `/posts/page/${page + 1}`,
                                        locale,
                                    ),
                                );
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </PaginationComponent>
        </div>
    );
};
