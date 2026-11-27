import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { BranchCardMedia } from "./BranchCardMedia";

const mapUrl = "https://www.google.com/maps?output=embed&q=Brno";
const mapTitle = "Mapa pobočky – Brno";

describe("branch card media", () => {
    afterEach(cleanup);

    it("only mounts the map when the visitor switches to it", () => {
        render(
            <BranchCardMedia
                branchName="Brno"
                locale="cs"
                mapUrl={mapUrl}
                photo={<span>Branch photo</span>}
            />,
        );

        const photo = screen.getByRole("button", { name: "Foto" });
        const map = screen.getByRole("button", { name: "Mapa" });
        expect(photo.getAttribute("aria-pressed")).toBe("true");
        expect(screen.queryByTitle(mapTitle)).toBeNull();

        fireEvent.click(map);
        expect(map.getAttribute("aria-pressed")).toBe("true");
        expect(screen.getByTitle(mapTitle).getAttribute("src")).toBe(mapUrl);

        fireEvent.click(photo);
        expect(screen.queryByTitle(mapTitle)).toBeNull();
        expect(screen.getByText("Branch photo")).toBeTruthy();
    });

    it("offers the map on demand when a branch has no photo", () => {
        render(
            <BranchCardMedia
                branchName="Brno"
                fallback={<span>Branch icon</span>}
                locale="cs"
                mapUrl={mapUrl}
            />,
        );

        const map = screen.getByRole("button", { name: "Mapa" });
        expect(screen.queryByRole("button", { name: "Foto" })).toBeNull();
        expect(screen.getByText("Branch icon")).toBeTruthy();
        expect(screen.queryByTitle(mapTitle)).toBeNull();

        fireEvent.click(map);
        expect(screen.getByTitle(mapTitle)).toBeTruthy();
        fireEvent.click(map);
        expect(screen.queryByTitle(mapTitle)).toBeNull();
    });
});
