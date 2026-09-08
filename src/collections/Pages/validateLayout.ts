import type { BlocksFieldValidation } from "payload";

export const PAGE_HERO_BLOCK_TYPES = [
    "homepageHero",
    "aboutHero",
    "serviceHero",
    "computerHero",
] as const;

const pageHeroBlockTypes = new Set<string>(PAGE_HERO_BLOCK_TYPES);

export const validatePageLayout: BlocksFieldValidation = (value) => {
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

    return true;
};
