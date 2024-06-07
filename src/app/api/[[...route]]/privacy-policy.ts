import { Hono } from "hono";

import { db } from "@/server/drizzle";
import { honoMiddleware } from "@/lib/hono-middleware";

const app = new Hono().get("/", honoMiddleware, async (c) => {
  const data = await db.query.privacyPolicy.findMany();

  if (!data) {
    return c.json({ error: "No privacy policy found" }, 404);
  }

  return c.json({ data }, 200);
});

export default app;
