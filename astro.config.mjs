import { defineConfig } from "astro/config";
import honoAstro from "hono-astro-adapter"; 
import { moduleLoader } from "./src/integrations/module-loader";

export default defineConfig({
  adapter: honoAstro(), 
  integrations: [moduleLoader()]
});
