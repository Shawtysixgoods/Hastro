import { defineConfig } from "astro/config";
import honoAstro from "hono-astro-adapter"; // 🔥 FIXED ADAPTER
import { moduleLoader } from "./src/integrations/module-loader";

export default defineConfig({
  adapter: honoAstro(), // Работает идеально с Hono
  integrations: [moduleLoader()]
});
