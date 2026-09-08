import type { ServiceSectionIntroBlock as ServiceSectionIntroBlockProps } from "@/payload-types";

import React from "react";

export const ServiceSectionIntroBlock = ({
    anchorId,
    description,
    heading,
}: ServiceSectionIntroBlockProps) => {
    return (
        <section
            className="scroll-mt-24 bg-paper-0 py-16 md:py-20"
            id={anchorId || undefined}
        >
            <div className="container">
                <h2 className="text-4xl leading-tight font-bold tracking-normal text-ink-950 md:text-heading-xl">
                    {heading}
                </h2>
                <p className="mt-5 max-w-5xl text-body-md leading-7 text-neutral-secondary md:text-body-lg">
                    {description}
                </p>
                <span
                    aria-hidden
                    className="mt-10 block h-px w-full bg-brand-500"
                />
            </div>
        </section>
    );
};
