import React from "react";

import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";

import RichText from "@/components/RichText";

type LowImpactHeroType =
    | {
          children?: React.ReactNode;
          locale?: AppLocale;
          richText?: never;
      }
    | (Omit<Page["hero"], "richText"> & {
          children?: never;
          locale?: AppLocale;
          richText?: Page["hero"]["richText"];
      });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
    children,
    richText,
}) => {
    return (
        <div className="container mt-16">
            <div className="max-w-3xl">
                {children ||
                    (richText && (
                        <RichText data={richText} enableGutter={false} />
                    ))}
            </div>
        </div>
    );
};
