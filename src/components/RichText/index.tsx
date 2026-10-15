import { defaultLocale, withLocalePrefix, type AppLocale } from "@/i18n/config";
import {
    DefaultNodeTypes,
    SerializedLinkNode,
    type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
    JSXConvertersFunction,
    LinkJSXConverter,
    RichText as ConvertRichText,
    TextJSXConverter,
} from "@payloadcms/richtext-lexical/react";

import type { Page } from "@/payload-types";
import { cn } from "@/utilities/ui";
import { applyRichTextTypography } from "@/utilities/richTextTypography";
import { getPagePath } from "@/utilities/getPagePath";
import { getTextColor } from "@/fields/TextColorFeature/colors";
import { contentListLabels as formatContentListLabels } from "@/utilities/contentListLabels";

const internalDocToHref = (
    { linkNode }: { linkNode: SerializedLinkNode },
    locale: AppLocale,
) => {
    const { value, relationTo } = linkNode.fields.doc!;
    if (relationTo !== "pages" || !value || typeof value !== "object")
        return "#";
    const slug = value.slug;
    return withLocalePrefix(
        getPagePath(
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
    (locale: AppLocale): JSXConvertersFunction<DefaultNodeTypes> =>
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
    });

type Props = {
    data: DefaultTypedEditorState;
    locale?: AppLocale;
    enableGutter?: boolean;
    enableProse?: boolean;
    typography?: boolean;
    contentListLabels?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
    const {
        className,
        enableProse = true,
        enableGutter = true,
        data,
        locale = defaultLocale,
        typography = true,
        contentListLabels = false,
        ...rest
    } = props;
    const formattedData = contentListLabels
        ? formatContentListLabels(data)
        : data;
    return (
        <div
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
        >
            <ConvertRichText
                disableContainer
                converters={jsxConverters(locale)}
                data={
                    !typography
                        ? formattedData
                        : applyRichTextTypography(formattedData, { locale })
                }
            />
        </div>
    );
}
