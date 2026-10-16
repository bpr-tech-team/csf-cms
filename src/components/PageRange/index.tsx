import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import React from "react";
import { applyTypography } from "@/utilities/typography";

export const PageRange: React.FC<{
    className?: string;
    currentPage?: number;
    limit?: number;
    locale?: AppLocale;
    totalDocs?: number;
}> = (props) => {
    const {
        className,
        currentPage,
        limit,
        locale = defaultLocale,
        totalDocs,
    } = props;
    const messages = frontendMessages[locale];

    let indexStart = (currentPage ? currentPage - 1 : 0) * (limit || 1) + 1;
    if (totalDocs && indexStart > totalDocs) indexStart = 0;

    let indexEnd = (currentPage || 1) * (limit || 1);
    if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs;

    return (
        <div className={[className, "font-semibold"].filter(Boolean).join(" ")}>
            {(typeof totalDocs === "undefined" || totalDocs === 0) &&
                applyTypography(messages.pageRangeEmpty, { locale })}
            {typeof totalDocs !== "undefined" &&
                totalDocs > 0 &&
                applyTypography(
                    `${messages.pageRangeShowing} ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ""} ${messages.pageRangeOf} ${totalDocs}`,
                    { locale },
                )}
        </div>
    );
};
