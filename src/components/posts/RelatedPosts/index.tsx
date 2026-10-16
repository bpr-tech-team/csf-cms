import React from "react";

import type { PostCardData } from "@/utilities/postCards";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { Card } from "@/components/Card";

export type RelatedPostsProps = {
    className?: string;
    docs: PostCardData[];
    locale?: AppLocale;
};

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
    const { className, docs, locale = defaultLocale } = props;

    return (
        <div className={className}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
                {docs.map((doc) => {
                    return <Card key={doc.id} doc={doc} locale={locale} />;
                })}
            </div>
        </div>
    );
};
