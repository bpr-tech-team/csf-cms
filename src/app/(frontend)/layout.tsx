import React from "react";

import "./globals.css";
import { FrontendShell, getFrontendMetadata } from "./FrontendShell";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <FrontendShell locale="cs">{children}</FrontendShell>;
}

export const metadata = getFrontendMetadata("cs");
