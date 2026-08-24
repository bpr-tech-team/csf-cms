import React from "react";

import "@/app/(frontend)/globals.css";
import {
    FrontendShell,
    getFrontendMetadata,
} from "@/app/(frontend)/FrontendShell";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <FrontendShell locale="en">{children}</FrontendShell>;
}

export const metadata = getFrontendMetadata("en");
