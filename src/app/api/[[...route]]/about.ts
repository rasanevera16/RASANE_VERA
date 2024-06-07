import { Hono } from "hono";

import { db } from "@/server/drizzle";
import { honoMiddleware } from "@/lib/hono-middleware";

const app = new Hono().get("/", honoMiddleware, async (c) => {
  const data = await db.query.about.findMany({
    with: {
      aboutAchievements: true,
    },
    orderBy: (about, { desc }) => [desc(about.createdAt)],
  });

  if (!data) {
    return c.json({ error: "No about found" }, 404);
  }

  return c.json({ data }, 200);
});

export default app;
