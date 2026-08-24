"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale, withLocalePrefix } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import React, { useState, useEffect } from "react";
import { useDebounce } from "@/utilities/useDebounce";
import { useRouter } from "next/navigation";

export const Search: React.FC<{
    locale?: AppLocale;
}> = ({ locale = defaultLocale }) => {
    const [value, setValue] = useState("");
    const router = useRouter();
    const messages = frontendMessages[locale];

    const debouncedValue = useDebounce(value);

    useEffect(() => {
        const searchParams = debouncedValue
            ? `?q=${encodeURIComponent(debouncedValue)}`
            : "";

        router.push(withLocalePrefix(`/search${searchParams}`, locale));
    }, [debouncedValue, locale, router]);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Label htmlFor="search" className="sr-only">
                    {messages.searchLabel}
                </Label>
                <Input
                    id="search"
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    placeholder={messages.searchPlaceholder}
                />
                <button type="submit" className="sr-only">
                    {messages.searchSubmit}
                </button>
            </form>
        </div>
    );
};
