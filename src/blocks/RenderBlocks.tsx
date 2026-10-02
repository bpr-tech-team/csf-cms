import {
    hasPopulatedForm,
    isVisiblePageBlock,
    resolveBlockSpacing,
} from "@/utilities/blockSpacing";
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
import { ComputerCatalogBlock } from "@/blocks/ComputerCatalog/Component";
import { ComputerProductCatalogBlock } from "@/blocks/ComputerProductCatalog/Component";
import { EditorialColumnsBlock } from "@/blocks/EditorialColumns/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { ClientServiceBlock } from "@/blocks/ClientService/Component";
import { LogoMarqueeBlock } from "@/blocks/LogoMarquee/Component";
import { MediaFeatureGridBlock } from "@/blocks/MediaFeatureGrid/Component";
import { MetricsStripBlock } from "@/blocks/MetricsStrip/Component";
import { ProcessStepsBlock } from "@/blocks/ProcessSteps/Component";
import { ProductsGridBlock } from "@/blocks/ProductsGrid/Component";
import { ServicesGridBlock } from "@/blocks/ServicesGrid/Component";
import { FlexibleContentBlock } from "@/blocks/FlexibleContent/Component";
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

    const visibleBlocks = Array.isArray(blocks)
        ? blocks.filter((block) => isVisiblePageBlock(block, page))
        : [];
    const hasBlocks = visibleBlocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {visibleBlocks.map((block, index) => {
                    const { blockType } = block;
                    const sectionSpacing = resolveBlockSpacing(
                        block,
                        visibleBlocks[index - 1],
                        visibleBlocks[index + 1],
                    );

                    switch (blockType) {
                        case "clientService":
                            return (
                                <ClientServiceBlock
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                    locale={locale}
                                />
                            );
                        case "hero":
                            return (
                                <HeroBlock
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                    locale={locale}
                                    isPageIntro={isFirstSection && index === 0}
                                />
                            );
                        case "branchesGrid":
                            return (
                                <BranchesGridBlock
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                    locale={locale}
                                    draft={draft}
                                />
                            );
                        case "branchDetails":
                            return (
                                <BranchDetailsBlock
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                    locale={locale}
                                    page={page}
                                />
                            );
                        case "homepageHero":
                            return (
                                <HomepageHero
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                    locale={locale}
                                    isPageIntro={isFirstSection && index === 0}
                                />
                            );
                        case "formBlock":
                            if (!hasPopulatedForm(block.form)) {
                                return null;
                            }

                            return (
                                <FormBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    form={block.form}
                                    key={index}
                                />
                            );

                        case "servicesGrid":
                            return (
                                <ServicesGridBlock
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={index}
                                    locale={locale}
                                />
                            );

                        case "metricsStrip":
                            return (
                                <MetricsStripBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={index}
                                />
                            );

                        case "productsGrid":
                            return (
                                <ProductsGridBlock
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={index}
                                    locale={locale}
                                />
                            );

                        case "logoMarquee":
                            return (
                                <LogoMarqueeBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={index}
                                />
                            );

                        case "centeredCta":
                            return (
                                <CenteredCTABlock
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={index}
                                    locale={locale}
                                />
                            );

                        case "companyTimeline":
                            return (
                                <CompanyTimelineBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={index}
                                />
                            );

                        case "processSteps":
                            return (
                                <ProcessStepsBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={index}
                                />
                            );

                        case "serviceSectionIntro":
                            return (
                                <ServiceSectionIntroBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "splitContent":
                            return (
                                <SplitContentBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "flexibleContent":
                            return (
                                <FlexibleContentBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "computerAudience":
                            return (
                                <ComputerAudienceBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "computerCatalog":
                            return (
                                <ComputerCatalogBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "computerProductCatalog":
                            return (
                                <ComputerProductCatalogBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "mediaFeatureGrid":
                            return (
                                <MediaFeatureGridBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "technologySpotlight":
                            return (
                                <TechnologySpotlightBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
                                    key={block.id ?? index}
                                />
                            );

                        case "editorialColumns":
                            return (
                                <EditorialColumnsBlock
                                    locale={locale}
                                    {...block}
                                    sectionSpacing={sectionSpacing}
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
