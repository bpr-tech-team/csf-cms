import { spawnSync } from "node:child_process";

const env = {
    ...process.env,
    NODE_ENV: "production",
    NEXT_PUBLIC_SERVER_URL:
        process.env.CONTEXT === "production"
            ? process.env.URL
            : process.env.DEPLOY_PRIME_URL,
};

for (const key of [
    "NETLIFY_DB_URL",
    "PAYLOAD_SECRET",
    "NEXT_PUBLIC_SERVER_URL",
]) {
    if (!env[key])
        throw new Error(
            `Missing required Netlify environment variable: ${key}`,
        );
}

// Payload owns the schema and migration history. Run before static generation.
for (const args of [
    ["payload", "migrate"],
    ["run", "build"],
]) {
    const result = spawnSync("pnpm", args, { env, stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
}
