import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
import { redirects } from "./redirects";

const vercelHost =
    process.env.VERCEL_ENV === "preview"
        ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
        : process.env.VERCEL_PROJECT_PRODUCTION_URL;

const NEXT_PUBLIC_SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (vercelHost
        ? `https://${vercelHost}`
        : process.env.__NEXT_PRIVATE_ORIGIN || "http://localhost:3000");

const nextConfig: NextConfig = {
    env: { NEXT_PUBLIC_SERVER_URL },
    // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
    // See: https://github.com/vercel/next.js/issues/86431
    sassOptions: {
        loadPaths: ["./node_modules/@payloadcms/ui/dist/scss/"],
    },
    images: {
        localPatterns: [
            {
                pathname: "/api/media/file/**",
            },
            {
                pathname: "/media/block/**",
            },
        ],
        qualities: [75, 100],
        remotePatterns: [
            ...(process.env.BLOB_PUBLIC_URL
                ? [
                      {
                          protocol: "https" as const,
                          hostname: new URL(process.env.BLOB_PUBLIC_URL)
                              .hostname,
                          port: "",
                          pathname: "/**",
                      },
                  ]
                : []),
            ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map(
                (item) => {
                    const url = new URL(item);

                    return {
                        hostname: url.hostname,
                        protocol: url.protocol.replace(":", "") as
                            "http" | "https",
                    };
                },
            ),
        ],
    },
    webpack: (webpackConfig) => {
        webpackConfig.resolve.extensionAlias = {
            ".cjs": [".cts", ".cjs"],
            ".js": [".ts", ".tsx", ".js", ".jsx"],
            ".mjs": [".mts", ".mjs"],
        };

        return webpackConfig;
    },
    reactStrictMode: true,
    redirects,
    turbopack: {
        root: path.resolve(dirname),
    },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
