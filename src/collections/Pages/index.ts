import type { CollectionConfig } from "payload";
import type { Page } from "@/payload-types";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { branchInfo } from "@/fields/branchInfo";
import { pageType } from "@/fields/pageType";
import { slugField } from "payload";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import {
    capturePagePathsBeforeChange,
    revalidateDelete,
    revalidatePage,
} from "./hooks/revalidatePage";
import { populateAuthors } from "./hooks/populateAuthors";
import { captureDocumentPathsBeforeDelete } from "@/utilities/getDocumentRevalidationPaths";
import {
    revalidateNavigation,
    revalidateNavigationAfterDelete,
} from "@/hooks/revalidateNavigation";
import { contentLayout } from "@/fields/contentLayout";
import { postTabs } from "@/fields/postTabs";
import { postCardSelect } from "@/utilities/postCards";

import { seoFields } from "@/fields/seo";

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
    defaultPopulate: postCardSelect,
    admin: {
        components: {
            beforeListTable: ["@/components/PageTypeViews#PageTypeTabs"],
            views: {
                list: {
                    Component: "@/components/PageTypeViews#PageTypeListView",
                },
            },
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
                    fields: [contentLayout()],
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
                ...postTabs,
                {
                    name: "meta",
                    label: "SEO",
                    fields: seoFields(),
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
        afterChange: [revalidatePage, revalidateNavigation],
        beforeChange: [capturePagePathsBeforeChange, populatePublishedAt],
        afterRead: [populateAuthors],
        beforeDelete: [captureDocumentPathsBeforeDelete("pages")],
        afterDelete: [revalidateDelete, revalidateNavigationAfterDelete],
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
