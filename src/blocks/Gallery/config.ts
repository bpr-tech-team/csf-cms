import type { Block } from "payload";

import { blockSpacingFields } from "@/fields/blockSpacing";
import { galleryFields } from "@/fields/gallery";

export const Gallery: Block = {
    slug: "gallery",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/gallery.webp",
                alt: "Galerie obrázků",
            },
        },
    },
    dbName: "gallery",
    interfaceName: "GalleryBlock",
    labels: {
        singular: { cs: "Galerie", en: "Gallery" },
        plural: { cs: "Galerie", en: "Galleries" },
    },
    fields: [blockSpacingFields(), ...galleryFields()],
};

export const FlexibleGallery: Block = {
    slug: "flexGallery",
    admin: Gallery.admin,
    dbName: "flex_gallery",
    interfaceName: "FlexibleGalleryElement",
    labels: Gallery.labels,
    fields: galleryFields(),
};
