"use client";

import { useFormFields, useTranslation } from "@payloadcms/ui";
import type { UIFieldClientComponent } from "payload";
import { useEffect, useState } from "react";
import { ContentIcon } from "@/components/ContentIcon";
import type { Media } from "@/payload-types";
import type { ContentIconValue } from "@/utilities/contentIcon";
import "./styles.css";

export const IconPreview: UIFieldClientComponent = ({ path }) => {
    const base = path.slice(0, path.lastIndexOf("."));
    const source = useFormFields(
        ([fields]) => fields[`${base}.source`]?.value,
    ) as ContentIconValue["source"];
    const image = useFormFields(
        ([fields]) => fields[`${base}.image`]?.value,
    ) as ContentIconValue["image"];
    const fontAwesome = useFormFields(
        ([fields]) => fields[`${base}.fontAwesome`]?.value,
    ) as string;
    const imageColor = useFormFields(
        ([fields]) => fields[`${base}.imageColor`]?.value,
    ) as ContentIconValue["imageColor"];
    const scale = useFormFields(
        ([fields]) => fields[`${base}.scale`]?.value,
    ) as number;
    const [loaded, setLoaded] = useState<Media | null>(null);
    const { i18n } = useTranslation();
    const cs = i18n.language === "cs";

    useEffect(() => {
        if (source !== "image" || typeof image !== "number") return;
        const controller = new AbortController();
        fetch(`/api/media/${image}?depth=0`, { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : null))
            .then((media) => {
                if (!controller.signal.aborted) setLoaded(media);
            })
            .catch(() => {
                /* The upload field displays missing media errors. */
            });
        return () => controller.abort();
    }, [source, image]);

    const media =
        typeof image === "object"
            ? image
            : loaded?.id === image
              ? loaded
              : null;
    const icon = { source, image: media, fontAwesome, imageColor, scale };
    return (
        <div className="content-icon-preview">
            <span>{cs ? "Náhled" : "Preview"}</span>
            <div className="content-icon-preview__samples">
                <div>
                    <div className="content-icon-preview__card">
                        <ContentIcon
                            icon={icon}
                            style={{ width: 32, height: 32 }}
                        />
                    </div>
                    <small>{cs ? "Karta · 32 px" : "Card · 32 px"}</small>
                </div>
                <div>
                    <div className="content-icon-preview__hero">
                        <ContentIcon
                            icon={icon}
                            style={{ width: 44, height: 44 }}
                        />
                    </div>
                    <small>{cs ? "Úvodní blok · 44 px" : "Hero · 44 px"}</small>
                </div>
            </div>
        </div>
    );
};
