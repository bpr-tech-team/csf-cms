import type { BlocksFieldValidation } from "payload";

export const PAGE_HERO_BLOCK_TYPES = ["hero", "homepageHero"] as const;

const pageHeroBlockTypes = new Set<string>(PAGE_HERO_BLOCK_TYPES);

export const validatePageLayout: BlocksFieldValidation = (value, { data }) => {
    if (!Array.isArray(value) || value.length === 0) {
        return "Přidejte alespoň jeden obsahový blok.";
    }

    const heroIndexes = value.flatMap((block, index) => {
        if (
            block &&
            typeof block === "object" &&
            "blockType" in block &&
            pageHeroBlockTypes.has(String(block.blockType))
        ) {
            return [index];
        }

        return [];
    });

    if (heroIndexes.length > 1) {
        return "Stránka může obsahovat pouze jeden úvodní blok.";
    }

    if (heroIndexes.length === 1 && heroIndexes[0] !== 0) {
        return "Úvodní blok musí být na prvním místě.";
    }

    const branchDetailsBlocks = value.filter(
        (block) =>
            block &&
            typeof block === "object" &&
            "blockType" in block &&
            block.blockType === "branchDetails",
    );
    if (
        branchDetailsBlocks.length &&
        (!data || !("pageType" in data) || data.pageType !== "branch")
    ) {
        return "Bloky pobočky lze použít pouze na stránce typu Pobočka.";
    }
    if (branchDetailsBlocks.length > 1) {
        return "Kontakty a mapu pobočky lze na stránku přidat pouze jednou.";
    }

    return true;
};
