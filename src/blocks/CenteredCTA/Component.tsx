import type { CenteredCtaBlock as CenteredCtaBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/Homepage/MediaAsset";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import React from "react";

export const CenteredCTABlock = ({
    backgroundMedia,
    heading,
    link,
    locale = defaultLocale,
}: CenteredCtaBlockProps & { locale?: AppLocale }) => {
    return (
        <section
            className="relative overflow-hidden border-b border-border-dark bg-ink-950 py-24 text-center text-paper-0 md:py-28"
            data-theme="dark"
        >
            {backgroundMedia && (
                <MediaAsset
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-20"
                    fill
                    resource={backgroundMedia}
                    sizes="100vw"
                />
            )}
            <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgb(175_203_8/0.09),transparent_32%)]"
            />
            <div className="container relative z-10">
                <h2 className="mx-auto max-w-[60rem] text-[2.25rem] leading-tight font-bold tracking-[-0.03em] text-balance md:text-heading-xl">
                    {heading}
                </h2>
                {link && (
                    <CMSLink
                        {...link}
                        appearance="default"
                        className="mt-12"
                        locale={locale}
                        size="lg"
                    />
                )}
            </div>
        </section>
    );
};
