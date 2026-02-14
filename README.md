Hastro представляет собой гибридный архитектурный шаблон, объединяющий Astro (UI-фреймворк с SSR) и Hono (минималистичный веб-фреймворк) на базе Bun runtime с интеграцией Prisma ORM. Это модульная архитектура для построения full-stack веб-приложений с четким разделением фронтенда и бэкенда.

```

Hastro/
├── src/
│   ├── modules/                    # Modules, programm components (Self-contained Features)
│   │   └── demo/                   # Example
│   │       ├── api/                # Backend API (Hono)
│   │       ├── core/               # Business Logic
│   │       └── pages/              # UI template demo (Auto-injected)
│   │           └── index.astro     # -> /demo
│   │           
│   ├── pages/                      # Global pages (Standalone)
│   │   ├── index.astro             # Main (/)
│   │   ├── about.astro             # About (/about)
│   │   └── 404.astro               # Error
│   │
│   ├── ui/                         # UI SYSTEM (Design System)
│   │   ├── components/             # Atoms (Button, Card, Input)
│   │   ├── layouts/                # Global layout (Base, App)
│   │   ├── styles/                 # Global CSS/Tailwind
│   │   └── icons/                  # SVG Icons
│   │
│   ├── app/                        # CORE (Server & Routing)
│   │   ├── server.ts               # Bun Entrypoint
│   │   ├── router.ts               # Global API Router
│   │   └── middlewares/            # App-level middlewares
│   │
│   ├── shared/                     # SHARED KERNEL (Non-UI Utilities)
│   │   ├── db.ts                   # Prisma Client
│   │   ├── config.ts               # Env vars
│   │   └── utils.ts                # Helpers
│   │
│   └── integrations/               # ASTRO PLUGINS
│       └── module-loader.ts        # Auto-loader
│
├── prisma/
├── astro.config.mjs
└── package.json

```

### Порядок обработки:

1. **API Routes** → `/api/*` обрабатывается Hono напрямую 
2. **Static Files** → Готовые HTML/CSS/JS из `dist/client/` (prerendered страницы)
3. **Astro SSR** → Динамический рендеринг страниц (fallback для всего остального)


```
HTTP Request
    ↓
┌─────────────────────────────────────────┐
│         Hono (HTTP Router)              │
│  - Глобальный HTTP-слой                 │
│  - Middleware (auth, logging, CORS)     │
└─────────────────────────────────────────┘
         ↓           ↓             ↓
    ┌────────┐  ┌──────────┐  ┌──────────┐
    │  API   │  │ Static   │  │ Astro    │
    │ Routes │  │  Files   │  │   SSR    │
    └────────┘  └──────────┘  └──────────┘
         ↓           ↓             ↓
   Hono Routers  serveStatic   Pages/Modules
```