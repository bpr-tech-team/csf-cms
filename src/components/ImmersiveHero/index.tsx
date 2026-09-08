import type { ServiceHeroBlock } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { CMSLink } from "@/components/Link";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { cn } from "@/utilities/ui";
import React from "react";

type ImmersiveHeroProps = Pick<
    ServiceHeroBlock,
    "backgroundMedia" | "description" | "heading" | "links"
> & {
    isPageIntro?: boolean;
    locale?: AppLocale;
};

export const ImmersiveHero = ({
    backgroundMedia,
    description,
    heading,
    isPageIntro = false,
    links,
    locale = defaultLocale,
}: ImmersiveHeroProps) => {
    const Heading = isPageIntro ? "h1" : "h2";

    return (
        <section
            className={cn(
                "relative min-h-120 overflow-hidden bg-ink-900 py-20 text-paper-0 md:py-24",
                isPageIntro && "-mt-42 pt-58 md:pt-72",
            )}
            data-theme="dark"
        >
            <MediaAsset
                alt=""
                className="pointer-events-none absolute inset-0 size-full object-cover object-center opacity-45"
                fill
                priority={isPageIntro}
                resource={backgroundMedia}
                sizes="100vw"
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgb(175_203_8/0.13),transparent_70%)]"
            />

            <div className="container relative z-10">
                <Heading className="m-0 text-5xl leading-[1.08] font-bold tracking-normal md:text-display-xl">
                    {heading}
                </Heading>
                <p className="mt-5 max-w-4xl text-body-md leading-7 font-normal text-paper-0 md:mt-16 md:text-body-lg md:leading-8">
                    {description}
                </p>

                {Array.isArray(links) && links.length > 0 ? (
                    <ul className="mt-10 flex flex-col items-start gap-3 sm:flex-row md:mt-12">
                        {links.map(({ id, link }, index) => (
                            <li key={id ?? index}>
                                <CMSLink {...link} locale={locale} size="lg" />
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </section>
    );
};
