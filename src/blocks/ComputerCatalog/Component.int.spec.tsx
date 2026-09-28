import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    cleanup,
    fireEvent,
    render,
    screen,
    within,
} from "@testing-library/react";
import type { ComputerCatalogBlock as Catalog } from "@/payload-types";
import { ComputerCatalogBlock } from "./Component";

vi.mock("@/components/MediaAsset", () => ({
    MediaAsset: ({ alt, className }: { alt: string; className: string }) => (
        <span role="img" aria-label={alt} className={className} />
    ),
}));

const product = (name: string) => ({
    name,
    image: 1,
    summary: `${name} description`,
    specifications: Array.from({ length: 9 }, (_, index) => ({
        label: `Parameter ${index + 1}`,
        value: `Value ${index + 1}`,
    })),
});
const data: Catalog = {
    blockType: "computerCatalog",
    navigationHeading: "Choose a category",
    audiences: [
        {
            id: "designers",
            title: "Designers",
            summary: "Design workstations",
            heading: "Design introduction",
            description: "For designers",
            categories: [
                {
                    id: "first",
                    label: "Rendering",
                    heading: "Rendering products",
                    products: [product("Render workstation")],
                },
                {
                    id: "second",
                    label: "Simulation",
                    heading: "Simulation products",
                    products: Array.from({ length: 13 }, (_, index) =>
                        product(`Simulation ${index + 1}`),
                    ),
                },
            ],
        },
        {
            id: "scientists",
            title: "Scientists",
            summary: "Science workstations",
            heading: "Science introduction",
            description: "For scientists",
            categories: [
                {
                    id: "first",
                    label: "Data science",
                    heading: "Data science products",
                    products: [product("Science workstation")],
                },
            ],
        },
    ],
};

afterEach(cleanup);

describe("workstation audience and category selection", () => {
    it("opens the first audience in CMS order and updates the entire catalog", () => {
        render(<ComputerCatalogBlock {...data} locale="en" />);
        expect(
            screen.getByRole("heading", { name: "Render workstation" }),
        ).toBeTruthy();
        fireEvent.click(screen.getByRole("tab", { name: /Simulation/ }));
        expect(
            screen.getByRole("heading", { name: "Simulation 1" }),
        ).toBeTruthy();
        fireEvent.click(screen.getByRole("tab", { name: /Scientists/ }));
        expect(
            screen.getByRole("heading", { name: "Science introduction" }),
        ).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: "Science workstation" }),
        ).toBeTruthy();
        expect(screen.queryByRole("tab", { name: "Simulation" })).toBeNull();
        expect(
            screen.queryByRole("heading", { name: "Simulation 1" }),
        ).toBeNull();
        expect(
            screen.getByRole("img", { name: "Science workstation" }).className,
        ).not.toContain("p-4");
    });

    it("resets categories, product pagination and expanded specifications when audiences change", () => {
        render(<ComputerCatalogBlock {...data} locale="en" />);
        fireEvent.click(screen.getByRole("tab", { name: "Simulation" }));
        fireEvent.click(screen.getByRole("button", { name: "Show more" }));
        expect(
            screen.getByRole("heading", { name: "Simulation 13" }),
        ).toBeTruthy();
        fireEvent.click(
            screen.getAllByRole("button", { name: "All specifications" })[0],
        );
        expect(
            screen.getByRole("button", { name: "Fewer specifications" }),
        ).toBeTruthy();
        fireEvent.click(screen.getByRole("tab", { name: /Scientists/ }));
        fireEvent.click(screen.getByRole("tab", { name: /Designers/ }));
        expect(
            screen
                .getByRole("tab", { name: "Rendering" })
                .getAttribute("aria-selected"),
        ).toBe("true");
        fireEvent.click(screen.getByRole("tab", { name: "Simulation" }));
        expect(
            screen.queryByRole("heading", { name: "Simulation 13" }),
        ).toBeNull();
        expect(
            screen.queryByRole("button", { name: "Fewer specifications" }),
        ).toBeNull();
    });

    it("uses the stored audience order and supports keyboard navigation in both selectors", () => {
        render(
            <ComputerCatalogBlock
                {...data}
                audiences={[...data.audiences].reverse()}
                locale="en"
            />,
        );
        expect(
            screen.getByRole("heading", { name: "Science workstation" }),
        ).toBeTruthy();
        const audienceTabs = within(
            screen.getByRole("tablist", { name: "Audiences" }),
        );
        fireEvent.keyDown(
            audienceTabs.getByRole("tab", { name: /Scientists/ }),
            { key: "ArrowDown" },
        );
        expect(document.activeElement).toBe(
            audienceTabs.getByRole("tab", { name: /Designers/ }),
        );
        fireEvent.keyDown(screen.getByRole("tab", { name: "Rendering" }), {
            key: "End",
        });
        expect(
            screen
                .getByRole("tab", { name: "Simulation" })
                .getAttribute("aria-selected"),
        ).toBe("true");
        fireEvent.keyDown(
            audienceTabs.getByRole("tab", { name: /Designers/ }),
            { key: "Home" },
        );
        expect(
            screen
                .getByRole("tab", { name: "Data science" })
                .getAttribute("aria-selected"),
        ).toBe("true");
    });
});
