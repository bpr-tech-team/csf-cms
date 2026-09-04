import type { Form, Media } from "@/payload-types";
import type { RequiredDataFromCollectionSlug } from "payload";

import { partnerNames, type HomepageMedia } from "./home";

type MediaRelationship = number | Media;

type AboutArgs = {
    contactForm: Form | number;
    media: HomepageMedia;
    metaImage?: MediaRelationship | null;
};

export const about = ({
    contactForm,
    media,
    metaImage,
}: AboutArgs): RequiredDataFromCollectionSlug<"pages"> => ({
    slug: "o-nas",
    _status: "published",
    hero: {
        type: "about",
        richText: {
            root: {
                type: "root",
                children: [
                    {
                        type: "heading",
                        children: [
                            {
                                type: "text",
                                detail: 0,
                                format: 0,
                                mode: "normal",
                                style: "",
                                text: "Jsme CSF od roku 1998",
                                version: 1,
                            },
                        ],
                        direction: "ltr",
                        format: "",
                        indent: 0,
                        tag: "h1",
                        version: 1,
                    },
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                detail: 0,
                                format: 0,
                                mode: "normal",
                                style: "",
                                text: "Od roku 1998 pomáháme firmám s ICT infrastrukturou, kybernetickou bezpečností, AV technologiemi, tiskovými řešeními a financováním. Stavíme na zkušeném týmu, osobním přístupu a dlouhodobých partnerstvích.",
                                version: 1,
                            },
                        ],
                        direction: "ltr",
                        format: "",
                        indent: 0,
                        textFormat: 0,
                        version: 1,
                    },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                version: 1,
            },
        },
        links: [
            {
                link: {
                    type: "custom",
                    appearance: "default",
                    label: "Chci konzultaci IT řešení",
                    url: "#kontakt",
                },
            },
            {
                link: {
                    type: "custom",
                    appearance: "outline",
                    label: "Prohlédnout služby",
                    url: "/sluzby",
                },
            },
        ],
    },
    layout: [
        {
            blockType: "companyTimeline",
            heading:
                "Tvoříme tým více jak třiceti odborníků s bohatými zkušenostmi a dlouholetou praxí.",
            highlightedText: "více jak třiceti odborníků",
            items: [
                {
                    year: "1998",
                    title: "Založení firmy",
                    description:
                        "Miroslav Frýba zakládá CSc Hradec Králové spol. s.r.o. Hlavním zaměřením jsou dodávky IT infrastruktury a AV techniky.",
                },
                {
                    year: "2003",
                    title: "Pobočka Praha",
                    description:
                        "Otevíráme novou pobočku v Praze. Rozšiřujeme servisní spolupráci s TOSHIBA a dalšími partnery, např. HP, IBM, Epson, Microsoft.",
                },
                {
                    year: "2005",
                    title: "Změna názvu",
                    description:
                        "Měníme obchodní název společnosti na CSF, s.r.o. Pod novým názvem se dále snažíme rozšiřovat porfolio produktů a služeb.",
                },
                {
                    year: "2008",
                    title: "Obrat 35 mil. Kč",
                    description:
                        "Slavíme 10té výročí založení firmy. Podařilo se nám dosáhnout obratu 35 mil. Kč.",
                },
                {
                    year: "2018",
                    title: "20 let na trhu",
                    description:
                        "Jsme na trhu již 20 let. Díky našim službám máme stovky spokojených zákazníků.",
                },
                {
                    year: "2022",
                    title: "Posílení týmu",
                    description:
                        "Jsme v nové lokalitě v Praze. Výrazně posilujeme náš tým a překračujeme obrat 300 mil. Kč.",
                },
                {
                    year: "2023",
                    title: "Nové pobočky",
                    description:
                        "Otevíráme pobočky v Brně a Ostravě. Získáváme servisní autorizace HP, Lenovo a Dell.",
                },
                {
                    year: "2023",
                    title: "Rosteme",
                    description:
                        "Máme 50 zaměstnanců. Dosáhli jsme obratu 663 mil. Kč.",
                },
            ],
        },
        {
            blockType: "logoMarquee",
            eyebrow: "CERTIFIKOVANÍ PARTNEŘI A VÝROBCI",
            items: partnerNames.map((name, index) => ({
                logo: media.partnerLogos[index],
                name,
            })),
            duration: 40,
            pauseOnHover: true,
        },
        {
            blockType: "centeredCta",
            heading: "Hledáte spolehlivého IT partnera?",
            link: {
                type: "custom",
                appearance: "default",
                label: "Napište nám",
                url: "#kontakt",
            },
        },
        {
            blockType: "processSteps",
            eyebrow: "4 KROKY K WIN-WIN ŘEŠENÍ",
            heading: "Jak funguje spolupráce s CSF?",
            items: [
                { title: "Poptávka" },
                { title: "Návrh CSF" },
                {
                    title: "Společná konzultace",
                    description: "přijedeme k vám",
                },
                { title: "Implementace řešení" },
            ],
        },
        {
            blockType: "formBlock",
            appearance: "homepageDark",
            eyebrow: "FORMULÁŘ",
            form: contactForm,
            enableIntro: true,
            introContent: {
                root: {
                    type: "root",
                    children: [
                        {
                            type: "heading",
                            children: [
                                {
                                    type: "text",
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "Máte dotaz?",
                                    version: 1,
                                },
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            tag: "h2",
                            version: 1,
                        },
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "Náš tým odborníků je připraven navrhnout řešení na míru vašim potřebám.",
                                    version: 1,
                                },
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            textFormat: 0,
                            version: 1,
                        },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    version: 1,
                },
            },
        },
    ],
    meta: {
        description:
            "Od roku 1998 pomáhá CSF firmám s ICT infrastrukturou, kybernetickou bezpečností, AV technologiemi a tiskovými řešeními.",
        image: metaImage,
        title: "O nás",
    },
    title: "O nás",
});
