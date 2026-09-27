"use client";
import { Header } from "@/payload-types";
import { RowLabelProps, useRowLabel } from "@payloadcms/ui";

export const RowLabel: React.FC<RowLabelProps> = () => {
    const data = useRowLabel<NonNullable<Header["navItems"]>[number]>();

    const title =
        data?.data?.itemType === "dropdown"
            ? data.data.label
            : data?.data?.link?.label;
    const label = title
        ? `Položka navigace ${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${title}`
        : "Řádek";

    return <div>{label}</div>;
};
