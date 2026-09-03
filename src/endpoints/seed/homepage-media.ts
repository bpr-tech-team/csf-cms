import type { HomepageMedia } from "./home";
import type { Media } from "@/payload-types";
import type { File, Payload, PayloadRequest } from "payload";

import { readFile } from "node:fs/promises";
import path from "node:path";

type AssetSpec = {
    alt: string;
    filename: string;
    source: string;
};

const heroImages = [
    {
        alt: "Pronájem IT zařízení",
        filename: "csf-homepage-pronajem.png",
        source: "hero/image-02.png",
    },
    {
        alt: "Servis IT zařízení",
        filename: "csf-homepage-servis.jpg",
        source: "hero/image-01.jpg",
    },
    {
        alt: "Novinky ze světa IT",
        filename: "csf-homepage-blog.png",
        source: "hero/image-03.png",
    },
] satisfies AssetSpec[];

const heroIcons = ["04", "05", "06"].map((number) => ({
    alt: "",
    filename: `csf-homepage-quick-link-${number}.svg`,
    source: `hero/vector-${number}.svg`,
}));

const serviceIcons = Array.from({ length: 6 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
        alt: "",
        filename: `csf-homepage-service-${number}.svg`,
        source: `services/card-icon-${number}.svg`,
    };
});

const productImages = ["05.png", "02.jpg", "04.png", "03.png", "06.png"].map(
    (filename, index) => ({
        alt: "",
        filename: `csf-homepage-product-${index + 1}.${filename.split(".").pop()}`,
        source: `products/image-${filename}`,
    }),
);

const productIcons = ["01", "02", "03"].map((number) => ({
    alt: "",
    filename: `csf-homepage-product-icon-${number}.svg`,
    source: `products/vector-${number}.svg`,
}));

const partnerLogos = [
    "hp",
    "aoc",
    "oki",
    "philips",
    "dell",
    "huawei",
    "epson",
    "kyocera",
    "hpe",
].map((name) => ({
    alt: `${name.toUpperCase()} logo`,
    filename: `csf-partner-${name}.png`,
    source: `partners/logo-${name}.png`,
}));

export const createHomepageMedia = async ({
    payload,
    req,
}: {
    payload: Payload;
    req: PayloadRequest;
}): Promise<HomepageMedia> => {
    const createdHeroImages = await createMediaGroup({
        payload,
        req,
        specs: heroImages,
    });
    const createdHeroIcons = await createMediaGroup({
        payload,
        req,
        specs: heroIcons,
    });
    const createdServiceIcons = await createMediaGroup({
        payload,
        req,
        specs: serviceIcons,
    });
    const createdProductImages = await createMediaGroup({
        payload,
        req,
        specs: productImages,
    });
    const createdProductIcons = await createMediaGroup({
        payload,
        req,
        specs: productIcons,
    });
    const createdPartnerLogos = await createMediaGroup({
        payload,
        req,
        specs: partnerLogos,
    });

    return {
        heroImages: createdHeroImages as HomepageMedia["heroImages"],
        heroIcons: createdHeroIcons as HomepageMedia["heroIcons"],
        serviceIcons: createdServiceIcons as HomepageMedia["serviceIcons"],
        productImages: createdProductImages as HomepageMedia["productImages"],
        productIcons: createdProductIcons as HomepageMedia["productIcons"],
        partnerLogos: createdPartnerLogos,
    };
};

const createMediaGroup = async ({
    payload,
    req,
    specs,
}: {
    payload: Payload;
    req: PayloadRequest;
    specs: AssetSpec[];
}): Promise<Media[]> => {
    const media: Media[] = [];

    for (const spec of specs) {
        const existing = await payload.find({
            collection: "media",
            depth: 0,
            limit: 1,
            pagination: false,
            req,
            where: {
                filename: {
                    equals: spec.filename,
                },
            },
        });

        if (existing.docs[0]) {
            media.push(existing.docs[0]);
            continue;
        }

        const data = await readFile(
            path.resolve(process.cwd(), "public/media/homepage", spec.source),
        );
        const extension = path.extname(spec.filename).toLowerCase();
        const mimetype =
            extension === ".svg"
                ? "image/svg+xml"
                : extension === ".jpg" || extension === ".jpeg"
                  ? "image/jpeg"
                  : "image/png";
        const file: File = {
            data,
            mimetype,
            name: spec.filename,
            size: data.byteLength,
        };

        const created = await payload.create({
            collection: "media",
            data: { alt: spec.alt },
            file,
            req,
        });

        media.push(created);
    }

    return media;
};
