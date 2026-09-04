import "dotenv/config";

import config from "@payload-config";
import { createLocalReq, getPayload } from "payload";

import { about } from "@/endpoints/seed/about";
import { contactForm as contactFormData } from "@/endpoints/seed/contact-form";
import { createHomepageMedia } from "@/endpoints/seed/homepage-media";

const updateExisting = process.argv.includes("--update");

const importAboutPage = async () => {
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
                    equals: "o-nas",
                },
            },
        });
        const existingPage = existingPages.docs[0];

        if (existingPage && !updateExisting) {
            payload.logger.info(
                `About page already exists (id ${existingPage.id}); no changes made. Pass --update to replace its generated content.`,
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
        const contactForm =
            existingForms.docs[0] ||
            (await payload.create({
                collection: "forms",
                context: { disableRevalidate: true },
                data: contactFormData,
                req,
            }));

        const media = await createHomepageMedia({ payload, req });
        const data = about({
            contactForm,
            media,
            metaImage: null,
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
        const timeline = importedPage.layout.find(
            (block) => block.blockType === "companyTimeline",
        );

        if (
            importedPage.hero.type !== "about" ||
            importedPage.layout.length !== 5 ||
            importedPage.meta?.image != null ||
            !timeline ||
            timeline.items.length !== 8 ||
            timeline.items.at(-1)?.year !== "2023" ||
            timeline.items.at(-2)?.year !== "2023"
        ) {
            throw new Error("About page verification failed after import.");
        }

        payload.logger.info({
            msg: "About page import completed and verified.",
            pageID: importedPage.id,
            formID: contactForm.id,
            layoutBlocks: importedPage.layout.map((block) => block.blockType),
            timelineEvents: timeline.items.length,
        });
    } finally {
        await payload.db.destroy?.();
    }
};

importAboutPage()
    .then(() => process.exit(0))
    .catch((error: unknown) => {
        console.error(error);
        process.exit(1);
    });
