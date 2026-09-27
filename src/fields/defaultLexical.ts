import type { TextFieldSingleValidation } from "payload";
import {
    BoldFeature,
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    ItalicFeature,
    LinkFeature,
    ParagraphFeature,
    OrderedListFeature,
    UnorderedListFeature,
    lexicalEditor,
    UnderlineFeature,
    type LinkFields,
} from "@payloadcms/richtext-lexical";
import { TextColorFeature } from "@/fields/TextColorFeature/server";
import { withCzechLabels } from "@/i18n/lexical";

export const defaultLexical = lexicalEditor({
    features: [
        ParagraphFeature(),
        HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        withCzechLabels(OrderedListFeature(), { label: "Číslovaný seznam" }),
        withCzechLabels(UnorderedListFeature(), { label: "Odrážkový seznam" }),
        TextColorFeature(),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        LinkFeature({
            enabledCollections: ["pages", "posts"],
            fields: ({ defaultFields }) => {
                const defaultFieldsWithoutUrl = defaultFields.filter(
                    (field) => {
                        if ("name" in field && field.name === "url")
                            return false;
                        return true;
                    },
                );

                return [
                    ...defaultFieldsWithoutUrl,
                    {
                        name: "url",
                        type: "text",
                        admin: {
                            condition: (_data, siblingData) =>
                                siblingData?.linkType !== "internal",
                        },
                        label: ({ t }) => t("fields:enterURL"),
                        required: true,
                        validate: ((value, options) => {
                            if (
                                (options?.siblingData as LinkFields)
                                    ?.linkType === "internal"
                            ) {
                                return true; // no validation needed, as no url should exist for internal links
                            }
                            return value
                                ? true
                                : options.req.t("validation:required");
                        }) as TextFieldSingleValidation,
                    },
                ];
            },
        }),
    ],
});
