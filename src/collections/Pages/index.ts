import type { CollectionConfig } from "payload";
import type { Page } from "@/payload-types";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { BranchesGrid } from "@/blocks/BranchesGrid/config";
import { BranchDetails } from "@/blocks/BranchDetails/config";
import { branchInfo } from "@/fields/branchInfo";
import { pageType } from "@/fields/pageType";
import { CenteredCTA } from "../../blocks/CenteredCTA/config";
import { CompanyTimeline } from "../../blocks/CompanyTimeline/config";
import { ComputerAudience } from "../../blocks/ComputerAudience/config";
import { ComputerProductCatalog } from "../../blocks/ComputerProductCatalog/config";
import { EditorialColumns } from "../../blocks/EditorialColumns/config";
import { FormBlock } from "../../blocks/Form/config";
import { ClientService } from "@/blocks/ClientService/config";
import { LogoMarquee } from "../../blocks/LogoMarquee/config";
import { MediaFeatureGrid } from "../../blocks/MediaFeatureGrid/config";
import { MetricsStrip } from "../../blocks/MetricsStrip/config";
import { ProcessSteps } from "../../blocks/ProcessSteps/config";
import { ProductsGrid } from "../../blocks/ProductsGrid/config";
import { ServicesGrid } from "../../blocks/ServicesGrid/config";
import { TechnologySpotlight } from "../../blocks/TechnologySpotlight/config";
import { FlexibleContent } from "@/blocks/FlexibleContent/config";
import { Hero } from "@/blocks/Hero/config";
import { HomepageHero } from "@/blocks/HomepageHero/config";
import { ServiceSectionIntro } from "@/blocks/ServiceSectionIntro/config";
import { SplitContent } from "@/blocks/SplitContent/config";
import { slugField } from "payload";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
import { captureDocumentPathsBeforeDelete } from "@/utilities/getDocumentRevalidationPaths";
import { validatePageLayout } from "./validateLayout";

import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const Pages: CollectionConfig<"pages"> = {
    slug: "pages",
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    // This config controls what's populated by default when a page is referenced
    // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
    // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
    defaultPopulate: {
        title: true,
        slug: true,
        pageType: true,
    },
    admin: {
        components: {
            beforeListTable: ["@/components/PageTypeViews#PageTypeTabs"],
        },
        defaultColumns: ["title", "pageType", "slug", "updatedAt"],
        livePreview: {
            url: ({ data, req }) =>
                generatePreviewPath({
                    slug: data?.slug,
                    pageType: data?.pageType,
                    collection: "pages",
                    req,
                }),
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: data?.slug as string,
                pageType: data?.pageType as Page["pageType"],
                collection: "pages",
                req,
            }),
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            label: {
                cs: "Název",
                en: "Title",
            },
            localized: true,
            required: true,
        },
        pageType,
        {
            type: "tabs",
            tabs: [
                {
                    fields: [
                        {
                            name: "layout",
                            type: "blocks",
                            blocks: [
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
                                ComputerAudience,
                                ComputerProductCatalog,
                                MediaFeatureGrid,
                                TechnologySpotlight,
                                EditorialColumns,
                            ],
                            required: true,
                            validate: validatePageLayout,
                            admin: {
                                initCollapsed: true,
                            },
                            label: {
                                cs: "Obsahové bloky",
                                en: "Content blocks",
                            },
                            localized: true,
                        },
                    ],
                    label: {
                        cs: "Obsah",
                        en: "Content",
                    },
                },
                {
                    label: { cs: "Pobočka", en: "Branch" },
                    admin: { condition: (data) => data?.pageType === "branch" },
                    fields: [branchInfo],
                },
                {
                    name: "meta",
                    label: "SEO",
                    fields: [
                        OverviewField({
                            titlePath: "meta.title",
                            descriptionPath: "meta.description",
                            imagePath: "meta.image",
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: "media",
                        }),

                        MetaDescriptionField({}),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: "meta.title",
                            descriptionPath: "meta.description",
                        }),
                    ],
                },
            ],
        },
        {
            name: "publishedAt",
            type: "date",
            admin: {
                position: "sidebar",
            },
            label: {
                cs: "Publikováno",
                en: "Published at",
            },
        },
        slugField({ localized: true }),
    ],
    hooks: {
        afterChange: [revalidatePage],
        beforeChange: [populatePublishedAt],
        beforeDelete: [captureDocumentPathsBeforeDelete("pages")],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            // Autosave creates a draft on opening the create form, which locks
            // pageType before the editor can choose it. Require a manual save.
            autosave: false,
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
    labels: {
        plural: {
            cs: "Stránky",
            en: "Pages",
        },
        singular: {
            cs: "Stránka",
            en: "Page",
        },
    },
};
