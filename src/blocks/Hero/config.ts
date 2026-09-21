import type { Block } from "payload";

import { heroBackgroundField } from "@/fields/heroBackground";
import { heroContentFields } from "@/fields/heroContent";

export const Hero: Block = {
    slug: "hero",
    interfaceName: "HeroBlock",
    labels: {
        singular: { cs: "Úvodní blok", en: "Hero" },
        plural: { cs: "Úvodní bloky", en: "Heroes" },
    },
    fields: [...heroContentFields(), heroBackgroundField()],
};
