export const seoConfig = {
    siteName: "CSF",
    legalName: "CSF, s.r.o.",
    defaultTitle: "CSF | Partner v oblasti IT",
    titleSuffix: " | CSF",
    defaultDescription:
        "CSF, s.r.o. poskytuje komplexní IT služby, ICT infrastrukturu, cloudová řešení, hardware, AV techniku, tisková řešení a servis pro firmy a instituce v České republice.",
    language: "cs-CZ",
    locale: "cs_CZ",
    defaultOgImagePath: "/csf-og.png",
    logoPath: "/csf-logo.png",
    email: "info@csf.cz",
    telephone: "+420 495 533 495",
    foundingDate: "1998",
    sameAs: ["https://cz.linkedin.com/company/csf-s-r-o"],
    address: {
        streetAddress: "Střelecká 672/14",
        postalCode: "500 02",
        addressLocality: "Hradec Králové",
        addressCountry: "CZ",
    },
    branches: [
        {
            name: "CSF Hradec Králové",
            streetAddress: "Střelecká 672",
            postalCode: "500 02",
            addressLocality: "Hradec Králové",
            telephone: "+420 495 533 495",
        },
        {
            name: "CSF Praha",
            streetAddress: "Za potokem 46/4",
            postalCode: "106 00",
            addressLocality: "Praha 10 - Záběhlice",
            telephone: "+420 739 802 122",
        },
        {
            name: "CSF Brno",
            streetAddress: "Zelinkova 1355/2",
            postalCode: "627 00",
            addressLocality: "Brno",
        },
        {
            name: "CSF Ostrava",
            streetAddress: "Varšavská 469/96",
            postalCode: "709 00",
            addressLocality: "Ostrava",
            telephone: "+420 602 767 462",
        },
        {
            name: "CSF Zlín",
            streetAddress: "Březnická 5602",
            postalCode: "760 01",
            addressLocality: "Zlín",
        },
    ],
} as const;

export const getSiteUrl = () => {
    const url =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        process.env.VERCEL_PROJECT_PRODUCTION_URL ||
        "https://www.csf.cz";

    const absoluteUrl = url.startsWith("http") ? url : `https://${url}`;

    return absoluteUrl.replace(/\/$/, "");
};

export const getCanonicalUrl = (path = "/") => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return `${getSiteUrl()}${normalizedPath === "/" ? "" : normalizedPath}`;
};

export const getAbsoluteUrl = (url = "/") => {
    if (url.startsWith("http")) {
        return url;
    }

    return getCanonicalUrl(url);
};
