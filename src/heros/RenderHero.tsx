import React from "react";

import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { HighImpactHero } from "@/heros/HighImpact";
import { LowImpactHero } from "@/heros/LowImpact";
import { MediumImpactHero } from "@/heros/MediumImpact";

const heroes = {
    highImpact: HighImpactHero,
    lowImpact: LowImpactHero,
    mediumImpact: MediumImpactHero,
};

export const RenderHero: React.FC<
    Page["hero"] & {
        locale?: AppLocale;
    }
> = (props) => {
    const { locale = defaultLocale, type } = props || {};

    if (!type || type === "none") return null;

    const HeroToRender = heroes[type];

    if (!HeroToRender) return null;

    return <HeroToRender {...props} locale={locale} />;
};
