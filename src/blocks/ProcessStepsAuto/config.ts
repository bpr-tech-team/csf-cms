import type { Block } from "payload";

import { processStepsFields } from "@/blocks/ProcessSteps/fields";

export const ProcessStepsAuto: Block = {
    slug: "processStepsAuto",
    dbName: "process_auto",
    interfaceName: "ProcessStepsAutoBlock",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/process-steps.webp",
                alt: "Procesní kroky s automatickou animací",
            },
        },
    },
    fields: processStepsFields(),
    labels: {
        singular: {
            cs: "Procesní kroky (automaticky)",
            en: "Process steps (automatic)",
        },
        plural: {
            cs: "Procesní kroky (automaticky)",
            en: "Process steps (automatic)",
        },
    },
};
