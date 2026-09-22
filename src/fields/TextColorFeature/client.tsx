"use client";

import type {
    ToolbarGroup,
    ToolbarGroupItem,
} from "@payloadcms/richtext-lexical";
import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import {
    $getSelection,
    $isRangeSelection,
    type RangeSelection,
} from "@payloadcms/richtext-lexical/lexical";
import { $getSelectionStyleValueForProperty } from "@payloadcms/richtext-lexical/lexical/selection";
import { Popup } from "@payloadcms/ui";
import { useId, useRef, useState } from "react";
import { getTextColor, normalizeHexColor, textColorPalette } from "./colors";
import { applyTextColor } from "./selection";
import "./styles.css";

const ColorPicker: NonNullable<ToolbarGroupItem["Component"]> = ({
    editor,
    enabled,
}) => {
    const inputID = useId();
    const selectionRef = useRef<RangeSelection | null>(null);
    const [hex, setHex] = useState("#111111");
    const [error, setError] = useState(false);

    const rememberSelection = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            selectionRef.current = $isRangeSelection(selection)
                ? selection.clone()
                : null;
            if ($isRangeSelection(selection)) {
                const color = $getSelectionStyleValueForProperty(
                    selection,
                    "color",
                    "",
                );
                setHex(getTextColor(`color: ${color}`) ?? "#111111");
            }
        });
        setError(false);
    };

    const apply = (value: string | null, close: () => void) => {
        const color = value === null ? null : normalizeHexColor(value);
        if (value !== null && !color) {
            setError(true);
            return;
        }
        if (selectionRef.current)
            applyTextColor(editor, selectionRef.current, color);
        close();
    };

    return (
        <div
            onMouseDownCapture={(event) => {
                if (
                    (event.target as HTMLElement).closest(
                        ".popup__trigger-wrap",
                    )
                )
                    event.preventDefault();
            }}
        >
            <Popup
                button={
                    <span title="Barva textu">
                        <span
                            aria-hidden="true"
                            className="text-color-picker__icon"
                        >
                            A
                        </span>
                        <span className="text-color-picker__sr-only">
                            Barva textu
                        </span>
                    </span>
                }
                buttonClassName="toolbar-popup__button"
                disabled={enabled === false || !editor.isEditable()}
                noBackground
                onToggleOpen={rememberSelection}
                portalClassName="text-color-picker"
                showScrollbar
                render={({ close }) => (
                    <div
                        className="text-color-picker__panel"
                        aria-label="Barva textu"
                    >
                        <div className="text-color-picker__palette">
                            {textColorPalette.map(({ label, value }) => (
                                <button
                                    key={value}
                                    type="button"
                                    title={label}
                                    aria-label={label}
                                    style={{ backgroundColor: value }}
                                    onClick={() => apply(value, close)}
                                />
                            ))}
                        </div>
                        <label htmlFor={inputID}>Vlastní barva (HEX)</label>
                        <div className="text-color-picker__custom">
                            <input
                                aria-label="Vybrat vlastní barvu"
                                type="color"
                                value={normalizeHexColor(hex) ?? "#111111"}
                                onChange={(event) => {
                                    setHex(event.target.value);
                                    setError(false);
                                }}
                            />
                            <input
                                id={inputID}
                                type="text"
                                value={hex}
                                maxLength={7}
                                placeholder="#afcb08"
                                aria-invalid={error}
                                aria-describedby={
                                    error ? `${inputID}-error` : undefined
                                }
                                onChange={(event) => {
                                    setHex(event.target.value);
                                    setError(false);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        apply(hex, close);
                                    }
                                }}
                            />
                        </div>
                        {error && (
                            <p id={`${inputID}-error`} role="alert">
                                Zadejte HEX, například #afcb08 nebo #abc.
                            </p>
                        )}
                        <div className="text-color-picker__actions">
                            <button
                                type="button"
                                onClick={() => apply(null, close)}
                            >
                                Výchozí barva
                            </button>
                            <button
                                type="button"
                                onClick={() => apply(hex, close)}
                            >
                                Použít
                            </button>
                        </div>
                    </div>
                )}
                size="fit-content"
            />
        </div>
    );
};

const groups: ToolbarGroup[] = [
    {
        type: "buttons",
        key: "textColor",
        order: 30,
        items: [
            {
                key: "textColor",
                Component: ColorPicker,
                isEnabled: ({ selection }) => $isRangeSelection(selection),
            },
        ],
    },
];

export const TextColorFeatureClient = createClientFeature({
    toolbarFixed: { groups },
});
