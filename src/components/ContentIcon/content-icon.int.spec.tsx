import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { ContentIcon } from ".";
import { CardIcon } from "@/components/CardIcon";
import type { Media } from "@/payload-types";
import { fontAwesomeURL } from "@/utilities/contentIcon";
import { iconCatalog, fontAwesomeSVG } from "@/utilities/fontAwesome.server";
import { GET } from "@/app/(frontend)/api/content-icons/[style]/[name]/route";

afterEach(cleanup);
const media = {
    id: 1,
    url: "/media/icon.png",
    updatedAt: "2026-09-24",
    mimeType: "image/png",
} as Media;

describe("content icons", () => {
    test("both sources use the same card slot without stretching artwork", () => {
        const { container, rerender } = render(
            <CardIcon icon={{ source: "image", image: media }} />,
        );
        const slotClass =
            container.firstElementChild?.firstElementChild?.className;
        expect(container.querySelector("img")?.style.objectFit).toBe("contain");
        rerender(
            <CardIcon
                icon={{ source: "fontawesome", fontAwesome: "solid/cloud" }}
            />,
        );
        expect(container.firstElementChild?.firstElementChild?.className).toBe(
            slotClass,
        );
        expect(
            container
                .querySelector('[style*="mask-image"]')
                ?.getAttribute("style"),
        ).toContain("/api/content-icons/solid/cloud");
        expect(container.querySelector("img")).toBeNull();
    });

    test("original color images remain intact while monochrome follows the block color", () => {
        const { container, rerender } = render(
            <ContentIcon icon={{ source: "image", image: media }} />,
        );
        expect(container.querySelector("img")?.getAttribute("src")).toBe(
            "/media/icon.png?2026-09-24",
        );
        rerender(
            <ContentIcon
                icon={{
                    source: "image",
                    image: media,
                    imageColor: "monochrome",
                }}
            />,
        );
        expect(container.querySelector("img")).toBeNull();
        expect(
            container
                .querySelector('[style*="mask-image"]')
                ?.getAttribute("style")
                ?.toLowerCase(),
        ).toContain("currentcolor");
    });

    test("scaling adjusts artwork but leaves the outer geometry unchanged", () => {
        const { container } = render(
            <ContentIcon
                icon={{
                    source: "fontawesome",
                    fontAwesome: "solid/cloud",
                    scale: 500,
                }}
                style={{ width: 32, height: 32 }}
            />,
        );
        expect((container.firstElementChild as HTMLElement).style.width).toBe(
            "32px",
        );
        expect(
            container.firstElementChild?.firstElementChild?.getAttribute(
                "style",
            ),
        ).toContain("scale(1.25)");
    });

    test("empty icons and unresolved uploads do not render broken images", () => {
        const { container, rerender } = render(
            <ContentIcon icon={{ source: "image", image: 123 }} />,
        );
        expect(container.innerHTML).toBe("");
        rerender(
            <ContentIcon
                icon={{ source: "fontawesome", fontAwesome: "../../secret" }}
            />,
        );
        expect(container.innerHTML).toBe("");
        expect(fontAwesomeURL("https://example.com/icon")).toBeNull();
    });

    test("catalog contains unique free icons in all three styles", () => {
        expect(new Set(iconCatalog.map(({ id }) => id)).size).toBe(
            iconCatalog.length,
        );
        for (const id of ["solid/cloud", "regular/heart", "brands/github"]) {
            expect(iconCatalog.some((icon) => icon.id === id)).toBe(true);
            expect(fontAwesomeSVG(id)).toContain("CC BY 4.0");
        }
    });

    test("SVG endpoint only serves known icons and sets image caching headers", async () => {
        const response = await GET(new Request("http://localhost"), {
            params: Promise.resolve({ style: "solid", name: "cloud" }),
        });
        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toContain("image/svg+xml");
        expect(response.headers.get("Cache-Control")).toContain("max-age");
        expect(await response.text()).toContain("<path");
        const missing = await GET(new Request("http://localhost"), {
            params: Promise.resolve({ style: "pro", name: "cloud" }),
        });
        expect(missing.status).toBe(404);
        expect(fontAwesomeSVG("solid/<script>")).toBeNull();
    });
});
