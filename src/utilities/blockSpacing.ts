import type { Form, FormBlock, Page } from "@/payload-types";

export type SpacingSize = "auto" | "none" | "compact" | "normal" | "large";
export type SectionSpacing = {
    top?: SpacingSize | null;
    bottom?: SpacingSize | null;
};
export type BlockSpacingProps = { sectionSpacing?: SectionSpacing };

export type SectionSpacingPreset =
    | Exclude<SpacingSize, "auto">
    | "content"
    | "standard"
    | "grid"
    | "intro"
    | "short"
    | "marquee"
    | "cta"
    | "timelineTop"
    | "timelineBottom"
    | "clientServiceTop"
    | "introHero";
export type SectionSpacingDefaults = {
    top: SectionSpacingPreset;
    bottom: SectionSpacingPreset;
};

export type PageBlock = Page["layout"][number];
export type PageBlockType = PageBlock["blockType"];
type Surface = "light" | "dark" | "hero" | "mixed";

export type BlockPresentationOptions = {
    theme?: "light" | "dark" | null;
    appearance?: FormBlock["appearance"];
    isPageIntro?: boolean;
    part?: "navigation" | "products";
};

type Definition = {
    surface: Surface | "theme" | "form";
    spacing: SectionSpacingDefaults;
    // Joining is an explicit design choice, not inferred from background alone.
    flow: "content" | "standalone";
    isVisible?: (block: PageBlock, page?: Page) => boolean;
};

export const hasItems = <T>(items?: T[] | null): items is [T, ...T[]] =>
    Boolean(items?.length);

export const hasPopulatedForm = (form: FormBlock["form"]): form is Form =>
    Boolean(form && typeof form === "object");

export const hasBranchInfo = (
    page?: Page,
): page is Page & { branchInfo: NonNullable<Page["branchInfo"]> } =>
    page?.pageType === "branch" && Boolean(page.branchInfo);

const content: SectionSpacingDefaults = { top: "content", bottom: "content" };
const standard: SectionSpacingDefaults = {
    top: "standard",
    bottom: "standard",
};

// Exhaustive by blockType: a new page block must declare its surface, default
// spacing and whether it may join neighboring content before it can compile.
const definitions = {
    hero: { surface: "hero", spacing: standard, flow: "standalone" },
    homepageHero: {
        surface: "hero",
        spacing: standard,
        flow: "standalone",
        isVisible: (block) =>
            block.blockType === "homepageHero" && hasItems(block.slides),
    },
    branchesGrid: { surface: "light", spacing: standard, flow: "content" },
    branchDetails: {
        surface: "light",
        spacing: content,
        flow: "content",
        isVisible: (_, page) => hasBranchInfo(page),
    },
    formBlock: {
        surface: "form",
        spacing: { top: "short", bottom: "short" },
        flow: "standalone",
        isVisible: (block) =>
            block.blockType === "formBlock" && hasPopulatedForm(block.form),
    },
    clientService: {
        surface: "dark",
        spacing: { top: "clientServiceTop", bottom: "intro" },
        flow: "standalone",
    },
    servicesGrid: {
        surface: "light",
        spacing: { top: "grid", bottom: "grid" },
        flow: "content",
    },
    metricsStrip: {
        surface: "dark",
        spacing: { top: "short", bottom: "short" },
        flow: "standalone",
    },
    productsGrid: {
        surface: "light",
        spacing: { top: "grid", bottom: "grid" },
        flow: "content",
    },
    logoMarquee: {
        surface: "dark",
        spacing: { top: "marquee", bottom: "marquee" },
        flow: "standalone",
    },
    centeredCta: {
        surface: "dark",
        spacing: { top: "cta", bottom: "cta" },
        flow: "standalone",
    },
    processSteps: { surface: "light", spacing: standard, flow: "standalone" },
    companyTimeline: {
        surface: "light",
        spacing: { top: "timelineTop", bottom: "timelineBottom" },
        flow: "standalone",
    },
    serviceSectionIntro: {
        surface: "light",
        spacing: { top: "intro", bottom: "intro" },
        flow: "content",
    },
    splitContent: { surface: "theme", spacing: content, flow: "content" },
    flexibleContent: { surface: "theme", spacing: content, flow: "content" },
    computerAudience: {
        surface: "light",
        spacing: content,
        flow: "content",
        isVisible: (block) =>
            block.blockType === "computerAudience" && hasItems(block.items),
    },
    computerCatalog: {
        surface: "mixed",
        spacing: content,
        flow: "standalone",
        isVisible: (block) =>
            block.blockType === "computerCatalog" && hasItems(block.audiences),
    },
    computerProductCatalog: {
        surface: "mixed",
        spacing: content,
        flow: "standalone",
        isVisible: (block) =>
            block.blockType === "computerProductCatalog" &&
            hasItems(block.categories),
    },
    mediaFeatureGrid: { surface: "dark", spacing: content, flow: "content" },
    technologySpotlight: { surface: "dark", spacing: content, flow: "content" },
    editorialColumns: { surface: "dark", spacing: content, flow: "content" },
} satisfies Record<PageBlockType, Definition>;

const backgroundClasses: Record<Surface, string> = {
    light: "bg-paper-0",
    dark: "bg-ink-950",
    hero: "bg-ink-900",
    mixed: "",
};

export const getBlockPresentation = (
    blockType: PageBlockType,
    options: BlockPresentationOptions = {},
) => {
    const definition: Definition = definitions[blockType];
    let surface: Surface;
    let spacing = definition.spacing;

    if (definition.surface === "theme") {
        surface = options.theme === "dark" ? "dark" : "light";
    } else if (definition.surface === "form") {
        surface = options.appearance === "homepageDark" ? "dark" : "light";
        if (surface === "dark") spacing = standard;
    } else {
        surface = definition.surface;
    }
    if (surface === "hero" && options.isPageIntro) {
        spacing = { top: "introHero", bottom: "standard" };
    }
    if (blockType === "computerProductCatalog" && options.part) {
        surface = options.part === "navigation" ? "dark" : "light";
        spacing =
            options.part === "navigation"
                ? { top: "short", bottom: "short" }
                : content;
    }

    return {
        surface,
        spacing,
        flow: definition.flow,
        backgroundClassName: backgroundClasses[surface],
    };
};

export const isVisiblePageBlock = (block: PageBlock, page?: Page): boolean => {
    const definition: Definition = definitions[block.blockType];
    return definition.isVisible?.(block, page) ?? true;
};

const getPresentation = (block: PageBlock) =>
    getBlockPresentation(block.blockType, {
        theme: "theme" in block ? block.theme : undefined,
        appearance: "appearance" in block ? block.appearance : undefined,
    });

const shareAutomaticSpacing = (
    before?: PageBlock,
    after?: PageBlock,
): boolean => {
    if (!before || !after) return false;
    const beforePresentation = getPresentation(before);
    const afterPresentation = getPresentation(after);
    return Boolean(
        beforePresentation.flow === "content" &&
        afterPresentation.flow === "content" &&
        beforePresentation.surface === afterPresentation.surface &&
        (!before.spacingBottom || before.spacingBottom === "auto") &&
        (!after.spacingTop || after.spacingTop === "auto"),
    );
};

export const resolveBlockSpacing = (
    block: PageBlock,
    previous?: PageBlock,
    next?: PageBlock,
): SectionSpacing => ({
    top: shareAutomaticSpacing(previous, block)
        ? "none"
        : (block.spacingTop ?? "auto"),
    bottom: shareAutomaticSpacing(block, next)
        ? "compact"
        : (block.spacingBottom ?? "auto"),
});
