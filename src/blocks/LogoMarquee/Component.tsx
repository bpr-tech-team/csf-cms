import { defaultLocale, type AppLocale } from "@/i18n/config";
import type { CSSProperties } from "react";
import type { LogoMarqueeBlock as LogoMarqueeBlockProps } from "@/payload-types";

import { MediaAsset } from "@/components/MediaAsset";
import { Eyebrow } from "@/components/Eyebrow";
import { cn } from "@/utilities/ui";
import React from "react";

import styles from "./styles.module.css";

type LogoItem = LogoMarqueeBlockProps["items"][number];

export const LogoMarqueeBlock = ({
    locale = defaultLocale,
    duration,
    eyebrow,
    items,
    pauseOnHover,
}: LogoMarqueeBlockProps & { locale?: AppLocale }) => {
    const animationStyle = {
        "--homepage-marquee-duration": `${duration ?? 40}s`,
    } as CSSProperties;

    return (
        <section
            aria-label={eyebrow}
            className="overflow-hidden border-b border-brand-500 bg-ink-950 py-9 text-paper-0"
            data-theme="dark"
        >
            <Eyebrow
                locale={locale}
                align="center"
                className="mb-9"
                tone="brand"
            >
                {eyebrow}
            </Eyebrow>
            <div className="relative overflow-hidden">
                <div
                    className={cn(
                        styles.marquee,
                        "flex w-max items-center",
                        pauseOnHover && "hover:[animation-play-state:paused]",
                    )}
                    style={animationStyle}
                >
                    <LogoGroup items={items} />
                    <LogoGroup ariaHidden items={items} />
                </div>
            </div>
        </section>
    );
};

const LogoGroup = ({
    ariaHidden = false,
    items,
}: {
    ariaHidden?: boolean;
    items: LogoItem[];
}) => {
    return (
        <div
            aria-hidden={ariaHidden || undefined}
            className="flex shrink-0 items-center gap-12 pr-12 md:gap-20 md:pr-20"
        >
            {items.map((item, index) => {
                const logo = (
                    <MediaAsset
                        alt={ariaHidden ? "" : item.name}
                        className="h-10 w-32 object-contain md:w-40"
                        resource={item.logo}
                    />
                );

                return item.url && !ariaHidden ? (
                    <a
                        aria-label={item.name}
                        className="flex h-12 w-40 items-center justify-center opacity-90 transition-opacity hover:opacity-100 md:w-44"
                        href={item.url}
                        key={item.id ?? index}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {logo}
                    </a>
                ) : (
                    <span
                        className="flex h-12 w-40 items-center justify-center opacity-90 md:w-44"
                        key={item.id ?? index}
                    >
                        {logo}
                    </span>
                );
            })}
        </div>
    );
};
