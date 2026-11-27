import { FileDown } from "lucide-react";

import { BlockSection } from "@/components/BlockSection";
import { SectionHeading } from "@/components/SectionHeading";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { PdfDownloadsBlock as Props } from "@/payload-types";
import type { BlockSpacingProps } from "@/utilities/blockSpacing";
import { applyTypography } from "@/utilities/typography";

import { getPdfDownloadUrl } from "./downloadUrl";

export const PdfDownloadsBlock = ({
    heading,
    documents,
    sectionSpacing,
    spacingTop,
    spacingBottom,
    locale = defaultLocale,
}: Props & BlockSpacingProps & { locale?: AppLocale }) => (
    <BlockSection
        blockType="pdfDownloads"
        spacing={sectionSpacing ?? { top: spacingTop, bottom: spacingBottom }}
        className="text-ink-950"
    >
        <div className="container">
            <SectionHeading
                align="center"
                heading={heading}
                locale={locale}
                size="compact"
            />
            <ul className="mx-auto mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 md:mt-5 md:gap-x-10">
                {documents.map(({ id, file, label }, index) => {
                    const href = getPdfDownloadUrl(file);
                    if (!href) return null;

                    return (
                        <li key={id ?? index} className="min-w-0 max-w-full">
                            <a
                                className="flex max-w-64 flex-col items-center gap-2 rounded-sm px-3 py-2 text-center text-body-md font-medium wrap-anywhere hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                                download
                                href={href}
                            >
                                <FileDown
                                    aria-hidden
                                    className="size-8 text-brand-600"
                                />
                                <span>
                                    {applyTypography(label, { locale })}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    </BlockSection>
);
