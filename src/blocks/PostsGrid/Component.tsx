import { BlockSection } from "@/components/BlockSection";
import { SectionHeading } from "@/components/SectionHeading";
import type { AppLocale } from "@/i18n/config";
import type { PostsGridBlock as PostsGridProps } from "@/payload-types";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { getInitialPostCards } from "@/utilities/getPostCards";
import { isPostPageSize, type PostCardsResult } from "@/utilities/postsGrid";
import { PostsGridClient } from "./Component.client";

export async function PostsGridBlock({
    anchorId,
    heading,
    pageSize,
    theme: themeFromProps,
    sectionSpacing,
    spacingTop,
    spacingBottom,
    locale,
    blockId,
}: PostsGridProps &
    BlockSpacingProps & { locale: AppLocale; blockId: string }) {
    const size = Number(pageSize ?? 12);
    const limit = isPostPageSize(size) ? size : 12;
    const theme = themeFromProps === "dark" ? "dark" : "light";
    let initialData: PostCardsResult | null = null;
    try {
        initialData = await getInitialPostCards(locale, limit);
    } catch (error) {
        console.error("Could not load initial post cards", error);
    }

    return (
        <BlockSection
            blockType="postsGrid"
            theme={theme}
            data-theme={theme}
            style={{ colorScheme: theme }}
            className="text-foreground"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
            id={anchorId || undefined}
        >
            <div className="container">
                {heading?.trim() && (
                    <SectionHeading
                        className="mb-10"
                        heading={heading}
                        locale={locale}
                        tone={theme === "dark" ? "inverse" : "default"}
                    />
                )}
                <PostsGridClient
                    key={`${blockId}:${locale}:${limit}`}
                    blockId={blockId}
                    locale={locale}
                    limit={limit}
                    theme={theme}
                    initialData={initialData}
                />
            </div>
        </BlockSection>
    );
}
