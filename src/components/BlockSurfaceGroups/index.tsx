import { Fragment, type ReactNode } from "react";

import {
    getContentBlockPresentation,
    type ContentBlock,
} from "@/utilities/blockSpacing";
import { cn } from "@/utilities/ui";

type SurfaceGroup = {
    key: string | number;
    surface: ReturnType<typeof getContentBlockPresentation>["surface"];
    backgroundClassName: string;
    children: ReactNode[];
};

export const BlockSurfaceGroups = ({
    blocks,
    children,
}: {
    blocks: ContentBlock[];
    children: ReactNode[];
}) => {
    const groups: SurfaceGroup[] = [];

    blocks.forEach((block, index) => {
        const { surface, backgroundClassName } =
            getContentBlockPresentation(block);
        const previous = groups.at(-1);

        // One continuous background prevents the page canvas from showing
        // through fractional pixel edges between sections of the same surface.
        if (
            (surface === "light" || surface === "dark") &&
            previous?.surface === surface
        ) {
            previous.children.push(children[index]);
        } else {
            groups.push({
                key: block.id ?? index,
                surface,
                backgroundClassName,
                children: [children[index]],
            });
        }
    });

    return groups.map((group) =>
        // Hero sections extend behind the header; mixed catalogs own their
        // internal surfaces. Neither should gain a new layout container here.
        group.surface === "hero" || group.surface === "mixed" ? (
            <Fragment key={group.key}>{group.children}</Fragment>
        ) : (
            <div
                className={cn("flow-root", group.backgroundClassName)}
                data-block-surface={group.surface}
                key={group.key}
            >
                {group.children}
            </div>
        ),
    );
};
