import type { ContactHeroBlock as Props } from "@/payload-types";
import { HeroBackground } from "@/components/HeroBackground";
import { CMSLink } from "@/components/Link";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { phoneHref } from "@/utilities/branchData";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

export const ContactHeroBlock = ({
    heading,
    description,
    backgroundMedia,
    phone,
    callLabel,
    formLabel,
    isPageIntro = false,
    locale = defaultLocale,
}: Props & { isPageIntro?: boolean; locale?: AppLocale }) => {
    const Heading = isPageIntro ? "h1" : "h2";

    return (
        <section
            className={cn(
                "relative isolate min-h-120 overflow-hidden bg-ink-900 py-20 text-paper-0 [--hero-image-opacity:0.15] md:py-24",
                isPageIntro && "-mt-42 pt-58 md:pt-72",
            )}
            data-theme="dark"
        >
            <HeroBackground
                resource={backgroundMedia}
                isPageIntro={isPageIntro}
            />
            <div className="container relative z-10">
                <Heading className="m-0 max-w-6xl text-5xl leading-[1.08] font-bold tracking-normal whitespace-pre-line md:text-display-xl">
                    {applyTypography(heading, { locale })}
                </Heading>
                <p className="mt-5 max-w-4xl text-body-md leading-7 md:mt-12 md:text-body-lg md:leading-8">
                    {applyTypography(description, { locale })}
                </p>
                <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row md:mt-12">
                    <CMSLink
                        type="custom"
                        url={phoneHref(phone)}
                        appearance="default"
                        size="lg"
                        className="min-w-48"
                        label={
                            callLabel || (locale === "cs" ? "Volat" : "Call us")
                        }
                        locale={locale}
                    />
                    <CMSLink
                        type="custom"
                        url="#kontakt"
                        appearance="outline"
                        size="lg"
                        className="min-w-48 border-brand-500/60 text-paper-0 hover:border-brand-500"
                        label={
                            formLabel ||
                            (locale === "cs" ? "Napsat" : "Write to us")
                        }
                        locale={locale}
                    />
                </div>
            </div>
        </section>
    );
};
