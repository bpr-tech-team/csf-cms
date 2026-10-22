import Image from "next/image";

import type { Media } from "@/payload-types";
import { getImageMediaUrl } from "@/utilities/getImageMediaUrl";
import { isImageMedia } from "@/utilities/isImageMedia";

import { HeroParticles } from "./HeroParticles";
import styles from "./styles.module.css";

type HeroBackgroundProps = {
    isPageIntro?: boolean;
    onAutoplayChange?: (running: boolean) => void;
    resource?: Media | number | null;
};

export const HeroBackground = ({
    isPageIntro = false,
    onAutoplayChange,
    resource,
}: HeroBackgroundProps) => {
    const image = isImageMedia(resource) ? resource : null;

    return (
        <>
            <div aria-hidden className={styles.background}>
                {image && (
                    <Image
                        alt=""
                        className={styles.image}
                        data-hero-image={isPageIntro ? "" : undefined}
                        fetchPriority={isPageIntro ? "high" : undefined}
                        fill
                        loading={isPageIntro ? "eager" : "lazy"}
                        quality={65}
                        sizes="100vw"
                        src={getImageMediaUrl(image)}
                    />
                )}
            </div>
            <HeroParticles onAutoplayChange={onAutoplayChange} />
        </>
    );
};
