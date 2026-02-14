import { Hono } from "hono";
import { logger } from "hono/logger";

import { demoRouter } from "../modules/demo/api/router";

export const appRouter = new Hono();

appRouter.use("*", logger());

appRouter.get("/api/health", (c) => c.json({ status: "ok" }));


appRouter.route("/demo", demoRouter);
