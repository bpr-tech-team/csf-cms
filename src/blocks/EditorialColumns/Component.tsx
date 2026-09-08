import type { EditorialColumnsBlock as EditorialColumnsBlockProps } from "@/payload-types";

import { HighlightedText } from "@/components/Homepage/SectionHeading";
import RichText from "@/components/RichText";
import React from "react";

export const EditorialColumnsBlock = ({
    anchorId,
    columns,
    heading,
    highlightedTexts,
}: EditorialColumnsBlockProps) => {
    return (
        <section
            className="scroll-mt-24 bg-ink-950 py-20 text-paper-0 md:py-24 xl:py-28"
            data-theme="dark"
            id={anchorId || undefined}
        >
            <div className="container">
                <h2 className="max-w-4xl text-4xl leading-tight font-bold tracking-normal whitespace-pre-line md:text-heading-xl">
                    <HighlightedText
                        highlightedTexts={highlightedTexts}
                        text={heading}
                    />
                </h2>

                <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
                    {columns.map((column, index) => (
                        <RichText
                            className="text-body-md leading-7 text-paper-0/75 [&_a]:text-paper-0 [&_li]:my-2 [&_p]:my-0 [&_ul]:my-0"
                            data={column.richText}
                            enableGutter={false}
                            key={column.id ?? index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
