import { createServerFeature } from "@payloadcms/richtext-lexical";

export const TextColorFeature = createServerFeature({
    key: "textColor",
    feature: {
        ClientFeature:
            "@/fields/TextColorFeature/client#TextColorFeatureClient",
    },
});
