import type { AppLocale } from "./config";

export const frontendMessages: Record<
    AppLocale,
    {
        author: string;
        datePublished: string;
        defaultDescription: string;
        defaultTitle: string;
        noImage: string;
        noResultsFound: string;
        pageRangeEmpty: string;
        pageRangeOf: string;
        pageRangeShowing: string;
        postsDescription: string;
        postsPlural: string;
        postsSingular: string;
        postsTitle: string;
        searchLabel: string;
        searchPlaceholder: string;
        searchSubmit: string;
        searchTitle: string;
        untitledCategory: string;
    }
> = {
    cs: {
        author: "Autor",
        datePublished: "Datum publikace",
        defaultDescription:
            "CSF, s.r.o. poskytuje komplexní IT služby, ICT infrastrukturu, cloudová řešení, hardware, AV techniku, tisková řešení a servis pro firmy a instituce v České republice.",
        defaultTitle: "CSF | Partner v oblasti IT",
        noImage: "Bez obrázku",
        noResultsFound: "Nebyly nalezeny žádné výsledky.",
        pageRangeEmpty: "Vyhledávání nevrátilo žádné výsledky.",
        pageRangeOf: "z",
        pageRangeShowing: "Zobrazeno",
        postsDescription:
            "Novinky a odborné články CSF o IT službách, ICT infrastruktuře, cloudových řešeních, hardwaru a servisu.",
        postsPlural: "článků",
        postsSingular: "článek",
        postsTitle: "Novinky",
        searchLabel: "Vyhledávání",
        searchPlaceholder: "Hledat",
        searchSubmit: "Odeslat",
        searchTitle: "Vyhledávání",
        untitledCategory: "Kategorie bez názvu",
    },
    en: {
        author: "Author",
        datePublished: "Date Published",
        defaultDescription:
            "CSF, s.r.o. provides comprehensive IT services, ICT infrastructure, cloud solutions, hardware, AV technology, print solutions, and service for companies and institutions in the Czech Republic.",
        defaultTitle: "CSF | IT Partner",
        noImage: "No image",
        noResultsFound: "No results found.",
        pageRangeEmpty: "Search produced no results.",
        pageRangeOf: "of",
        pageRangeShowing: "Showing",
        postsDescription:
            "CSF news and expert articles about IT services, ICT infrastructure, cloud solutions, hardware, and service.",
        postsPlural: "Posts",
        postsSingular: "Post",
        postsTitle: "Posts",
        searchLabel: "Search",
        searchPlaceholder: "Search",
        searchSubmit: "Submit",
        searchTitle: "Search",
        untitledCategory: "Untitled category",
    },
};
