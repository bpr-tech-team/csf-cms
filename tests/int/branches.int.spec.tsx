import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { Page, BranchesGridBlock as Grid } from "@/payload-types";
import type { PayloadRequest } from "payload";
import { BranchDetailsBlock } from "@/blocks/BranchDetails/Component";
import { BranchesGridBlock } from "@/blocks/BranchesGrid/Component";
import { ContactHeroBlock } from "@/blocks/ContactHero/Component";
import { BranchHeroBlock } from "@/blocks/BranchHero/Component";
import { CMSLink } from "@/components/Link";
import { validatePageLayout } from "@/collections/Pages/validateLayout";
import {
    revalidatePage,
    revalidateDelete,
} from "@/collections/Pages/hooks/revalidatePage";
import { isGoogleMapsEmbedURL } from "@/utilities/branchData";
import { getPagePath } from "@/utilities/getPagePath";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

const mocks = vi.hoisted(() => ({
    getBranches: vi.fn(),
    revalidatePath: vi.fn(),
    revalidateTag: vi.fn(),
}));
vi.mock("@/utilities/getBranches", () => ({ getBranches: mocks.getBranches }));
vi.mock("next/cache", () => ({
    revalidatePath: mocks.revalidatePath,
    revalidateTag: mocks.revalidateTag,
}));

const branch: Page = {
    id: 91,
    title: "Hradec Králové",
    slug: "hradec-kralove",
    pageType: "branch",
    layout: [],
    createdAt: "2026-09-20",
    updatedAt: "2026-09-20",
    _status: "published",
    branchInfo: {
        address: "Střelecká 672\n500 02 Hradec Králové",
        phones: [
            { number: "+420 495 533 495" },
            { number: "+420 606 630 421" },
        ],
        email: "info@csf.cz",
        companyName: "CSF, s.r.o.",
        companyId: "25289462",
        vatId: "CZ25289462",
        openingHours: [{ days: "Pondělí", hours: "8:00–16:30" }],
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=test-location",
    },
};

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: vi.fn(() => ({
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        })),
    });
});

