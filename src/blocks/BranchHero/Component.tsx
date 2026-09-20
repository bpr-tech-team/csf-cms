import type { BranchHeroBlock as Props } from "@/payload-types";
import { HeroBackground } from "@/components/HeroBackground";
import { CMSLink } from "@/components/Link";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

export const BranchHeroBlock = ({
    heading,
    description,
    backgroundMedia,
    links,
    isPageIntro = false,
    locale = defaultLocale,
}: Props & { isPageIntro?: boolean; locale?: AppLocale }) => {
    const Heading = isPageIntro ? "h1" : "h2";

    return (
        <section
            className={cn(
                "relative isolate min-h-120 overflow-hidden bg-ink-900 py-20 text-paper-0 md:py-24",
                isPageIntro && "-mt-42 pt-58 md:pt-72",
            )}
            data-theme="dark"
        >
            <HeroBackground
                resource={backgroundMedia}
                isPageIntro={isPageIntro}
            />
            <div className="container relative z-10">
                <Heading className="m-0 text-5xl leading-[1.08] font-bold tracking-normal whitespace-pre-line md:text-display-xl">
                    {applyTypography(heading, { locale })}
                </Heading>
                <p className="mt-5 max-w-4xl text-body-md leading-7 md:mt-16 md:text-body-lg md:leading-8">
                    {applyTypography(description, { locale })}
                </p>
                {links?.length ? (
                    <ul className="mt-10 flex flex-col items-start gap-3 sm:flex-row md:mt-12">
                        {links.map(({ id, link }, index) => (
                            <li key={id ?? index}>
                                <CMSLink
                                    {...link}
                                    locale={locale}
                                    size="lg"
                                    className={cn(
                                        link.appearance === "outline" &&
                                            "border-brand-500/60 text-paper-0 hover:border-brand-500",
                                    )}
                                />
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </section>
    );
};
