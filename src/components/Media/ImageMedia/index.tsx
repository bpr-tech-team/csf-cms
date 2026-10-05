"use client";

import type { StaticImageData } from "next/image";

import { cn } from "@/utilities/ui";
import NextImage from "next/image";
import React from "react";

import type { Props as MediaProps } from "../types";

import { cssVariables } from "@/cssVariables";
import { getMediaUrl } from "@/utilities/getMediaUrl";

const { breakpoints } = cssVariables;

// Solid neutral background with a brand tint shown while the image is loading.
const placeholderBackground =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23E9ECD9'/%3E%3C/svg%3E";

/**
 * ImageMedia
 *
 * This component passes a **relative** `src` (e.g. `/media/...`) to Next.js Image.
 * The `getMediaUrl` utility constructs the full URL by prepending the base URL from env vars
 * (NEXT_PUBLIC_SERVER_URL). Next.js then optimizes this using `remotePatterns` configured
 * in next.config.js — no custom `loader` needed.
 *
 * Flow:
 *   1. Resource URL from Payload: `/media/image-123.jpg`
 *   2. getMediaUrl() adds base URL: `https://yourdomain.com/media/image-123.jpg`
 *   3. Next.js Image optimizes via remotePatterns: `/_next/image?url=...&w=1200&q=75`
 *
 * If your storage/plugin returns **external CDN URLs** (e.g. `https://cdn.example.com/...`),
 * choose ONE of the following:
 *   A) Allow the remote host in next.config.js:
 *      images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }] }
 *   B) Provide a **custom loader** for CDN-specific transforms:
 *      const imageLoader: ImageLoader = ({ src, width, quality }) =>
 *        `https://cdn.example.com${src}?w=${width}&q=${quality ?? 75}`
 *      <Image loader={imageLoader} src="/media/hero.jpg" width={1200} height={600} alt="" />
 *   C) Skip optimization:
 *      <Image unoptimized src="https://cdn.example.com/hero.jpg" width={1200} height={600} alt="" />
 *
 * TL;DR: Template uses relative URLs + getMediaUrl() to construct full URLs, then relies on
 * remotePatterns for optimization. Only add `loader` if using external CDNs with custom transforms.
 */

export const ImageMedia: React.FC<MediaProps> = (props) => {
    const {
        alt: altFromProps,
        fill,
        pictureClassName,
        imgClassName,
        priority,
        resource,
        size: sizeFromProps,
        src: srcFromProps,
        loading: loadingFromProps,
    } = props;

    let width: number | undefined;
    let height: number | undefined;
    let alt = altFromProps;
    let src: StaticImageData | string = srcFromProps || "";

    if (!src && resource && typeof resource === "object") {
        const {
            alt: altFromResource,
            height: fullHeight,
            url,
            width: fullWidth,
        } = resource;

        width = fullWidth!;
        height = fullHeight!;
        alt = altFromProps || altFromResource || "";

        const cacheTag = resource.updatedAt;

        src = getMediaUrl(url, cacheTag);
    }

    const loading = loadingFromProps || (!priority ? "lazy" : undefined);

    // NOTE: this is used by the browser to determine which image to download at different screen sizes
    const sizes = sizeFromProps
        ? sizeFromProps
        : Object.entries(breakpoints)
              .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
              .join(", ");

    return (
        <picture className={cn(pictureClassName)}>
            <NextImage
                alt={alt || ""}
                className={cn(imgClassName)}
                fill={fill}
                height={!fill ? height : undefined}
                placeholder={placeholderBackground}
                priority={priority}
                quality={100}
                loading={loading}
                sizes={sizes}
                src={src}
                width={!fill ? width : undefined}
            />
        </picture>
    );
};
