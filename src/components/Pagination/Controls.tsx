"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { frontendMessages } from "@/i18n/frontend";
import type { AppLocale } from "@/i18n/config";

export function PaginationControls({
    locale,
    page,
    totalPages,
    onPageChange,
    label,
}: {
    locale: AppLocale;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    label?: string;
}) {
    const messages = frontendMessages[locale].pagination;
    if (totalPages <= 1) return null;
    const pages = Array.from(new Set([1, page - 1, page, page + 1, totalPages]))
        .filter((value) => value >= 1 && value <= totalPages)
        .sort((a, b) => a - b);

    return (
        <Pagination aria-label={label ?? messages.label}>
            <PaginationContent className="flex-wrap">
                <PaginationItem>
                    <PaginationPrevious
                        type="button"
                        aria-label={messages.previous}
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        {messages.previous}
                    </PaginationPrevious>
                </PaginationItem>
                {pages.map((value, index) => (
                    <PaginationItem key={value} className="flex items-center">
                        {index > 0 && value - pages[index - 1] > 1 && (
                            <PaginationEllipsis>
                                {messages.more}
                            </PaginationEllipsis>
                        )}
                        <PaginationLink
                            type="button"
                            aria-label={`${messages.page} ${value}`}
                            isActive={value === page}
                            onClick={() => onPageChange(value)}
                        >
                            {value}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        type="button"
                        aria-label={messages.next}
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                    >
                        {messages.next}
                    </PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
