import { diffArrays } from "diff";

import { applyTypography, type TypographyOptions } from "./typography";

/** Keep formatting boundaries when Typopo inserts, replaces or removes characters. */
export function applyTypographyToSegments(
    segments: readonly string[],
    options?: TypographyOptions,
): string[] {
    const original = segments.join("");
    const formatted = applyTypography(original, options);
    if (original === formatted) return [...segments];
    if (segments.length === 1) return [formatted];

    // Compare Unicode code points; retain each character’s original node.
    const owners = segments.flatMap((segment, index) =>
        Array<number>(Array.from(segment).length).fill(index),
    );
    const result = segments.map(() => "");
    let offset = 0;
    let replacementOwner: number | undefined;
    for (const change of diffArrays(
        Array.from(original),
        Array.from(formatted),
        {
            comparator: (before, after) =>
                alignmentKey(before) === alignmentKey(after),
        },
    )) {
        if (change.removed) {
            replacementOwner = owners[offset];
            offset += change.value.length;
        } else if (change.added) {
            // A replacement belongs to the first replaced character's node.
            const owner =
                replacementOwner ?? owners[Math.min(offset, owners.length - 1)];
            result[owner] += change.value.join("");
            replacementOwner = undefined;
        } else {
            replacementOwner = undefined;
            for (const character of change.value) {
                result[owners[offset]] += character;
                offset++;
            }
        }
    }
    return result;
}

// Equivalence is only for mapping formatting boundaries, never for generating text.
// NFKC aligns ordinary/NBSP spaces; quote shapes and case changes stay in their nodes.
const alignmentKey = (character: string) =>
    character
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[“”„«»]/g, '"')
        .replace(/[‘’‚]/g, "'");
