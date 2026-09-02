import type { Form, Media } from "@/payload-types";
import type { RequiredDataFromCollectionSlug } from "payload";

type MediaRelationship = number | Media;

export type HomepageMedia = {
    heroIcons: [MediaRelationship, MediaRelationship, MediaRelationship];
    heroImages: [MediaRelationship, MediaRelationship, MediaRelationship];
    partnerLogos: MediaRelationship[];
    productIcons: [MediaRelationship, MediaRelationship, MediaRelationship];
    productImages: [
        MediaRelationship,
        MediaRelationship,
        MediaRelationship,
        MediaRelationship,
        MediaRelationship,
    ];
    serviceIcons: [
        MediaRelationship,
        MediaRelationship,
        MediaRelationship,
        MediaRelationship,
        MediaRelationship,
        MediaRelationship,
    ];
};

type HomeArgs = {
    contactForm: Form | number;
    media: HomepageMedia;
    metaImage?: MediaRelationship;
};

const partnerNames = [
    "HP",
    "AOC",
    "OKI",
    "Philips",
    "Dell",
    "Huawei",
    "Epson",
    "Kyocera",
    "HPE",
];

export const home = ({
    contactForm,
    media,
    metaImage,
}: HomeArgs): RequiredDataFromCollectionSlug<"pages"> => ({
    slug: "home",
    _status: "published",
    hero: {
        type: "homepage",
        slides: [
            {
                heading: "IT partner pro firmy,\nškoly a organizace",
                description:
                    "Pro komplexní ICT řešení, školy a organizace tentokrát nečekejte až do zítřka, spoléhejte se na stabilitu CSF.",
                links: [
                    {
                        link: {
                            type: "custom",
                            appearance: "default",
                            label: "Nezávazná konzultace",
                            url: "#kontakt",
                        },
                    },
                    {
                        link: {
                            type: "custom",
                            appearance: "outline",
                            label: "Naše služby",
                            url: "#sluzby",
                        },
                    },
                ],
            },
            {
                heading: "Technologie, na které\nse můžete spolehnout",
                description:
                    "Navrhujeme, dodáváme a spravujeme stabilní IT infrastrukturu podle reálných potřeb vaší organizace.",
                links: [
                    {
                        link: {
                            type: "custom",
                            appearance: "default",
                            label: "Probrat vaše IT",
                            url: "#kontakt",
                        },
                    },
                    {
                        link: {
                            type: "custom",
                            appearance: "outline",
                            label: "Prohlédnout řešení",
                            url: "#produkty",
                        },
                    },
                ],
            },
        ],
        autoplay: true,
        autoplayInterval: 7000,
        intro: {
            eyebrow: "ŘEŠÍME IT NA MÍRU",
            heading: "Spolehněte se na své IT.",
            highlightedText: "IT.",
            description:
                "Dodáváme komplexní ICT řešení, která podporují váš růst, zjednodušují každodenní práci a zvyšují bezpečnost celé organizace.",
        },
        quickLinks: [
            {
                image: media.heroImages[0],
                icon: media.heroIcons[0],
                title: "Pronájem",
                links: [
                    {
                        link: {
                            type: "custom",
                            label: "Pronájem",
                            url: "/pronajem",
                        },
                    },
                ],
            },
            {
                image: media.heroImages[1],
                icon: media.heroIcons[1],
                title: "Servis",
                links: [
                    {
                        link: {
                            type: "custom",
                            label: "Servis",
                            url: "/servis",
                        },
                    },
                ],
            },
            {
                image: media.heroImages[2],
                icon: media.heroIcons[2],
                title: "Blog",
                links: [
                    {
                        link: {
                            type: "custom",
                            label: "Blog",
                            url: "/posts",
                        },
                    },
                ],
            },
        ],
    },
    layout: [
        {
            blockType: "servicesGrid",
            eyebrow: "SLUŽBY",
            heading: "Komplexní ICT řešení\npod jednou střechou",
            highlightedText: "ICT řešení",
            items: [
                {
                    icon: media.serviceIcons[0],
                    title: "IT služby",
                    description:
                        "Klíčem k úspěchu v dnešním digitálním světě není pouze technologie, ale také schopnost propojit ji s firemní vizí.",
                    link: {
                        type: "custom",
                        label: "Detail služby",
                        url: "/sluzby/it-sluzby",
                    },
                },
                {
                    icon: media.serviceIcons[1],
                    title: "Cloudové služby",
                    description:
                        "Cloud computing se stává klíčovým prvkem moderního informačního prostředí, poskytujícím širokou škálu služeb a možností pro firmy i jednotlivce.",
                    link: {
                        type: "custom",
                        label: "Detail služby",
                        url: "/sluzby/cloudove-sluzby",
                    },
                },
                {
                    icon: media.serviceIcons[2],
                    title: "Tiskové služby MPS",
                    description:
                        "Modernizujte své firemní tiskové potřeby díky kompletní správě tisku.",
                    link: {
                        type: "custom",
                        label: "Detail služby",
                        url: "/sluzby/tiskove-sluzby",
                    },
                },
                {
                    icon: media.serviceIcons[3],
                    title: "Pronájem zařízení",
                    description:
                        "Pořiďte si výkonné firemní IT pronájmem a ušetřete si starosti i počáteční náklady.",
                    link: {
                        type: "custom",
                        label: "Detail služby",
                        url: "/pronajem",
                    },
                },
                {
                    icon: media.serviceIcons[4],
                    title: "Finanční služby",
                    description:
                        "Profesionální prezentační technika a řešení pro videokonference.",
                    link: {
                        type: "custom",
                        label: "Detail služby",
                        url: "/sluzby/financni-sluzby",
                    },
                },
                {
                    icon: media.serviceIcons[5],
                    title: "Servis HW",
                    description:
                        "Provádíme odborné opravy výpočetní techniky pro firmy i jednotlivce.",
                    link: {
                        type: "custom",
                        label: "Detail služby",
                        url: "/servis",
                    },
                },
            ],
        },
        {
            blockType: "metricsStrip",
            heading: "CSF v číslech",
            items: [
                { value: 1998, label: "ZALOŽENO" },
                { value: 1000, suffix: "+", label: "KLIENTŮ" },
                { value: 3, label: "POBOČKY" },
                { value: 1, suffix: " mld. Kč", label: "OBRAT" },
            ],
        },
        {
            blockType: "productsGrid",
            eyebrow: "PRODUKTY",
            heading: "Technologie pro každý\nden i velké vize",
            highlightedText: "velké vize",
            items: [
                {
                    icon: media.productIcons[0],
                    title: "Počítače",
                    description:
                        "Kvalitní HW řešení od předních světových výrobců pro vaše každodenní nasazení.",
                    link: { type: "custom", url: "/produkty/pocitace" },
                },
                {
                    image: media.productImages[0],
                    icon: media.productIcons[1],
                    title: "AV Technika",
                    description:
                        "Profesionální prezentační technika a řešení pro videokonference.",
                    link: { type: "custom", url: "/produkty/av-technika" },
                },
                {
                    image: media.productImages[1],
                    icon: media.productIcons[2],
                    title: "ICT infrastruktura",
                    description:
                        "Komplexní návrh a realizace serverových a síťových řešení.",
                    link: {
                        type: "custom",
                        url: "/produkty/ict-infrastruktura",
                    },
                },
                {
                    image: media.productImages[2],
                    icon: media.productIcons[0],
                    title: "Tisková řešení",
                    description:
                        "Efektivní správa tiskových služeb a dodávky hardwaru HP.",
                    link: { type: "custom", url: "/produkty/tiskova-reseni" },
                },
                {
                    image: media.productImages[3],
                    icon: media.productIcons[1],
                    title: "Školství",
                    description:
                        "Specializované nástroje pro moderní výuku a digitalizaci škol.",
                    link: { type: "custom", url: "/produkty/skolstvi" },
                },
                {
                    image: media.productImages[4],
                    icon: media.productIcons[2],
                    title: "Rezervační systém",
                    description:
                        "Intuitivní software pro správu zdrojů a zasedacích místností.",
                    link: {
                        type: "custom",
                        url: "/produkty/rezervacni-system",
                    },
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
            "Komplexní IT služby, cloud, infrastruktura, tisková řešení a servis pro firmy, školy a organizace.",
        image: metaImage,
        title: "CSF — IT partner pro firmy, školy a organizace",
    },
    title: "Domovská stránka",
});
