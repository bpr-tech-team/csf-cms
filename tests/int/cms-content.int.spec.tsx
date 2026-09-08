import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Header, Media } from "@/payload-types";
import { HeaderNav } from "@/globals/Header/Nav";
import { Footer } from "@/globals/Footer/Component";
import { MediaAsset } from "@/components/MediaAsset";

const globals = vi.hoisted(() => ({
    footer: { columns: [], navItems: [], tagline: "" },
}));
vi.mock("@/utilities/getGlobals", () => ({
    getCachedGlobal: () => async () => globals.footer,
}));

afterEach(cleanup);

const emptyHeader: Header = {
    id: 1,
    navItems: [],
    customerZoneLink: { label: "" },
    contactLink: { label: "" },
};

describe("CMS content without demo fallbacks", () => {
    it("does not invent navigation links when Header is empty", () => {
        render(<HeaderNav data={emptyHeader} locale="cs" variant="desktop" />);
        expect(screen.queryAllByRole("link")).toHaveLength(0);
    });

    it("renders only configured navigation links", () => {
        const data: Header = {
            ...emptyHeader,
            navItems: [
                {
                    link: {
                        type: "custom",
                        label: "CMS page",
                        url: "/cms-page",
                    },
                },
            ],
        };
        render(<HeaderNav data={data} locale="cs" variant="desktop" />);
        expect(screen.getAllByRole("link")).toHaveLength(1);
        expect(
            screen.getByRole("link", { name: "CMS page" }).getAttribute("href"),
        ).toBe("/cms-page");
    });

    it("does not invent footer columns or a tagline", async () => {
        render(await Footer({ locale: "cs" }));
        expect(screen.queryAllByRole("navigation")).toHaveLength(0);
        expect(
            screen.queryByText(
                "Precizní infrastruktura pro digitální suverenitu firem.",
            ),
        ).toBeNull();
    });

    it.each([null, 0, 123])(
        "does not substitute a bundled image for unresolved media %s",
        (resource) => {
            const { container } = render(
                <MediaAsset className="image" resource={resource} />,
            );
            expect(container.querySelector("img, video")).toBeNull();
        },
    );

    it("renders media provided by the CMS", () => {
        const resource: Media = {
            id: 1,
            filename: "cms-image.png",
            url: "/api/media/file/cms-image.png",
            mimeType: "image/png",
            width: 32,
            height: 32,
            createdAt: "2026-09-07",
            updatedAt: "2026-09-07",
        };
        render(
            <MediaAsset
                alt="CMS image"
                className="image"
                resource={resource}
            />,
        );
        expect(screen.getByRole("img", { name: "CMS image" })).toBeTruthy();
    });
});
