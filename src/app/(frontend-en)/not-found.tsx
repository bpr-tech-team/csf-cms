import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex-1 bg-ink-900 text-paper-0" data-theme="dark">
            <div className="container py-28">
                <div className="prose prose-invert max-w-none">
                    <h1 style={{ marginBottom: 0 }}>404</h1>
                    <p className="mb-4">This page could not be found.</p>
                </div>
                <Button asChild variant="default">
                    <Link href="/en">Go home</Link>
                </Button>
            </div>
        </main>
    );
}
