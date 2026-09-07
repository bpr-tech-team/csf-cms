// Load TypeScript once via `node --import tsx`, bypassing Payload's tsImport loader.
// Await the CLI at module scope so an unfinished import cannot silently exit 0.
const cliURL = new URL("./bin/index.js", import.meta.resolve("payload"));
const { bin } = await import(cliURL.href);
await bin();
