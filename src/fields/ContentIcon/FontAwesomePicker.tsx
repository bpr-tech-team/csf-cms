"use client";

import {
    FieldError,
    FieldLabel,
    useField,
    useTranslation,
} from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { useId, useRef, useState } from "react";
import { ContentIcon } from "@/components/ContentIcon";
import type { IconCatalogEntry } from "@/utilities/contentIcon";
import "./styles.css";

const pageSize = 60;

export const FontAwesomePicker: TextFieldClientComponent = ({
    field,
    path,
    readOnly,
}) => {
    const { value, setValue, showError, errorMessage, disabled } =
        useField<string>({ path });
    const { i18n } = useTranslation();
    const cs = i18n.language === "cs";
    const styleLabels = {
        solid: cs ? "Plné" : "solid",
        regular: cs ? "Obrysové" : "regular",
        brands: cs ? "Značky" : "brands",
    };
    const id = useId();
    const dialog = useRef<HTMLDialogElement>(null);
    const [catalog, setCatalog] = useState<IconCatalogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState("");
    const [style, setStyle] = useState("all");
    const [page, setPage] = useState(0);
    const locked = readOnly || disabled;
    const terms = query.trim().toLowerCase().replaceAll("-", " ").split(/\s+/);
    const matches = catalog.filter(
        (icon) =>
            (style === "all" || icon.style === style) &&
            terms.every((term) => icon.search.includes(term)),
    );
    const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
    const currentPage = Math.min(page, pageCount - 1);

    const open = async () => {
        dialog.current?.showModal();
        if (catalog.length || loading) return;
        setLoading(true);
        setError(false);
        try {
            const response = await fetch("/api/content-icons");
            if (!response.ok) throw new Error("Catalog unavailable");
            setCatalog(await response.json());
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="field-type content-icon-picker">
            <FieldLabel
                htmlFor={id}
                label={field.label}
                required={field.required}
                path={path}
            />
            <FieldError
                path={path}
                showError={showError}
                message={errorMessage}
            />
            <div className="content-icon-picker__selection">
                {value && (
                    <ContentIcon
                        icon={{ source: "fontawesome", fontAwesome: value }}
                        style={{ width: 32, height: 32 }}
                    />
                )}
                <span>
                    {value || (cs ? "Žádná ikona" : "No icon selected")}
                </span>
                <button
                    id={id}
                    type="button"
                    disabled={locked}
                    aria-haspopup="dialog"
                    onClick={open}
                >
                    {cs ? "Vybrat ikonu" : "Choose icon"}
                </button>
                {value && (
                    <button
                        type="button"
                        disabled={locked}
                        onClick={() => setValue(null)}
                    >
                        {cs ? "Odebrat" : "Remove"}
                    </button>
                )}
            </div>
            <dialog
                ref={dialog}
                className="content-icon-picker__dialog"
                aria-labelledby={`${id}-title`}
            >
                <div className="content-icon-picker__toolbar">
                    <h2 id={`${id}-title`}>Font Awesome Free</h2>
                    <button
                        type="button"
                        onClick={() => dialog.current?.close()}
                    >
                        {cs ? "Zavřít" : "Close"}
                    </button>
                </div>
                <div className="content-icon-picker__filters">
                    <label>
                        {cs
                            ? "Hledat podle anglického názvu"
                            : "Search by English name"}
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(0);
                            }}
                        />
                    </label>
                    <label>
                        {cs ? "Styl" : "Style"}
                        <select
                            value={style}
                            onChange={(event) => {
                                setStyle(event.target.value);
                                setPage(0);
                            }}
                        >
                            <option value="all">
                                {cs ? "Všechny styly" : "All styles"}
                            </option>
                            <option value="solid">
                                {cs ? "Plné" : "Solid"}
                            </option>
                            <option value="regular">
                                {cs ? "Obrysové" : "Regular"}
                            </option>
                            <option value="brands">
                                {cs ? "Značky" : "Brands"}
                            </option>
                        </select>
                    </label>
                </div>
                <p role="status">
                    {loading
                        ? cs
                            ? "Načítání ikon…"
                            : "Loading icons…"
                        : error
                          ? cs
                              ? "Ikony se nepodařilo načíst."
                              : "Could not load icons."
                          : `${matches.length} ${cs ? "ikon" : "icons"}`}
                </p>
                {error && (
                    <button type="button" onClick={open}>
                        {cs ? "Zkusit znovu" : "Retry"}
                    </button>
                )}
                <div className="content-icon-picker__grid">
                    {matches
                        .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize,
                        )
                        .map((icon) => (
                            <button
                                type="button"
                                key={icon.id}
                                disabled={locked}
                                aria-pressed={value === icon.id}
                                aria-label={`${icon.name} (${styleLabels[icon.style]})`}
                                onClick={() => {
                                    setValue(icon.id);
                                    dialog.current?.close();
                                }}
                            >
                                <ContentIcon
                                    icon={{
                                        source: "fontawesome",
                                        fontAwesome: icon.id,
                                    }}
                                    style={{ width: 28, height: 28 }}
                                />
                                <span>{icon.name}</span>
                                <small>{styleLabels[icon.style]}</small>
                            </button>
                        ))}
                </div>
                <div className="content-icon-picker__toolbar">
                    <button
                        type="button"
                        disabled={currentPage === 0}
                        onClick={() => setPage(currentPage - 1)}
                    >
                        {cs ? "Předchozí" : "Previous"}
                    </button>
                    <span>
                        {currentPage + 1} / {pageCount}
                    </span>
                    <button
                        type="button"
                        disabled={currentPage + 1 >= pageCount}
                        onClick={() => setPage(currentPage + 1)}
                    >
                        {cs ? "Další" : "Next"}
                    </button>
                </div>
                <small>
                    <a
                        href="https://fontawesome.com/license/free"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Font Awesome Free · Fonticons, Inc. · CC BY 4.0
                    </a>
                </small>
            </dialog>
        </div>
    );
};
