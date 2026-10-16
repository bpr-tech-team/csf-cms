"use client";

import { useRowLabel } from "@payloadcms/ui";
import type { ContactDetails } from "@/payload-types";

export function RowLabel() {
    const { data, rowNumber } =
        useRowLabel<NonNullable<ContactDetails["socialLinks"]>[number]>();
    return <span>{data.label || `Odkaz ${(rowNumber ?? 0) + 1}`}</span>;
}
