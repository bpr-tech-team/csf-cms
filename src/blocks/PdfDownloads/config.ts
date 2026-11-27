import type { Block } from "payload";

import { blockSpacingFields } from "@/fields/blockSpacing";

export const PdfDownloads: Block = {
    slug: "pdfDownloads",
    interfaceName: "PdfDownloadsBlock",
    labels: {
        singular: { cs: "PDF ke stažení", en: "PDF downloads" },
        plural: { cs: "Bloky PDF ke stažení", en: "PDF download blocks" },
    },
    fields: [
        blockSpacingFields(),
        {
            name: "heading",
            type: "text",
            label: { cs: "Nadpis", en: "Heading" },
            required: true,
        },
        {
            name: "documents",
            type: "array",
            label: { cs: "Dokumenty", en: "Documents" },
            labels: {
                singular: { cs: "Dokument", en: "Document" },
                plural: { cs: "Dokumenty", en: "Documents" },
            },
            minRows: 1,
            required: true,
            fields: [
                {
                    name: "label",
                    type: "text",
                    label: { cs: "Název odkazu", en: "Link label" },
                    required: true,
                },
                {
                    name: "file",
                    type: "upload",
                    relationTo: "media",
                    filterOptions: { mimeType: { equals: "application/pdf" } },
                    label: { cs: "Soubor PDF", en: "PDF file" },
                    required: true,
                },
            ],
        },
    ],
};
