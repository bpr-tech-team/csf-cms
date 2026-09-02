import React, { Fragment } from "react";

import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { CenteredCTABlock } from "@/blocks/CenteredCTA/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { LogoMarqueeBlock } from "@/blocks/LogoMarquee/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { MetricsStripBlock } from "@/blocks/MetricsStrip/Component";
import { ProcessStepsBlock } from "@/blocks/ProcessSteps/Component";
import { ProductsGridBlock } from "@/blocks/ProductsGrid/Component";
import { ServicesGridBlock } from "@/blocks/ServicesGrid/Component";

export const RenderBlocks: React.FC<{
    blocks: Page["layout"][0][];
    locale?: AppLocale;
}> = (props) => {
    const { blocks, locale = defaultLocale } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block;

                    switch (blockType) {
                        case "archive":
                            return (
                                <div className="my-16" key={index}>
                                    <ArchiveBlock {...block} locale={locale} />
                                </div>
                            );

                        case "content":
                            return (
                                <div className="my-16" key={index}>
                                    <ContentBlock {...block} locale={locale} />
                                </div>
                            );

                        case "cta":
                            return (
                                <div className="my-16" key={index}>
                                    <CallToActionBlock
                                        {...block}
                                        locale={locale}
                                    />
                                </div>
                            );

                        case "formBlock":
                            if (
                                typeof block.form !== "object" ||
                                block.form === null
                            ) {
                                return null;
                            }

                            return (
                                <FormBlock
                                    {...block}
                                    form={block.form}
                                    key={index}
                                />
                            );

                        case "mediaBlock":
                            return (
                                <div className="my-16" key={index}>
                                    <MediaBlock {...block} />
                                </div>
                            );

                        case "servicesGrid":
                            return (
                                <ServicesGridBlock
                                    {...block}
                                    key={index}
                                    locale={locale}
                                />
                            );

                        case "metricsStrip":
                            return <MetricsStripBlock {...block} key={index} />;

                        case "productsGrid":
                            return (
                                <ProductsGridBlock
                                    {...block}
                                    key={index}
                                    locale={locale}
                                />
                            );

                        case "logoMarquee":
                            return <LogoMarqueeBlock {...block} key={index} />;

                        case "centeredCta":
                            return (
                                <CenteredCTABlock
                                    {...block}
                                    key={index}
                                    locale={locale}
                                />
                            );

                        case "processSteps":
                            return <ProcessStepsBlock {...block} key={index} />;

                        default:
                            return null;
                    }
                })}
            </Fragment>
        );
    }

    return null;
};
