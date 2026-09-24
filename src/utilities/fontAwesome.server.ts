// Only import this registry from server routes and Payload configuration.
// Frontend components use URLs so no icon pack enters their JavaScript bundle.
import { fas, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import type { IconCatalogEntry, IconStyle } from "./contentIcon";

const icons = new Map<string, IconDefinition>();
const packs: [IconStyle, Record<string, IconDefinition>][] = [
    ["solid", fas],
    ["regular", far],
    ["brands", fab],
];

for (const [style, pack] of packs) {
    for (const icon of Object.values(pack)) {
        icons.set(`${style}/${icon.iconName}`, icon);
    }
}

export const hasFontAwesomeIcon = (id: string) => icons.has(id);

export const iconCatalog: IconCatalogEntry[] = Array.from(
    icons,
    ([id, icon]) => ({
        id,
        name: icon.iconName.replaceAll("-", " "),
        style: id.split("/")[0] as IconStyle,
        search: [
            icon.iconName,
            ...icon.icon[2].filter((alias) => typeof alias === "string"),
        ]
            .join(" ")
            .replaceAll("-", " "),
    }),
).sort(
    (a, b) => a.name.localeCompare(b.name) || a.style.localeCompare(b.style),
);

export const fontAwesomeSVG = (id: string): string | null => {
    const definition = icons.get(id);
    if (!definition) return null;
    const [width, height, , , paths] = definition.icon;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="currentColor"><!-- Font Awesome Free by Fonticons, Inc. https://fontawesome.com | License: https://fontawesome.com/license/free (CC BY 4.0) -->${(Array.isArray(paths) ? paths : [paths]).map((path) => `<path d="${path}"/>`).join("")}</svg>`;
};
