"use client";

import type { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useSyncExternalStore } from "react";

export const useSelectedSlide = (
    api: UseEmblaCarouselType[1],
    initialIndex = 0,
) => {
    const subscribe = useCallback(
        (onChange: () => void) => {
            api?.on("select", onChange).on("reInit", onChange);
            return () => {
                api?.off("select", onChange).off("reInit", onChange);
            };
        },
        [api],
    );
    const getSelectedSlide = useCallback(
        () => api?.selectedScrollSnap() ?? initialIndex,
        [api, initialIndex],
    );
    const getInitialSlide = useCallback(() => initialIndex, [initialIndex]);
    return useSyncExternalStore(subscribe, getSelectedSlide, getInitialSlide);
};
