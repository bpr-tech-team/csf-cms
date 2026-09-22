import React, { Fragment } from "react";

import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { BranchesGridBlock } from "@/blocks/BranchesGrid/Component";
import { BranchDetailsBlock } from "@/blocks/BranchDetails/Component";
import { HeroBlock } from "@/blocks/Hero/Component";
import { HomepageHero } from "@/blocks/HomepageHero/Component";
import { CenteredCTABlock } from "@/blocks/CenteredCTA/Component";
import { CompanyTimelineBlock } from "@/blocks/CompanyTimeline/Component";
import { ComputerAudienceBlock } from "@/blocks/ComputerAudience/Component";
import { ComputerProductCatalogBlock } from "@/blocks/ComputerProductCatalog/Component";
import { EditorialColumnsBlock } from "@/blocks/EditorialColumns/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { LogoMarqueeBlock } from "@/blocks/LogoMarquee/Component";
import { MediaFeatureGridBlock } from "@/blocks/MediaFeatureGrid/Component";
import { MetricsStripBlock } from "@/blocks/MetricsStrip/Component";
import { ProcessStepsBlock } from "@/blocks/ProcessSteps/Component";
import { ProductsGridBlock } from "@/blocks/ProductsGrid/Component";
import { ServicesGridBlock } from "@/blocks/ServicesGrid/Component";
import { FeatureRowsBlock } from "@/blocks/FeatureRows/Component";
import { ServiceSectionIntroBlock } from "@/blocks/ServiceSectionIntro/Component";
import { SplitContentBlock } from "@/blocks/SplitContent/Component";
import { TechnologySpotlightBlock } from "@/blocks/TechnologySpotlight/Component";

export const RenderBlocks: React.FC<{
    blocks: Page["layout"][0][];
    locale?: AppLocale;
    isFirstSection?: boolean;
    page?: Page;
    draft?: boolean;
}> = (props) => {
    const {
        blocks,
        locale = defaultLocale,
        isFirstSection = false,
        page,
        draft = false,
    } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block;

                    switch (blockType) {
                        case "hero":
                            return (
                                <HeroBlock
                                    {...block}
                                    key={block.id ?? index}
                                    locale={locale}
                                    isPageIntro={isFirstSection && index === 0}
                                />
                            );
                        case "branchesGrid":
                            return (
                                <BranchesGridBlock
                                    {...block}
                                    key={block.id ?? index}
                                    locale={locale}
                                    draft={draft}
                                />
                            );
                        case "branchDetails":
                            return (
                                <BranchDetailsBlock
                                    {...block}
                                    key={block.id ?? index}
                                    locale={locale}
                                    page={page}
                                />
                            );
                        case "homepageHero":
                            return (
                                <HomepageHero
                                    {...block}
                                    key={block.id ?? index}
                                    locale={locale}
                                    isPageIntro={isFirstSection && index === 0}
                                />
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
                                    locale={locale}
                                    {...block}
                                    form={block.form}
                                    key={index}
                                />
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
                            return (
                                <MetricsStripBlock
                                    locale={locale}
                                    {...block}
                                    key={index}
                                />
                            );

                        case "productsGrid":
                            return (
                                <ProductsGridBlock
                                    {...block}
                                    key={index}
                                    locale={locale}
                                />
                            );

                        case "logoMarquee":
                            return (
                                <LogoMarqueeBlock
                                    locale={locale}
                                    {...block}
                                    key={index}
                                />
                            );

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
                                <CompanyTimelineBlock
                                    locale={locale}
                                    {...block}
                                    key={index}
                                />
                            );

                        case "processSteps":
                            return (
                                <ProcessStepsBlock
                                    locale={locale}
                                    {...block}
                                    key={index}
                                />
                            );

                        case "serviceSectionIntro":
                            return (
                                <ServiceSectionIntroBlock
                                    locale={locale}
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "splitContent":
                            return (
                                <SplitContentBlock
                                    locale={locale}
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "featureRows":
                            return (
                                <FeatureRowsBlock
                                    locale={locale}
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "computerAudience":
                            return (
                                <ComputerAudienceBlock
                                    locale={locale}
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "computerProductCatalog":
                            return (
                                <ComputerProductCatalogBlock
                                    locale={locale}
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "mediaFeatureGrid":
                            return (
                                <MediaFeatureGridBlock
                                    locale={locale}
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "technologySpotlight":
                            return (
                                <TechnologySpotlightBlock
                                    locale={locale}
                                    {...block}
                                    key={block.id ?? index}
                                />
                            );

                        case "editorialColumns":
                            return (
                                <EditorialColumnsBlock
                                    locale={locale}
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
