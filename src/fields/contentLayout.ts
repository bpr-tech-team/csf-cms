import type { Block, BlocksField } from "payload";

import { BranchesGrid } from "@/blocks/BranchesGrid/config";
import { BranchDetails } from "@/blocks/BranchDetails/config";
import { CenteredCTA } from "@/blocks/CenteredCTA/config";
import { CompanyTimeline } from "@/blocks/CompanyTimeline/config";
import { ComputerAudience } from "@/blocks/ComputerAudience/config";
import { ComputerCatalog } from "@/blocks/ComputerCatalog/config";
import { ComputerProductCatalog } from "@/blocks/ComputerProductCatalog/config";
import { EditorialColumns } from "@/blocks/EditorialColumns/config";
import { FormBlock } from "@/blocks/Form/config";
import { ClientService } from "@/blocks/ClientService/config";
import { LogoMarquee } from "@/blocks/LogoMarquee/config";
import { MediaFeatureGrid } from "@/blocks/MediaFeatureGrid/config";
import { MetricsStrip } from "@/blocks/MetricsStrip/config";
import { ProcessSteps } from "@/blocks/ProcessSteps/config";
import { ProductsGrid } from "@/blocks/ProductsGrid/config";
import { ServicesGrid } from "@/blocks/ServicesGrid/config";
import { TechnologySpotlight } from "@/blocks/TechnologySpotlight/config";
import { FlexibleContent } from "@/blocks/FlexibleContent/config";
import { Gallery } from "@/blocks/Gallery/config";
import { Hero } from "@/blocks/Hero/config";
import { HomepageHero } from "@/blocks/HomepageHero/config";
import { RelatedPosts } from "@/blocks/RelatedPosts/config";
import { ServiceSectionIntro } from "@/blocks/ServiceSectionIntro/config";
import { SplitContent } from "@/blocks/SplitContent/config";
import { validateContentLayout } from "./validateContentLayout";

const contentBlocks: Block[] = [
    Hero,
    HomepageHero,
    BranchesGrid,
    BranchDetails,
    FormBlock,
    ClientService,
    ServicesGrid,
    MetricsStrip,
    ProductsGrid,
    LogoMarquee,
    CenteredCTA,
    ProcessSteps,
    CompanyTimeline,
    ServiceSectionIntro,
    SplitContent,
    FlexibleContent,
    Gallery,
    ComputerAudience,
    ComputerCatalog,
    ComputerProductCatalog,
    MediaFeatureGrid,
    TechnologySpotlight,
    EditorialColumns,
    RelatedPosts,
];

export const contentLayout = (): BlocksField => ({
    name: "layout",
    type: "blocks",
    labels: {
        singular: { cs: "Obsahový blok", en: "Content block" },
        plural: { cs: "Obsahové bloky", en: "Content blocks" },
    },
    blocks: contentBlocks,
    filterOptions: ({ data }) =>
        contentBlocks
            .filter((block) =>
                block.slug === "branchDetails"
                    ? data?.pageType === "branch"
                    : block.slug === "relatedPosts"
                      ? data?.pageType === "post"
                      : true,
            )
            .map(({ slug }) => slug),
    required: true,
    validate: validateContentLayout,
    admin: { initCollapsed: true },
    label: { cs: "Obsahové bloky", en: "Content blocks" },
    localized: true,
});
