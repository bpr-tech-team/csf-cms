import "dotenv/config";

import config from "@payload-config";
import { createLocalReq, getPayload } from "payload";

import { contactForm as contactFormData } from "@/endpoints/seed/contact-form";
import { home } from "@/endpoints/seed/home";
import { createHomepageMedia } from "@/endpoints/seed/homepage-media";

const updateExisting = process.argv.includes("--update");

const importHomepage = async () => {
    const payload = await getPayload({ config });
    const req = await createLocalReq({}, payload);

    try {
        const existingPages = await payload.find({
            collection: "pages",
            depth: 0,
            draft: true,
            limit: 1,
            locale: "cs",
            pagination: false,
            req,
            where: {
                slug: {
                    equals: "home",
                },
            },
        });
        const existingPage = existingPages.docs[0];

        if (existingPage && !updateExisting) {
            payload.logger.info(
                `Homepage already exists (id ${existingPage.id}); no changes made. Pass --update to replace its generated content.`,
            );
            return;
        }

        const existingForms = await payload.find({
            collection: "forms",
            depth: 0,
            limit: 1,
            pagination: false,
            req,
            where: {
                title: {
                    equals: contactFormData.title,
                },
            },
        });
        const existingForm = existingForms.docs[0];
        const contactForm = existingForm
            ? updateExisting
                ? await payload.update({
                      collection: "forms",
                      context: { disableRevalidate: true },
                      data: contactFormData,
                      id: existingForm.id,
                      req,
                  })
                : existingForm
            : await payload.create({
                  collection: "forms",
                  context: { disableRevalidate: true },
                  data: contactFormData,
                  req,
              });

        const media = await createHomepageMedia({ payload, req });
        const data = home({
            contactForm,
            media,
            metaImage: media.heroImages[0],
        });
        const page = existingPage
            ? await payload.update({
                  collection: "pages",
                  context: { disableRevalidate: true },
                  data,
                  draft: false,
                  id: existingPage.id,
                  locale: "cs",
                  req,
              })
            : await payload.create({
                  collection: "pages",
                  context: { disableRevalidate: true },
                  data,
                  draft: false,
                  locale: "cs",
                  req,
              });

        const importedPage = await payload.findByID({
            collection: "pages",
            depth: 2,
            draft: false,
            id: page.id,
            locale: "cs",
            req,
        });
        const importedMedia = await payload.count({
            collection: "media",
            req,
            where: {
                filename: {
                    contains: "csf-",
                },
            },
        });

        if (
            importedPage.hero.type !== "homepage" ||
            importedPage.hero.quickLinks?.length !== 3 ||
            importedPage.layout.length !== 7
        ) {
            throw new Error("Homepage verification failed after import.");
        }

        payload.logger.info({
            msg: "Homepage import completed and verified.",
            pageID: importedPage.id,
            formID: contactForm.id,
            mediaCount: importedMedia.totalDocs,
            layoutBlocks: importedPage.layout.map((block) => block.blockType),
        });
    } finally {
        await payload.db.destroy?.();
    }
};

importHomepage().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
