import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { appRouter } from "./router";
import { config } from "../shared/config";

const app = new Hono();

// 1. API
app.route("/", appRouter);

// 2. Statics
app.use("/*", serveStatic({ root: "./dist/client/" }));

// 3. Astro SSR (через Adapter)
app.use("*", async (c, next) => {
  try {
    // @ts-ignore - файл появляется после билда
    const { handler } = await import("../../dist/server/entry.mjs");
    return handler(c, next);
  } catch (e) {
    if (config.isDev) return c.html("<h1>Dev Mode: Start 'bun run dev'</h1>");
    return c.text("Server not built. Run 'bun run build'", 500);
  }
});

console.log(`🚀 Server running on port ${config.port}`);

export default {
  fetch: app.fetch,
  port: config.port,
};