describe("Contact and branch pages", () => {
    it("uses independent hero blocks and links the contact hero to the form", () => {
        const { rerender } = render(
            <ContactHeroBlock
                blockType="contactHero"
                heading="Kontaktujte nás"
                description="Navštivte naše pobočky."
                backgroundMedia={1}
                phone="+420 495 533 495"
                isPageIntro
            />,
        );
        expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
            "Kontaktujte nás",
        );
        expect(
            screen.getByRole("link", { name: "Napsat" }).getAttribute("href"),
        ).toBe("#kontakt");
        expect(
            screen.getByRole("link", { name: "Volat" }).getAttribute("href"),
        ).toBe("tel:+420495533495");
        rerender(
            <BranchHeroBlock
                blockType="branchHero"
                heading={branch.title}
                description="Sídlo společnosti"
                backgroundMedia={1}
                isPageIntro
            />,
        );
        expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
            branch.title,
        );
        expect(screen.queryAllByRole("link")).toHaveLength(0);
    });

    it("renders shared contacts, hours and a lazy Google Maps iframe", () => {
        render(<BranchDetailsBlock blockType="branchDetails" page={branch} />);
        expect(
            screen
                .getByRole("link", { name: "+420 606 630 421" })
                .getAttribute("href"),
        ).toBe("tel:+420606630421");
        expect(
            screen
                .getByRole("link", { name: "info@csf.cz" })
                .getAttribute("href"),
        ).toBe("mailto:info@csf.cz");
        expect(screen.getByText("Pondělí")).toBeTruthy();
        const map = screen.getByTitle("Mapa pobočky: Hradec Králové");
        expect(map.getAttribute("src")).toBe(branch.branchInfo?.mapEmbedUrl);
        expect(map.getAttribute("loading")).toBe("lazy");
    });

    it("handles incomplete drafts and omits empty hours and maps", () => {
        const incomplete = {
            ...branch,
            branchInfo: { address: "Draft" },
        } as Page;
        render(
            <BranchDetailsBlock blockType="branchDetails" page={incomplete} />,
        );
        expect(screen.queryByText("Provozní doba")).toBeNull();
        expect(screen.queryByTitle(/Mapa pobočky/)).toBeNull();
    });

    it("preserves the selected order, omits unavailable branches and respects card options", async () => {
        mocks.getBranches.mockResolvedValue([
            branch,
            { ...branch, id: 92, title: "Praha", slug: "praha" },
        ]);
        const grid: Grid = {
            blockType: "branchesGrid",
            heading: "Pobočky",
            items: [
                { branch: 92, width: "standard", showOpeningHours: false },
                { branch: 404, width: "standard" },
                { branch: branch.id, width: "wide", showOpeningHours: true },
                { branch: null as unknown as number, width: "wide" },
            ],
        };
        render(await BranchesGridBlock({ ...grid, locale: "en" }));
        const titles = screen.getAllByRole("heading", { level: 3 });
        expect(titles.map((title) => title.textContent)).toEqual([
            "Praha",
            "Hradec Králové",
        ]);
        expect(screen.getAllByText("Opening hours")).toHaveLength(1);
        expect(
            screen
                .getByRole("link", { name: "Hradec Králové" })
                .getAttribute("href"),
        ).toBe("/en/kontakt/hradec-kralove");
        expect(titles[1].closest("article")?.className).toContain(
            "xl:col-span-3",
        );
        expect(mocks.getBranches).toHaveBeenCalledWith(
            [92, 404, 91],
            "en",
            false,
        );
    });

    it("uses the branch path in CMS links and preview while preserving existing page paths", () => {
        expect(getPagePath(branch)).toBe("/kontakt/hradec-kralove");
        expect(getPagePath({ slug: "home", pageType: "standard" })).toBe("/");
        expect(getPagePath({ slug: "it-sluzby", pageType: "service" })).toBe(
            "/it-sluzby",
        );
        render(
            <CMSLink
                type="reference"
                reference={{ relationTo: "pages", value: branch }}
                label="Branch"
                locale="en"
            />,
        );
        expect(screen.getByRole("link").getAttribute("href")).toBe(
            "/en/kontakt/hradec-kralove",
        );
        const preview = generatePreviewPath({
            collection: "pages",
            slug: branch.slug,
            pageType: "branch",
            req: { locale: "en" } as PayloadRequest,
        });
        expect(
            new URL(preview!, "http://localhost").searchParams.get("path"),
        ).toBe("/en/kontakt/hradec-kralove");
    });

    it("rejects extra heroes and branch details on a standard page", () => {
        const validate = (types: string[], pageType = "branch") =>
            validatePageLayout(
                types.map((blockType) => ({ blockType })),
                { data: { pageType } } as unknown as Parameters<
                    typeof validatePageLayout
                >[1],
            );
        expect(validate(["branchHero", "branchDetails"])).toBe(true);
        expect(validate(["contactHero", "branchesGrid"], "standard")).toBe(
            true,
        );
        expect(validate(["contactHero", "branchHero"])).not.toBe(true);
        expect(validate(["branchDetails", "branchHero"])).not.toBe(true);
        expect(validate(["branchDetails"], "standard")).not.toBe(true);
        expect(
            validate(["branchHero", "branchDetails", "branchDetails"]),
        ).not.toBe(true);
    });

    it("invalidates old and new branch URLs and grids on rename, unpublish and delete", () => {
        const req = {
            payload: { logger: { info: vi.fn() } },
            context: {},
        } as unknown as PayloadRequest;
        revalidatePage({
            doc: { ...branch, slug: "new-name" },
            previousDoc: branch,
            req,
        } as Parameters<typeof revalidatePage>[0]);
        expect(mocks.revalidatePath).toHaveBeenCalledWith(
            "/kontakt/hradec-kralove",
        );
        expect(mocks.revalidatePath).toHaveBeenCalledWith("/kontakt/new-name");
        expect(mocks.revalidateTag).toHaveBeenCalledWith("branches", {
            expire: 0,
        });
        vi.clearAllMocks();
        revalidatePage({
            doc: { ...branch, _status: "draft" },
            previousDoc: branch,
            req,
        } as Parameters<typeof revalidatePage>[0]);
        expect(mocks.revalidatePath).toHaveBeenCalledWith(
            "/kontakt/hradec-kralove",
        );
        expect(mocks.revalidateTag).toHaveBeenCalledWith("branches", {
            expire: 0,
        });
        vi.clearAllMocks();
        revalidateDelete({ doc: branch, req } as Parameters<
            typeof revalidateDelete
        >[0]);
        expect(mocks.revalidateTag).toHaveBeenCalledWith("branches", {
            expire: 0,
        });
    });

    it.each([
        "https://www.google.com/maps/embed?pb=test-location",
        "https://www.google.com/maps/embed/v1/place?key=test&q=CSF",
        "https://maps.google.com/maps?q=CSF&output=embed",
    ])("accepts Google Maps embed URL %s", (url) => {
        expect(isGoogleMapsEmbedURL(url)).toBe(true);
    });

    it.each([
        "javascript:alert(1)",
        "https://www.google.com.evil.example/maps/embed",
        "https://evil.example/maps/embed",
        "https://www.google.com/maps/place/CSF",
        "https://user:password@www.google.com/maps/embed",
        "http://www.google.com/maps/embed",
    ])("rejects invalid map embed URL %s", (url) => {
        expect(isGoogleMapsEmbedURL(url)).toBe(false);
    });
});
