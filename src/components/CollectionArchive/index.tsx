import { cn } from "@/utilities/ui";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import React from "react";

import { Card, CardPostData } from "@/components/Card";

export type Props = {
    locale?: AppLocale;
    posts: CardPostData[];
    theme?: "light" | "dark";
};

export const CollectionArchive: React.FC<Props> = (props) => {
    const { locale = defaultLocale, posts } = props;

    return (
        <div className={cn("container")}>
            <PostCardGrid locale={locale} posts={posts} theme={props.theme} />
        </div>
    );
};

export function PostCardGrid({
    posts,
    locale = defaultLocale,
    theme = "light",
}: Props) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((doc) => (
                <Card
                    key={doc.id}
                    className="h-full"
                    doc={doc}
                    locale={locale}
                    theme={theme}
                />
            ))}
        </div>
    );
}
