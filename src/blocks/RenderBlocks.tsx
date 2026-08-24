import React, { Fragment } from "react";

import type { Page } from "@/payload-types";
import type { AppLocale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";

export const RenderBlocks: React.FC<{
    blocks: Page["layout"][0][];
    locale?: AppLocale;
}> = (props) => {
    const { blocks, locale = defaultLocale } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block;

                    switch (blockType) {
                        case "archive":
                            return (
                                <div className="my-16" key={index}>
                                    <ArchiveBlock {...block} locale={locale} />
                                </div>
                            );

                        case "content":
                            return (
                                <div className="my-16" key={index}>
                                    <ContentBlock {...block} locale={locale} />
                                </div>
                            );

                        case "cta":
                            return (
                                <div className="my-16" key={index}>
                                    <CallToActionBlock
                                        {...block}
                                        locale={locale}
                                    />
                                </div>
                            );

                        case "formBlock":
                            if (
                                typeof block.form !== "object" ||
                                block.form === null
                            ) {
                                return null;
                            }

                            return (
                                <div className="my-16" key={index}>
                                    <FormBlock {...block} form={block.form} />
                                </div>
                            );

                        case "mediaBlock":
                            return (
                                <div className="my-16" key={index}>
                                    <MediaBlock {...block} />
                                </div>
                            );

                        default:
                            return null;
                    }
                })}
            </Fragment>
        );
    }

    return null;
};
