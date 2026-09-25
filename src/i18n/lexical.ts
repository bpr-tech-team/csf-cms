import type {
    FeatureProviderServer,
    ServerFeature,
} from "@payloadcms/richtext-lexical";
import { deepMergeSimple } from "payload";

type CzechTranslations = NonNullable<
    ServerFeature<unknown, unknown>["i18n"]
>["cs"];

// Lexical registers its feature dictionaries after the global i18n overrides.
// Supply Czech wording through the feature's public i18n configuration instead.
export function withCzechLabels<Props, ServerProps, ClientProps>(
    provider: FeatureProviderServer<Props, ServerProps, ClientProps>,
    cs: CzechTranslations,
): FeatureProviderServer<Props, ServerProps, ClientProps> {
    return {
        ...provider,
        feature: async (args) => {
            const feature =
                typeof provider.feature === "function"
                    ? await provider.feature(args)
                    : provider.feature;

            return {
                ...feature,
                i18n: deepMergeSimple(feature.i18n ?? {}, { cs }),
            };
        },
    };
}
