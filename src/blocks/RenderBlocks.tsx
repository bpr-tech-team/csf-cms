import React, { Fragment } from "react";

import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { AboutHeroBlock } from "@/blocks/AboutHero/Component";
import { HomepageHero } from "@/blocks/HomepageHero/Component";
import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { CenteredCTABlock } from "@/blocks/CenteredCTA/Component";
import { CompanyTimelineBlock } from "@/blocks/CompanyTimeline/Component";
import { ComputerAudienceBlock } from "@/blocks/ComputerAudience/Component";
import { ComputerHeroBlock } from "@/blocks/ComputerHero/Component";
import { ComputerProductCatalogBlock } from "@/blocks/ComputerProductCatalog/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { EditorialColumnsBlock } from "@/blocks/EditorialColumns/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { LogoMarqueeBlock } from "@/blocks/LogoMarquee/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { MediaFeatureGridBlock } from "@/blocks/MediaFeatureGrid/Component";
import { MetricsStripBlock } from "@/blocks/MetricsStrip/Component";
import { ProcessStepsBlock } from "@/blocks/ProcessSteps/Component";
import { ProductsGridBlock } from "@/blocks/ProductsGrid/Component";
import { ServicesGridBlock } from "@/blocks/ServicesGrid/Component";
import { FeatureRowsBlock } from "@/blocks/FeatureRows/Component";
import { ServiceHeroBlock } from "@/blocks/ServiceHero/Component";
import { ServiceSectionIntroBlock } from "@/blocks/ServiceSectionIntro/Component";
import { SplitContentBlock } from "@/blocks/SplitContent/Component";
import { TechnologySpotlightBlock } from "@/blocks/TechnologySpotlight/Component";

export const RenderBlocks: React.FC<{
    blocks: Page["layout"][0][];
    locale?: AppLocale;
    isFirstSection?: boolean;
}> = (props) => {
    const { blocks, locale = defaultLocale, isFirstSection = false } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block;

                    switch (blockType) {
                        case "homepageHero":
                            return (
                                <HomepageHero
                                    {...block}
                                    key={block.id ?? index}
                                    locale={locale}
                                    isPageIntro={isFirstSection && index === 0}
                                />
                            );
                        case "aboutHero":
                            return (
                                <AboutHeroBlock
                                    {...block}
                                    isPageIntro={isFirstSection && index === 0}
                                    key={block.id ?? index}
                                    locale={locale}
                                />
                            );
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

                        case "companyTimeline":
                            return (
                                <CompanyTimelineBlock {...block} key={index} />
                            );

                        case "processSteps":
                            return <ProcessStepsBlock {...block} key={index} />;

                        case "serviceHero":
                            return (
                                <ServiceHeroBlock
                                    {...block}
                                    isPageIntro={isFirstSection && index === 0}
                                    key={block.id ?? index}
                                    locale={locale}
                                />
                            );

                        case "serviceSectionIntro":
                            return (
                                <ServiceSectionIntroBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "splitContent":
                            return (
                                <SplitContentBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "featureRows":
                            return (
                                <FeatureRowsBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "computerHero":
                            return (
                                <ComputerHeroBlock
                                    {...block}
                                    isPageIntro={isFirstSection && index === 0}
                                    key={block.id ?? index}
                                    locale={locale}
                                />
                            );

                        case "computerAudience":
                            return (
                                <ComputerAudienceBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "computerProductCatalog":
                            return (
                                <ComputerProductCatalogBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "mediaFeatureGrid":
                            return (
                                <MediaFeatureGridBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "technologySpotlight":
                            return (
                                <TechnologySpotlightBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "editorialColumns":
                            return (
                                <EditorialColumnsBlock
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        default:
                            return null;
                    }
                })}
            </Fragment>
        );
    }

    return null;
};
