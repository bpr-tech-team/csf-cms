import type { Block } from "payload";

import { blockSpacingFields } from "@/fields/blockSpacing";
import { galleryFields } from "@/fields/gallery";

export const Gallery: Block = {
    slug: "gallery",
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
    dbName: "flex_gallery",
    interfaceName: "FlexibleGalleryElement",
    labels: Gallery.labels,
    fields: galleryFields(),
};
