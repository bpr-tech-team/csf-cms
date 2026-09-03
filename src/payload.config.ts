import { postgresAdapter } from "@payloadcms/db-postgres";
import sharp from "sharp";
import path from "path";
import { buildConfig, PayloadRequest } from "payload";
import { cs } from "payload/i18n/cs";
import { fileURLToPath } from "url";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Footer } from "./Footer/config";
import { Header } from "./Header/config";
import { plugins } from "./plugins";
import { defaultLexical } from "@/fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import { defaultLocale, localeLabels, locales } from "@/i18n/config";
import { createSMTPEmailAdapter } from "@/email/smtp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const email = createSMTPEmailAdapter();

const adminTranslations = {
    cs: {
        "plugin-redirects": {
            customUrl: "Vlastní URL",
            documentToRedirect: "Dokument, na který přesměrovat",
            fromUrl: "Zdrojová URL",
            internalLink: "Interní odkaz",
            redirectType: "Typ přesměrování",
            toUrlType: "Typ cílové URL",
        },
    },
};

export default buildConfig({
    admin: {
        components: {
            // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below.
            beforeLogin: ["@/components/BeforeLogin"],
            // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
            // Feel free to delete this at any time. Simply remove the line below.
            beforeDashboard: ["@/components/BeforeDashboard"],
        },
        importMap: {
            baseDir: path.resolve(dirname),
        },
        user: Users.slug,
        livePreview: {
            breakpoints: [
                {
                    label: "Mobil",
                    name: "mobile",
                    width: 375,
                    height: 667,
                },
                {
                    label: "Tablet",
                    name: "tablet",
                    width: 768,
                    height: 1024,
                },
                {
                    label: "Desktop",
                    name: "desktop",
                    width: 1440,
                    height: 900,
                },
            ],
        },
    },
    // This config helps us configure global or default features that the other editors can inherit
    editor: defaultLexical,
    i18n: {
        fallbackLanguage: defaultLocale,
        supportedLanguages: { cs },
        translations: adminTranslations,
    },
    localization: {
        defaultLocale,
        fallback: true,
        locales: locales.map((locale) => ({
            code: locale,
            label: localeLabels[locale],
        })),
    },
    db: postgresAdapter({
        migrationDir: path.resolve(dirname, "migrations"),
        pool: {
            connectionString: process.env.DATABASE_URL || "",
        },
        push: process.env.NODE_ENV !== "production",
    }),
    ...(email ? { email } : {}),
    collections: [Pages, Posts, Media, Categories, Users],
    cors: [getServerSideURL()].filter(Boolean),
    globals: [Header, Footer],
    plugins,
    secret: process.env.PAYLOAD_SECRET,
    sharp,
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    jobs: {
        access: {
            run: ({ req }: { req: PayloadRequest }): boolean => {
                // Allow logged in users to execute this endpoint (default)
                if (req.user) return true;

                const secret = process.env.CRON_SECRET;
                if (!secret) return false;

                // If there is no logged in user, then check
                // for the Vercel Cron secret to be present as an
                // Authorization header:
                const authHeader = req.headers.get("authorization");
                return authHeader === `Bearer ${secret}`;
            },
        },
        tasks: [],
    },
});
