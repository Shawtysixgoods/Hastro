// src/modules/demo/api/router.ts
import { Hono } from "hono";

export const demoRouter = new Hono();

// GET /api/demo/info
demoRouter.get("/info", (c) => {
  return c.json({ 
    module: "demo",
    version: "1.0.0",
    routes: ["/info", "/users", "/posts"]
  });
});

// GET /api/demo/users
demoRouter.get("/users", (c) => {
  return c.json({ 
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ]
  });
});

// POST /api/demo/posts
demoRouter.post("/posts", async (c) => {
  const body = await c.req.json();
  return c.json({ 
    success: true,
    data: body
  });
});

// Динамический параметр: GET /api/demo/users/:id
demoRouter.get("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ 
    user: { id, name: `User ${id}` }
  });
});
