import type { Form } from "@/payload-types";

import { contactForm as contactFormData } from "./contact-form";
import { home, type HomepageMedia } from "./home";

const staticContactForm: Form = {
    ...contactFormData,
    createdAt: "2026-09-02T00:00:00.000Z",
    id: 0,
    updatedAt: "2026-09-02T00:00:00.000Z",
};

const fallbackMedia: HomepageMedia = {
    heroIcons: [0, 0, 0],
    heroImages: [0, 0, 0],
    partnerLogos: Array.from({ length: 9 }, () => 0),
    productIcons: [0, 0, 0],
    productImages: [0, 0, 0, 0, 0],
    serviceIcons: [0, 0, 0, 0, 0, 0],
};

// Used when the database has not been seeded yet. Numeric zero relationships
// intentionally select the checked-in Figma asset fallbacks in UI components.
export const homeStatic = home({
    contactForm: staticContactForm,
    media: fallbackMedia,
});
