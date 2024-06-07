import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";

import { db } from "@/server/drizzle";
import { honoMiddleware } from "@/lib/hono-middleware";

const app = new Hono()
  .get(
    "/",
    honoMiddleware,
    zValidator(
      "query",
      z.object({
        isFeatured: z.boolean().optional(),
      }),
    ),
    async (c) => {
      const { isFeatured } = c.req.valid("query");

      const data = await db.query.products.findMany({
        with: {
          productImages: true,
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
        where: (products, { eq }) =>
          isFeatured ? eq(products.isFeatured, true) : undefined,
      });

      if (!data) {
        return c.json({ error: "No products found" }, 404);
      }

      return c.json({ data }, 200);
    },
  )
  .get(
    "/:slug",
    honoMiddleware,
    zValidator("param", z.object({ slug: z.string().optional() })),
    async (c) => {
      const { slug } = c.req.valid("param");

      if (!slug) {
        return c.json({ error: "Missing slug." }, 400);
      }

      const data = await db.query.products.findFirst({
        with: {
          productImages: true,
        },
        where: (products, { eq }) => eq(products.slug, slug),
      });

      if (!data) {
        return c.json({ error: "Product not found" }, 404);
      }

      return c.json({ data }, 200);
    },
  );

export default app;
