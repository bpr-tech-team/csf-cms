import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import React from "react";

const defaultLabels = {
    plural: "Docs",
    singular: "Doc",
};

const defaultCollectionLabels = {
    posts: {
        plural: "Posts",
        singular: "Post",
    },
};

export const PageRange: React.FC<{
    className?: string;
    collection?: keyof typeof defaultCollectionLabels;
    collectionLabels?: {
        plural?: string;
        singular?: string;
    };
    currentPage?: number;
    limit?: number;
    locale?: AppLocale;
    totalDocs?: number;
}> = (props) => {
    const {
        className,
        collection,
        collectionLabels: collectionLabelsFromProps,
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

    const { plural, singular } =
        collectionLabelsFromProps ||
        (collection ? defaultCollectionLabels[collection] : undefined) ||
        defaultLabels ||
        {};

    return (
        <div className={[className, "font-semibold"].filter(Boolean).join(" ")}>
            {(typeof totalDocs === "undefined" || totalDocs === 0) &&
                messages.pageRangeEmpty}
            {typeof totalDocs !== "undefined" &&
                totalDocs > 0 &&
                `${messages.pageRangeShowing} ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ""} ${messages.pageRangeOf} ${totalDocs} ${
                    totalDocs > 1 ? plural : singular
                }`}
        </div>
    );
};
