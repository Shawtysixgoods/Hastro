import type { AstroIntegration } from "astro";
import * as fs from "node:fs/promises"; 

export function moduleLoader(): AstroIntegration {
  return {
    name: "Hastro-module-loader",
    hooks: {
      "astro:config:setup": async ({ injectRoute, config }) => {
        const modulesPath = new URL("./src/modules", config.root);
        try {
            const modules = await fs.readdir(modulesPath);
            for (const mod of modules) {
              if (mod.startsWith("_") || mod.startsWith(".")) continue;
              
              const pagesDir = new URL(`./src/modules/${mod}/pages`, config.root);
              try { await fs.access(pagesDir); } catch { continue; }

              const pages = await fs.readdir(pagesDir);
              for (const page of pages) {
                if (!page.endsWith(".astro")) continue;
                const route = page.replace(".astro", "");
                const pattern = route === "index" ? `/${mod}` : `/${mod}/${route}`;
                
                injectRoute({
                  pattern,
                  entrypoint: `src/modules/${mod}/pages/${page}`
                });
                console.log(`[AutoRoute] /${mod}/${route} -> ${mod}/pages/${page}`);
              }
            }
        } catch (e) { /* No modules found - ignore */ }
      },
    },
  };
}
