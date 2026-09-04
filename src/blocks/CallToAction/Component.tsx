import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";

export const CallToActionBlock: React.FC<
    CTABlockProps & {
        locale?: AppLocale;
    }
> = ({ locale = defaultLocale, links, richText }) => {
    return (
        <div className="container">
            <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
                <div className="flex max-w-3xl items-center">
                    {richText && (
                        <RichText
                            className="mb-0"
                            data={richText}
                            enableGutter={false}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-8">
                    {(links || []).map(({ link }, i) => {
                        return (
                            <CMSLink
                                key={i}
                                size="lg"
                                {...link}
                                locale={locale}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
