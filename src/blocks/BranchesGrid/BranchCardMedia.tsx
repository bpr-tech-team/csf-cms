"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { useId, useState, type ReactNode } from "react";

import type { AppLocale } from "@/i18n/config";
import { branchLabels } from "@/utilities/branchData";

const toggleClassName =
    "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-paper-0 hover:bg-white/15 aria-pressed:bg-brand-500 aria-pressed:text-ink-950 aria-pressed:hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-paper-0";

export function BranchCardMedia({
    branchName,
    fallback,
    locale,
    mapUrl,
    photo,
}: {
    branchName: string;
    fallback?: ReactNode;
    locale: AppLocale;
    mapUrl?: string;
    photo?: ReactNode;
}) {
    const [showMap, setShowMap] = useState(false);
    const panelId = useId();
    const labels = branchLabels[locale];
    const mapVisible = Boolean(mapUrl && showMap);

    return (
        <div
            className="relative aspect-video overflow-hidden bg-border-light"
            data-branch-card-media
        >
            {mapUrl && (
                <div
                    aria-label={`${labels.mediaPreview} – ${branchName}`}
                    className="absolute bottom-3 left-3 z-10 flex gap-1 rounded-full bg-ink-950/85 p-1 backdrop-blur-sm"
                    role="group"
                >
                    {photo && (
                        <button
                            aria-controls={panelId}
                            aria-pressed={!mapVisible}
                            className={toggleClassName}
                            onClick={() => setShowMap(false)}
                            type="button"
                        >
                            <Image
                                alt=""
                                className="shrink-0"
                                height={14}
                                src={
                                    mapVisible
                                        ? "/icons/branches/photo-inactive.svg"
                                        : "/icons/branches/photo-active.svg"
                                }
                                unoptimized
                                width={14}
                            />
                            {labels.photo}
                        </button>
                    )}
                    <button
                        aria-controls={panelId}
                        aria-pressed={mapVisible}
                        className={toggleClassName}
                        onClick={() => setShowMap(photo ? true : !mapVisible)}
                        type="button"
                    >
                        <MapPin aria-hidden="true" className="size-3.5" />
                        {labels.mapToggle}
                    </button>
                </div>
            )}
            <div className="absolute inset-0" id={panelId}>
                {mapUrl && mapVisible ? (
                    <iframe
                        allowFullScreen
                        className="absolute inset-0 size-full border-0"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={mapUrl}
                        title={`${labels.map} – ${branchName}`}
                    />
                ) : (
                    photo || fallback
                )}
            </div>
        </div>
    );
}
