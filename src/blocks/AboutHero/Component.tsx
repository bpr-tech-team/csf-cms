import type { AboutHeroBlock as AboutHeroBlockProps } from "@/payload-types";

import { ImmersiveHero } from "@/components/ImmersiveHero";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

export const AboutHeroBlock = ({
    locale = defaultLocale,
    ...props
}: AboutHeroBlockProps & {
    isPageIntro?: boolean;
    locale?: AppLocale;
}) => <ImmersiveHero {...props} locale={locale} />;
