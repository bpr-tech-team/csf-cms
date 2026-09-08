import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { AboutHero } from "../../blocks/AboutHero/config";
import { Archive } from "../../blocks/ArchiveBlock/config";
import { CallToAction } from "../../blocks/CallToAction/config";
import { CenteredCTA } from "../../blocks/CenteredCTA/config";
import { CompanyTimeline } from "../../blocks/CompanyTimeline/config";
import { Content } from "../../blocks/Content/config";
import { ComputerAudience } from "../../blocks/ComputerAudience/config";
import { ComputerHero } from "../../blocks/ComputerHero/config";
import { ComputerProductCatalog } from "../../blocks/ComputerProductCatalog/config";
import { EditorialColumns } from "../../blocks/EditorialColumns/config";
import { FormBlock } from "../../blocks/Form/config";
import { LogoMarquee } from "../../blocks/LogoMarquee/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { MediaFeatureGrid } from "../../blocks/MediaFeatureGrid/config";
import { MetricsStrip } from "../../blocks/MetricsStrip/config";
import { ProcessSteps } from "../../blocks/ProcessSteps/config";
import { ProductsGrid } from "../../blocks/ProductsGrid/config";
import { ServicesGrid } from "../../blocks/ServicesGrid/config";
import { TechnologySpotlight } from "../../blocks/TechnologySpotlight/config";
import { FeatureRows } from "@/blocks/FeatureRows/config";
import { HomepageHero } from "@/blocks/HomepageHero/config";
import { ServiceHero } from "@/blocks/ServiceHero/config";
import { ServiceSectionIntro } from "@/blocks/ServiceSectionIntro/config";
import { SplitContent } from "@/blocks/SplitContent/config";
import { slugField } from "payload";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
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
    },
    admin: {
        defaultColumns: ["title", "slug", "updatedAt"],
        livePreview: {
            url: ({ data, req }) =>
                generatePreviewPath({
                    slug: data?.slug,
                    collection: "pages",
                    req,
                }),
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: data?.slug as string,
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
        {
            name: "pageType",
            type: "select",
            admin: {
                position: "sidebar",
            },
            defaultValue: "standard",
            label: {
                cs: "Typ stránky",
                en: "Page type",
            },
            options: [
                {
                    label: {
                        cs: "Standardní stránka",
                        en: "Standard page",
                    },
                    value: "standard",
                },
                {
                    label: {
                        cs: "Služba",
                        en: "Service",
                    },
                    value: "service",
                },
                {
                    label: {
                        cs: "Počítače",
                        en: "Computers",
                    },
                    value: "computer",
                },
            ],
            required: true,
        },
        {
            type: "tabs",
            tabs: [
                {
                    fields: [
                        {
                            name: "layout",
                            type: "blocks",
                            blocks: [
                                HomepageHero,
                                AboutHero,
                                CallToAction,
                                Content,
                                MediaBlock,
                                Archive,
                                FormBlock,
                                ServicesGrid,
                                MetricsStrip,
                                ProductsGrid,
                                LogoMarquee,
                                CenteredCTA,
                                ProcessSteps,
                                CompanyTimeline,
                                ServiceHero,
                                ServiceSectionIntro,
                                SplitContent,
                                FeatureRows,
                                ComputerHero,
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
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100, // We set this interval for optimal live preview
            },
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
