import { BlockSection } from "@/components/BlockSection";
import { SectionHeading } from "@/components/SectionHeading";
import { RelatedPosts } from "@/components/posts/RelatedPosts";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { RelatedPostsBlock as RelatedPostsProps } from "@/payload-types";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import type { PostCardData } from "@/utilities/postCards";

export const RelatedPostsBlock = ({
    heading,
    spacingTop,
    spacingBottom,
    sectionSpacing,
    docs,
    locale = defaultLocale,
}: RelatedPostsProps &
    BlockSpacingProps & { docs: PostCardData[]; locale?: AppLocale }) => {
    if (!docs.length) return null;

    return (
        <BlockSection
            blockType="relatedPosts"
            spacing={
                sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }
            }
        >
            <div className="container">
                <SectionHeading
                    className="mb-10"
                    heading={
                        heading?.trim() ||
                        (locale === "cs"
                            ? "Související články"
                            : "Related posts")
                    }
                    locale={locale}
                />
                <RelatedPosts docs={docs} locale={locale} />
            </div>
        </BlockSection>
    );
};
