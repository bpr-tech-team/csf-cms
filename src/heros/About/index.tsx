import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import Image from "next/image";
import React from "react";

type AboutHeroProps = Page["hero"] & {
    locale?: AppLocale;
};

export const AboutHero: React.FC<AboutHeroProps> = ({
    links,
    locale = defaultLocale,
    richText,
}) => {
    return (
        <section
            className="relative -mt-42 min-h-120 overflow-hidden bg-ink-900 pt-58 pb-20 text-paper-0 md:pt-72 md:pb-24"
            data-theme="dark"
        >
            <Image
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full object-cover"
                fill
                priority
                sizes="100vw"
                src="/media/about/hero-gradient.svg"
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgb(175_203_8/0.13),transparent_70%)]"
            />

            <div className="container relative z-10">
                {richText && (
                    <RichText
                        className="[&_h1]:m-0 [&_h1]:text-5xl [&_h1]:leading-[1.08] [&_h1]:font-bold [&_h1]:tracking-[-0.04em] md:[&_h1]:text-display-xl [&_p]:mt-5 [&_p]:max-w-4xl [&_p]:text-body-md [&_p]:leading-7 [&_p]:font-normal [&_p]:text-paper-0 md:[&_p]:mt-16 md:[&_p]:text-body-lg md:[&_p]:leading-8"
                        data={richText}
                        enableGutter={false}
                        enableProse={false}
                    />
                )}

                {Array.isArray(links) && links.length > 0 && (
                    <ul className="mt-10 flex flex-col items-start gap-3 sm:flex-row md:mt-12">
                        {links.map(({ link }, index) => (
                            <li key={index}>
                                <CMSLink {...link} locale={locale} size="lg" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};
