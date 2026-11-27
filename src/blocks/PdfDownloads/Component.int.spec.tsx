import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import type { Media } from "@/payload-types";

import { PdfDownloadsBlock } from "./Component";

const pdf: Media = {
    id: 1,
    createdAt: "2026-11-27",
    updatedAt: "2026-11-27",
    mimeType: "application/pdf",
    url: "/api/media/file/iso-9001.pdf",
};

describe("PdfDownloadsBlock", () => {
    afterEach(cleanup);

    it("links to local PDFs and skips missing or non-PDF media", () => {
        render(
            <PdfDownloadsBlock
                blockType="pdfDownloads"
                heading="ISO certifikáty"
                documents={[
                    { label: "ISO 9001", file: pdf },
                    { label: "Missing", file: 2 },
                    { label: "Image", file: { ...pdf, mimeType: "image/png" } },
                ]}
            />,
        );

        expect(
            screen.getByRole("heading", { name: "ISO certifikáty" }),
        ).toBeTruthy();
        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(1);
        expect(links[0].getAttribute("href")).toBe(pdf.url);
        expect(links[0].hasAttribute("download")).toBe(true);
    });

    it("requests an attachment from the public Blob URL", () => {
        render(
            <PdfDownloadsBlock
                blockType="pdfDownloads"
                heading="ISO certifikáty"
                documents={[
                    {
                        label: "ISO 9001",
                        file: {
                            ...pdf,
                            url: "https://test.public.blob.vercel-storage.com/iso-9001.pdf?version=1",
                        },
                    },
                ]}
            />,
        );

        expect(
            screen.getByRole("link", { name: "ISO 9001" }).getAttribute("href"),
        ).toBe(
            "https://test.public.blob.vercel-storage.com/iso-9001.pdf?version=1&download=1",
        );
    });
});
