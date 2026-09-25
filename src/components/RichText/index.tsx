import { defaultLocale, withLocalePrefix, type AppLocale } from "@/i18n/config";
import {
    DefaultNodeTypes,
    SerializedBlockNode,
    SerializedLinkNode,
    type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
    JSXConvertersFunction,
    LinkJSXConverter,
    RichText as ConvertRichText,
    TextJSXConverter,
} from "@payloadcms/richtext-lexical/react";

import { CodeBlock, CodeBlockProps } from "@/blocks/Code/Component";

import type { BannerBlock as BannerBlockProps, Page } from "@/payload-types";
import { BannerBlock } from "@/blocks/Banner/Component";
import { cn } from "@/utilities/ui";
import { applyRichTextTypography } from "@/utilities/richTextTypography";
import { getPagePath } from "@/utilities/getPagePath";
import { getTextColor } from "@/fields/TextColorFeature/colors";

type NodeTypes =
    DefaultNodeTypes | SerializedBlockNode<BannerBlockProps | CodeBlockProps>;

const internalDocToHref = (
    { linkNode }: { linkNode: SerializedLinkNode },
    locale: AppLocale,
) => {
    const { value, relationTo } = linkNode.fields.doc!;
    if (typeof value !== "object") {
        throw new Error("Expected value to be an object");
    }
    const slug = value.slug;
    return withLocalePrefix(
        relationTo === "posts"
            ? `/posts/${slug}`
            : getPagePath(
                  {
                      slug: slug as string,
                      pageType: value.pageType as Page["pageType"],
                  },
                  locale,
              ),
        locale,
    );
};

const jsxConverters =
    (locale: AppLocale): JSXConvertersFunction<NodeTypes> =>
    ({ defaultConverters }) => ({
        ...defaultConverters,
        text: (args) => {
            const converter = TextJSXConverter.text;
            const content =
                typeof converter === "function"
                    ? converter(args)
                    : args.node.text;
            const color = getTextColor(args.node.style);
            return color ? (
                <span className="richtext-color" style={{ color }}>
                    {content}
                </span>
            ) : (
                content
            );
        },
        ...LinkJSXConverter({
            internalDocToHref: (args) => internalDocToHref(args, locale),
        }),
        blocks: {
            banner: ({ node }) => (
                <BannerBlock
                    className="col-start-2 mb-4"
                    {...node.fields}
                    locale={locale}
                />
            ),
            code: ({ node }) => (
                <CodeBlock className="col-start-2" {...node.fields} />
            ),
        },
    });

type Props = {
    data: DefaultTypedEditorState;
    locale?: AppLocale;
    enableGutter?: boolean;
    enableProse?: boolean;
    typography?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
    const {
        className,
        enableProse = true,
        enableGutter = true,
        data,
        locale = defaultLocale,
        typography = true,
        ...rest
    } = props;
    return (
        <ConvertRichText
            converters={jsxConverters(locale)}
            className={cn(
                "payload-richtext",
                {
                    container: enableGutter,
                    "max-w-none": !enableGutter,
                    "mx-auto prose md:prose-md dark:prose-invert prose-headings:text-current prose-strong:text-current":
                        enableProse,
                },
                className,
            )}
            {...rest}
            data={
                !typography ? data : applyRichTextTypography(data, { locale })
            }
        />
    );
}
