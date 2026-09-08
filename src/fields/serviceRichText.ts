import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    OrderedListFeature,
    UnorderedListFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const serviceRichText = lexicalEditor({
    features: ({ rootFeatures }) => [
        ...rootFeatures,
        OrderedListFeature(),
        UnorderedListFeature(),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
    ],
});
