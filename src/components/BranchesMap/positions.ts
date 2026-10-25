export const branchMapPositions = {
    praha: { label: "Praha", x: 424.53, y: 277.47 },
    "hradec-kralove": { label: "Hradec Králové", x: 653.67, y: 234.56 },
    ostrava: { label: "Ostrava", x: 1073.29, y: 339.59 },
    zlin: { label: "Zlín", x: 973.45, y: 501.84 },
    brno: { label: "Brno", x: 805.31, y: 511.28 },
} as const;

export type BranchMapPosition = keyof typeof branchMapPositions;

export const branchMapSize = { width: 1183, height: 680 } as const;

export const isBranchMapPosition = (
    value: string,
): value is BranchMapPosition => Object.hasOwn(branchMapPositions, value);
