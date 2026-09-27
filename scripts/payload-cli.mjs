// Load TypeScript once via `node --import tsx`, bypassing Payload's tsImport loader.
// Await the CLI at module scope so an unfinished import cannot silently exit 0.
// Deployments use `pnpm payload:migrate` with Node's production export condition
// to bypass Lexical's .node.mjs wrappers and their unsettled dynamic imports.
const cliURL = new URL("./bin/index.js", import.meta.resolve("payload"));
const { bin } = await import(cliURL.href);
await bin();
