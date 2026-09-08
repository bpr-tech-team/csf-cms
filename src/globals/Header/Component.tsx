import { HeaderClient } from "./Component.client";
import { getCachedGlobal } from "@/utilities/getGlobals";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import React from "react";

export async function Header({
    locale = defaultLocale,
}: {
    locale?: AppLocale;
}) {
    const headerData = await getCachedGlobal("header", 1, locale)();

    return <HeaderClient data={headerData} locale={locale} />;
}
