import type { ServiceHeroBlock as ServiceHeroBlockProps } from "@/payload-types";

import { ImmersiveHero } from "@/components/ImmersiveHero";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

export const ServiceHeroBlock = ({
    locale = defaultLocale,
    ...props
}: ServiceHeroBlockProps & {
    isPageIntro?: boolean;
    locale?: AppLocale;
}) => <ImmersiveHero {...props} locale={locale} />;
