import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useState } from "react";
import { FontAwesomePicker } from "./FontAwesomePicker";
import type { TextFieldClientProps } from "payload";

const setValue = vi.hoisted(() => vi.fn());
vi.mock("@payloadcms/ui", () => ({
    FieldLabel: () => null,
    FieldError: () => null,
    useTranslation: () => ({ i18n: { language: "en" } }),
    useField: () => {
        const [value, set] = useState<string | null>(null);
        return {
            value,
            setValue: (next: string | null) => {
                set(next);
                setValue(next);
            },
            disabled: false,
        };
    },
}));
const props = {
    path: "layout.0.items.0.icon.fontAwesome",
    field: { name: "fontAwesome", label: "Icon", type: "text" },
} as TextFieldClientProps;
const catalog = [
    { id: "solid/cloud", name: "cloud", style: "solid", search: "cloud" },
    {
        id: "regular/heart",
        name: "heart",
        style: "regular",
        search: "heart love",
    },
];

beforeEach(() => {
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
        configurable: true,
        value: function (this: HTMLDialogElement) {
            this.setAttribute("open", "");
        },
    });
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
        configurable: true,
        value: function (this: HTMLDialogElement) {
            this.removeAttribute("open");
        },
    });
    vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({ ok: true, json: async () => catalog }),
    );
});
afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    setValue.mockClear();
});

describe("Font Awesome picker", () => {
    test("loads on demand, filters by alias and style, and saves the selected ID", async () => {
        render(<FontAwesomePicker {...props} />);
        expect(fetch).not.toHaveBeenCalled();
        fireEvent.click(screen.getByRole("button", { name: "Choose icon" }));
        await screen.findByRole("button", { name: "cloud (solid)" });
        fireEvent.change(screen.getByRole("searchbox"), {
            target: { value: "love" },
        });
        expect(
            screen.queryByRole("button", { name: "cloud (solid)" }),
        ).toBeNull();
        fireEvent.change(screen.getByLabelText("Style"), {
            target: { value: "solid" },
        });
        expect(
            screen.queryByRole("button", { name: "heart (regular)" }),
        ).toBeNull();
        fireEvent.change(screen.getByLabelText("Style"), {
            target: { value: "regular" },
        });
        fireEvent.click(
            screen.getByRole("button", { name: "heart (regular)" }),
        );
        expect(setValue).toHaveBeenLastCalledWith("regular/heart");
        expect(screen.queryByRole("dialog")).toBeNull();
        fireEvent.click(screen.getByRole("button", { name: "Remove" }));
        expect(setValue).toHaveBeenLastCalledWith(null);
    });

    test("shows a retry action after a failed request", async () => {
        vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));
        render(<FontAwesomePicker {...props} />);
        fireEvent.click(screen.getByRole("button", { name: "Choose icon" }));
        fireEvent.click(await screen.findByRole("button", { name: "Retry" }));
        await screen.findByRole("button", { name: "cloud (solid)" });
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    test("read-only fields cannot open the selector", () => {
        render(<FontAwesomePicker {...props} readOnly />);
        expect(
            (
                screen.getByRole("button", {
                    name: "Choose icon",
                }) as HTMLButtonElement
            ).disabled,
        ).toBe(true);
    });

    test("paginates large result sets", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: true,
            json: async () =>
                Array.from({ length: 61 }, (_, index) => ({
                    id: `solid/icon-${index}`,
                    name: `icon ${index}`,
                    style: "solid",
                    search: `icon ${index}`,
                })),
        } as Response);
        render(<FontAwesomePicker {...props} />);
        fireEvent.click(screen.getByRole("button", { name: "Choose icon" }));
        await screen.findByRole("button", { name: "icon 0 (solid)" });
        expect(
            screen.queryByRole("button", { name: "icon 60 (solid)" }),
        ).toBeNull();
        fireEvent.click(screen.getByRole("button", { name: "Next" }));
        await waitFor(() =>
            expect(
                screen.getByRole("button", { name: "icon 60 (solid)" }),
            ).toBeDefined(),
        );
    });
});
