import { defaultLocale, type AppLocale } from "@/i18n/config";
import { applyTypography } from "@/utilities/typography";
import type { ServiceSectionIntroBlock as ServiceSectionIntroBlockProps } from "@/payload-types";

import React from "react";
import { SectionDivider } from "@/components/SectionDivider";

export const ServiceSectionIntroBlock = ({
    locale = defaultLocale,
    anchorId,
    description,
    heading,
    divider,
}: ServiceSectionIntroBlockProps & { locale?: AppLocale }) => {
    return (
        <section
            className="scroll-mt-24 bg-paper-0 py-16 [container-type:inline-size] md:py-20"
            id={anchorId || undefined}
        >
            <div className="container">
                <h2 className="text-4xl leading-tight font-bold tracking-normal text-ink-950 md:text-heading-xl">
                    {applyTypography(heading, { locale })}
                </h2>
                <p className="mt-5 max-w-5xl text-body-md leading-7 text-neutral-secondary md:text-body-lg">
                    {applyTypography(description, { locale })}
                </p>
                {divider !== "none" ? (
                    <SectionDivider className="mt-10" />
                ) : null}
            </div>
        </section>
    );
};
