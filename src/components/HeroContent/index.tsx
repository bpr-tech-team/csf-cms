import { Eyebrow } from "@/components/Eyebrow";
import { CMSLink } from "@/components/Link";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { HeroBlock } from "@/payload-types";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

type HeroContentProps = Pick<
    HeroBlock,
    "eyebrow" | "heading" | "description" | "links"
> & {
    isPageIntro?: boolean;
    locale?: AppLocale;
};

export const HeroContent = ({
    eyebrow,
    heading,
    description,
    links,
    isPageIntro = false,
    locale = defaultLocale,
}: HeroContentProps) => {
    const Heading = isPageIntro ? "h1" : "h2";

    return (
        <div className="max-w-[68rem]">
            {eyebrow ? (
                <Eyebrow className="mb-5" locale={locale} tone="inverse">
                    {eyebrow}
                </Eyebrow>
            ) : null}
            <Heading className="m-0 max-w-[62rem] text-4xl leading-[1.08] font-bold tracking-normal whitespace-pre-line min-[375px]:text-5xl sm:text-6xl md:text-7xl xl:text-display-xl">
                {applyTypography(heading, { locale })}
            </Heading>
            {description ? (
                <p className="mt-7 max-w-4xl text-body-md leading-8 font-normal text-paper-0 md:mt-9 md:text-body-lg">
                    {applyTypography(description, { locale })}
                </p>
            ) : null}
            {links?.length ? (
                <ul className="mt-8 flex flex-wrap items-stretch gap-3 md:mt-10">
                    {links.map(({ id, link }, index) => (
                        <li className="min-w-0 max-w-full" key={id ?? index}>
                            <CMSLink
                                {...link}
                                appearance={link.appearance ?? "default"}
                                className={cn(
                                    "h-auto min-h-13 max-w-full py-3 text-center whitespace-normal wrap-anywhere",
                                    link.appearance === "outline" &&
                                        "border-brand-500/60 text-paper-0 hover:border-brand-500 hover:bg-brand-100 hover:text-paper-0",
                                )}
                                locale={locale}
                                size="lg"
                            />
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};
