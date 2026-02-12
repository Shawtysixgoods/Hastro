import { Hono } from "hono";
import { logger } from "hono/logger";

export const appRouter = new Hono();

appRouter.use("*", logger());

appRouter.get("/api/health", (c) => c.json({ status: "ok" }));

// Сюда будешь подключать роутеры модулей:
// import { demoRouter } from "../modules/demo/api/router";
// appRouter.route("/api/demo", demoRouter);
