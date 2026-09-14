import Image from "next/image";

import type { Media } from "@/payload-types";
import { getMediaUrl } from "@/utilities/getMediaUrl";

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
    const image =
        resource &&
        typeof resource === "object" &&
        resource.url &&
        resource.mimeType?.startsWith("image/")
            ? resource
            : null;

    return (
        <>
            <div aria-hidden className={styles.background}>
                {image && (
                    <Image
                        alt=""
                        className={styles.image}
                        fetchPriority={isPageIntro ? "high" : undefined}
                        fill
                        loading={isPageIntro ? "eager" : "lazy"}
                        quality={75}
                        sizes="100vw"
                        src={getMediaUrl(image.url, image.updatedAt)}
                    />
                )}
            </div>
            <HeroParticles onAutoplayChange={onAutoplayChange} />
        </>
    );
};
