import React from "react";

import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { HighImpactHero } from "@/heros/HighImpact";
import { HomepageHero } from "@/heros/Homepage";
import { LowImpactHero } from "@/heros/LowImpact";
import { MediumImpactHero } from "@/heros/MediumImpact";
import { AboutHero } from "@/heros/About";

const heroes = {
    about: AboutHero,
    highImpact: HighImpactHero,
    homepage: HomepageHero,
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
