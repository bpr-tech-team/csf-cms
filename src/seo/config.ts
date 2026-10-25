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
    foundingDate: "1998",
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
