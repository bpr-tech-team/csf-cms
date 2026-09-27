import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { applyTypography } from "@/utilities/typography";

export default function NotFound() {
    return (
        <main className="flex-1 bg-ink-900 text-paper-0" data-theme="dark">
            <div className="container py-28">
                <div className="prose prose-invert max-w-none">
                    <h1 style={{ marginBottom: 0 }}>404</h1>
                    <p className="mb-4">Tato stránka nebyla nalezena.</p>
                </div>
                <Button asChild variant="default">
                    <Link href="/">{applyTypography("Zpět na úvod")}</Link>
                </Button>
            </div>
        </main>
    );
}
