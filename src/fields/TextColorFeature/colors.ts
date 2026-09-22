export const textColorPalette = [
    { label: "Zelená CSF", value: "#afcb08" },
    { label: "Černá", value: "#111111" },
    { label: "Šedá", value: "#5f605b" },
    { label: "Bílá", value: "#ffffff" },
    { label: "Červená", value: "#dc2626" },
    { label: "Oranžová", value: "#ea580c" },
    { label: "Žlutá", value: "#ca8a04" },
    { label: "Zelená", value: "#15803d" },
    { label: "Modrá", value: "#2563eb" },
    { label: "Fialová", value: "#9333ea" },
    { label: "Růžová", value: "#db2777" },
];

export function normalizeHexColor(value: string): string | null {
    const hex = value.trim().replace(/^#/, "");
    if (/^[\da-f]{3}$/i.test(hex)) {
        return `#${[...hex]
            .map((char) => char + char)
            .join("")
            .toLowerCase()}`;
    }
    return /^[\da-f]{6}$/i.test(hex) ? `#${hex.toLowerCase()}` : null;
}

// Read only a valid text color; never forward arbitrary editor CSS to the site.
export function getTextColor(style?: string | null): string | null {
    const value = style?.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)?.[1]?.trim();
    if (!value) return null;
    const hex = normalizeHexColor(value);
    if (hex) return hex;
    // Browsers may normalize a pasted/copied HEX color to rgb().
    const rgb = value.match(
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
    );
    if (!rgb) return null;
    const channels = rgb.slice(1).map(Number);
    if (channels.some((channel) => channel > 255)) return null;
    return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}
