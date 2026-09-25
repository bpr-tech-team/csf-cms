import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ClientServiceBlock } from "./Component";
import { clientServiceDefaults } from "./defaults";

const block = { blockType: "clientService" as const, ...clientServiceDefaults };

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
});

describe("Client service sign-in", () => {
    it("submits to the dedicated endpoint, prevents duplicate requests and clears the password", async () => {
        let finish!: (response: { status: number }) => void;
        const fetch = vi.fn(
            () =>
                new Promise((resolve) => {
                    finish = resolve;
                }),
        );
        vi.stubGlobal("fetch", fetch);
        render(<ClientServiceBlock {...block} />);

        const login = screen.getByLabelText("Login") as HTMLInputElement;
        const password = screen.getByLabelText("Heslo") as HTMLInputElement;
        expect(password.type).toBe("password");
        expect(password.required).toBe(true);
        expect(login.required).toBe(true);
        fireEvent.change(login, { target: { value: "demo-client" } });
        fireEvent.change(password, { target: { value: "demo-password" } });
        const form = screen.getByRole("form", { name: "Přihlášení" });
        fireEvent.submit(form);
        fireEvent.submit(form);

        expect(fetch).toHaveBeenCalledOnce();
        expect(fetch.mock.calls[0]).toEqual([
            "/api/client-service",
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({
                    login: "demo-client",
                    password: "demo-password",
                }),
            }),
        ]);
        expect(form.getAttribute("aria-busy")).toBe("true");
        finish({ status: 501 });
        await waitFor(() =>
            expect(screen.getByRole("alert").textContent).toContain(
                "zatím není dostupné",
            ),
        );
        expect(password.value).toBe("");
        expect(login.value).toBe("demo-client");
        expect(form.getAttribute("aria-busy")).toBe("false");
        expect(
            (form.querySelector("fieldset") as HTMLFieldSetElement).disabled,
        ).toBe(false);
    });

    it("recovers from a network error and lets the visitor retry", async () => {
        const fetch = vi
            .fn()
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValue({ status: 501 });
        vi.stubGlobal("fetch", fetch);
        render(<ClientServiceBlock {...block} locale="en" />);
        const form = screen.getByRole("form", { name: "Přihlášení" });
        const login = screen.getByLabelText("Login");
        const password = screen.getByLabelText("Heslo");
        fireEvent.change(login, { target: { value: "demo-client" } });
        fireEvent.change(password, { target: { value: "demo-password" } });
        fireEvent.submit(form);
        await waitFor(() =>
            expect(screen.getByRole("alert").textContent).toContain(
                "Sign-in failed",
            ),
        );
        fireEvent.change(password, { target: { value: "retry-password" } });
        fireEvent.submit(form);
        await waitFor(() =>
            expect(screen.getByRole("alert").textContent).toContain(
                "not available yet",
            ),
        );
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("keeps labels associated with their own inputs when reused on one page", () => {
        render(
            <>
                <ClientServiceBlock {...block} />
                <ClientServiceBlock {...block} />
            </>,
        );
        const inputs = screen.getAllByLabelText("Heslo");
        expect(inputs).toHaveLength(2);
        expect(inputs[0].id).not.toBe(inputs[1].id);
    });
});
