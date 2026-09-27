import type { AppLocale } from "./config";

export const frontendMessages: Record<
    AppLocale,
    {
        adminDashboard: string;
        author: string;
        datePublished: string;
        defaultDescription: string;
        defaultTitle: string;
        footerNavigation: string;
        form: {
            required: string;
            invalidEmail: string;
            submissionError: string;
            networkError: string;
            successTitle: string;
            errorTitle: string;
            submitting: string;
            submit: string;
        };
        heroPresentation: string;
        homeLinkLabel: string;
        mainNavigation: string;
        menuClose: string;
        menuOpen: string;
        noImage: string;
        page: string;
        pageRangeEmpty: string;
        pageRangeOf: string;
        pageRangeShowing: string;
        postsDescription: string;
        postsPlural: string;
        postsSingular: string;
        postsTitle: string;
        selectSlide: string;
        slide: string;
        untitledCategory: string;
    }
> = {
    cs: {
        adminDashboard: "Administrace",
        author: "Autor",
        datePublished: "Datum publikace",
        defaultDescription:
            "CSF, s.r.o. poskytuje komplexní IT služby, ICT infrastrukturu, cloudová řešení, hardware, AV techniku, tisková řešení a servis pro firmy a instituce v České republice.",
        defaultTitle: "CSF | Partner v oblasti IT",
        footerNavigation: "Navigace",
        form: {
            required: "Toto pole je povinné.",
            invalidEmail: "Zadejte platnou e-mailovou adresu.",
            submissionError:
                "Formulář se nepodařilo odeslat. Zkuste to prosím znovu.",
            networkError:
                "Při odesílání formuláře došlo k chybě. Zkuste to prosím znovu.",
            successTitle: "Formulář byl odeslán",
            errorTitle: "Odeslání se nezdařilo",
            submitting: "Odesílání…",
            submit: "Odeslat",
        },
        heroPresentation: "Úvodní prezentace",
        homeLinkLabel: "CSF — domů",
        mainNavigation: "Hlavní navigace",
        menuClose: "Zavřít menu",
        menuOpen: "Otevřít menu",
        noImage: "Bez obrázku",
        page: "strana",
        pageRangeEmpty: "Vyhledávání nevrátilo žádné výsledky.",
        pageRangeOf: "z",
        pageRangeShowing: "Zobrazeno",
        postsDescription:
            "Novinky a odborné články CSF o IT službách, ICT infrastruktuře, cloudových řešeních, hardwaru a servisu.",
        postsPlural: "článků",
        postsSingular: "článek",
        postsTitle: "Novinky",
        selectSlide: "Přepnout snímek",
        slide: "Snímek",
        untitledCategory: "Kategorie bez názvu",
    },
    en: {
        adminDashboard: "Dashboard",
        author: "Author",
        datePublished: "Date Published",
        defaultDescription:
            "CSF, s.r.o. provides comprehensive IT services, ICT infrastructure, cloud solutions, hardware, AV technology, print solutions, and service for companies and institutions in the Czech Republic.",
        defaultTitle: "CSF | IT Partner",
        footerNavigation: "Navigation",
        form: {
            required: "This field is required.",
            invalidEmail: "Enter a valid email address.",
            submissionError:
                "The form could not be submitted. Please try again.",
            networkError:
                "An error occurred while submitting the form. Please try again.",
            successTitle: "Form submitted",
            errorTitle: "Submission failed",
            submitting: "Sending…",
            submit: "Submit",
        },
        heroPresentation: "Introduction",
        homeLinkLabel: "CSF — home",
        mainNavigation: "Main navigation",
        menuClose: "Close menu",
        menuOpen: "Open menu",
        noImage: "No image",
        page: "page",
        pageRangeEmpty: "Search produced no results.",
        pageRangeOf: "of",
        pageRangeShowing: "Showing",
        postsDescription:
            "CSF news and expert articles about IT services, ICT infrastructure, cloud solutions, hardware, and service.",
        postsPlural: "Posts",
        postsSingular: "Post",
        postsTitle: "Posts",
        selectSlide: "Select slide",
        slide: "Slide",
        untitledCategory: "Untitled category",
    },
};
