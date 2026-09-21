import type { ReactNode } from "react";

import { HeroBackground } from "@/components/HeroBackground";
import type { Media } from "@/payload-types";
import { cn } from "@/utilities/ui";

type HeroSectionProps = {
    backgroundMedia?: Media | number | null;
    children: ReactNode;
    isPageIntro?: boolean;
    label?: string;
    onAutoplayChange?: (running: boolean) => void;
};

export const HeroSection = ({
    backgroundMedia,
    children,
    isPageIntro = false,
    label,
    onAutoplayChange,
}: HeroSectionProps) => (
    <section
        aria-label={label}
        className={cn(
            "relative isolate min-h-120 overflow-hidden bg-ink-900 py-20 text-paper-0 md:py-24",
            isPageIntro && "-mt-42 pt-58 md:pt-72",
        )}
        data-theme="dark"
    >
        <HeroBackground
            isPageIntro={isPageIntro}
            onAutoplayChange={onAutoplayChange}
            resource={backgroundMedia}
        />
        <div className="container relative z-10">{children}</div>
    </section>
);
