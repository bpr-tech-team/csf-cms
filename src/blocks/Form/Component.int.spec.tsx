import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FormBlock, type FormBlockType } from "@/blocks/Form/Component";

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/components/RichText", () => ({ default: () => null }));

const block: FormBlockType = {
    blockType: "formBlock",
    appearance: "homepageDark",
    enableEmployee: true,
    employee: {
        photo: {
            id: 1,
            url: "/api/media/file/employee.png",
            mimeType: "image/png",
            width: 400,
            height: 400,
            createdAt: "2026-09-14T00:00:00.000Z",
            updatedAt: "2026-09-14T00:00:00.000Z",
        },
        name: "Pavel Aliger",
        position: "Obchodní ředitel",
        phone: "+420 495 533 495",
        email: "obchod@csf.cz",
        address: "Střelecká 672\n500 02 Hradec Králové",
    },
    form: {
        id: 7,
        title: "Kontaktní formulář",
        submitButtonLabel: "Odeslat poptávku",
        confirmationType: "message",
        confirmationMessage: {
            root: {
                type: "root",
                children: [],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
            },
        },
        fields: [],
        createdAt: "2026-09-14T00:00:00.000Z",
        updatedAt: "2026-09-14T00:00:00.000Z",
    },
};

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
});

describe("Form employee card", () => {
    it("shows contact links and keeps the employee after submission", async () => {
        const fetch = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal("fetch", fetch);
        render(<FormBlock {...block} locale="cs" />);

        expect(screen.getByRole("img", { name: "Pavel Aliger" })).toBeTruthy();
        expect(
            screen.getByRole("heading", { name: "Pavel Aliger" }),
        ).toBeTruthy();
        expect(
            screen
                .getByRole("link", { name: "+420 495 533 495" })
                .getAttribute("href"),
        ).toBe("tel:+420495533495");
        expect(
            screen
                .getByRole("link", { name: "obchod@csf.cz" })
                .getAttribute("href"),
        ).toBe("mailto:obchod@csf.cz");

        fireEvent.click(
            screen.getByRole("button", { name: "Odeslat poptávku" }),
        );
        await waitFor(() => expect(screen.getByRole("status")).toBeTruthy());

        expect(fetch).toHaveBeenCalledOnce();
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
            form: "7",
            submissionData: [],
        });
        expect(
            screen.getByRole("link", { name: "obchod@csf.cz" }),
        ).toBeTruthy();
        expect(
            screen.queryByRole("button", { name: "Odeslat poptávku" }),
        ).toBeNull();
    });

    it("hides saved employee details when the card is disabled", () => {
        render(<FormBlock {...block} enableEmployee={false} />);
        expect(screen.queryByRole("complementary")).toBeNull();
        expect(
            screen.getByRole("button", { name: "Odeslat poptávku" }),
        ).toBeTruthy();
    });

    it("renders existing forms without employee data", () => {
        render(
            <FormBlock
                {...block}
                enableEmployee={undefined}
                employee={undefined}
            />,
        );
        expect(screen.queryByRole("complementary")).toBeNull();
        expect(
            screen.getByRole("button", { name: "Odeslat poptávku" }),
        ).toBeTruthy();
    });
});
