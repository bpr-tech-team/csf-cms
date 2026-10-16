export const branchMapPositions = {
    praha: { label: "Praha", x: 478, y: 295 },
    "hradec-kralove": { label: "Hradec Králové", x: 647, y: 253 },
    ostrava: { label: "Ostrava", x: 959, y: 317 },
    zlin: { label: "Zlín", x: 936, y: 469 },
    brno: { label: "Brno", x: 794, y: 483 },
} as const;

export type BranchMapPosition = keyof typeof branchMapPositions;

export const branchMapSize = { width: 1183, height: 680 } as const;

export const isBranchMapPosition = (
    value: string,
): value is BranchMapPosition => Object.hasOwn(branchMapPositions, value);
