"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

import { Eyebrow } from "@/components/Eyebrow";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { ClientServiceBlock as ClientServiceBlockProps } from "@/payload-types";
import { applyTypography } from "@/utilities/typography";

const messages = {
    cs: {
        pending: "Přihlašování…",
        unavailable:
            "Přihlášení do zákaznické zóny zatím není dostupné. Zkuste to prosím později.",
        error: "Přihlášení se nezdařilo. Zkuste to prosím znovu.",
    },
    en: {
        pending: "Signing in…",
        unavailable:
            "Client sign-in is not available yet. Please try again later.",
        error: "Sign-in failed. Please try again.",
    },
};

export const ClientServiceBlock = ({
    eyebrow,
    heading,
    description,
    loginLabel,
    loginPlaceholder,
    passwordLabel,
    passwordPlaceholder,
    submitButtonLabel,
    locale = defaultLocale,
}: ClientServiceBlockProps & { locale?: AppLocale }) => {
    const id = useId();
    const submitting = useRef(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>();
    const copy = messages[locale];

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting.current) return;

        const form = event.currentTarget;
        const data = new FormData(form);
        submitting.current = true;
        setIsSubmitting(true);
        setError(undefined);

        try {
            const response = await fetch("/api/client-service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    login: data.get("login"),
                    password: data.get("password"),
                }),
            });

            // The endpoint is a stub; it cannot establish an authenticated session yet.
            setError(response.status === 501 ? copy.unavailable : copy.error);
        } catch {
            setError(copy.error);
        } finally {
            const password = form.elements.namedItem("password");
            if (password instanceof HTMLInputElement) password.value = "";
            submitting.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <section
            aria-labelledby={`${id}-heading`}
            className="bg-ink-950 px-6 py-16 text-paper-0 md:pt-[74px] md:pb-20"
            data-theme="dark"
        >
            <div className="mx-auto max-w-[50rem] text-center">
                {eyebrow && (
                    <Eyebrow
                        align="center"
                        className="mb-5 text-[12px] leading-[18px] tracking-[1px]"
                        locale={locale}
                        tone="inverse"
                    >
                        {eyebrow}
                    </Eyebrow>
                )}
                <h2
                    className="text-4xl font-bold md:text-heading-xl"
                    id={`${id}-heading`}
                >
                    {applyTypography(heading, { locale })}
                </h2>
                {description && (
                    <p className="mx-auto mt-3 max-w-[590px] text-[15px] leading-[26px] whitespace-pre-line">
                        {applyTypography(description, { locale })}
                    </p>
                )}
            </div>
            <form
                aria-busy={isSubmitting}
                aria-labelledby={`${id}-heading`}
                className="mx-auto mt-10 max-w-[672px] rounded-[16px] border border-brand-500/10 bg-brand-500/5 p-6 md:mt-12 md:p-10"
                method="post"
                onSubmit={onSubmit}
                action="/api/client-service"
            >
                <fieldset
                    className="m-0 min-w-0 border-0 p-0"
                    disabled={isSubmitting}
                >
                    <div>
                        <label
                            className="mb-2 block text-xs leading-[18px] font-semibold uppercase"
                            htmlFor={`${id}-login`}
                        >
                            {applyTypography(loginLabel, { locale })}
                        </label>
                        <Input
                            autoComplete="username"
                            autoCapitalize="none"
                            className="h-[47px] rounded-[8px] border-brand-500/15 bg-brand-500/5 px-4 text-paper-0 placeholder:text-paper-0/50"
                            id={`${id}-login`}
                            name="login"
                            placeholder={loginPlaceholder ?? undefined}
                            required
                            spellCheck={false}
                            type="text"
                        />
                    </div>
                    <div className="mt-5">
                        <label
                            className="mb-2 block text-xs leading-[18px] font-semibold uppercase"
                            htmlFor={`${id}-password`}
                        >
                            {applyTypography(passwordLabel, { locale })}
                        </label>
                        <Input
                            autoComplete="current-password"
                            className="h-[47px] rounded-xs border-brand-500/15 bg-brand-500/5 px-4 text-paper-0 placeholder:text-paper-0/50"
                            id={`${id}-password`}
                            name="password"
                            placeholder={passwordPlaceholder ?? undefined}
                            required
                            type="password"
                        />
                    </div>
                    <Button
                        className="mt-[46px] min-h-[55px] w-full h-auto py-3 text-[15px] whitespace-normal"
                        type="submit"
                        typography={false}
                    >
                        {isSubmitting && (
                            <LoaderCircle
                                aria-hidden
                                className="animate-spin"
                            />
                        )}
                        {isSubmitting
                            ? copy.pending
                            : applyTypography(submitButtonLabel, { locale })}
                    </Button>
                </fieldset>
                {error && (
                    <Alert
                        className="mt-6 text-paper-0"
                        role="alert"
                        variant="destructive"
                    >
                        <AlertDescription>
                            {applyTypography(error, { locale })}
                        </AlertDescription>
                    </Alert>
                )}
            </form>
        </section>
    );
};
