import type { Block } from "payload";

import { processStepsFields } from "./fields";

export const ProcessSteps: Block = {
    slug: "processSteps",
    admin: {
        images: {
            thumbnail: {
                url: "/block-previews/process-steps.webp",
                alt: "Procesní kroky s animací pomocí scroll",
            },
        },
    },
    interfaceName: "ProcessStepsBlock",
    fields: processStepsFields(),
    labels: {
        plural: {
            cs: "Procesní kroky (scroll)",
            en: "Process steps (scroll)",
        },
        singular: {
            cs: "Procesní kroky (scroll)",
            en: "Process steps (scroll)",
        },
    },
};
