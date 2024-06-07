import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";

import { db } from "@/server/drizzle";
import { insertReviewSchema, reviews } from "@/server/drizzle/schema";
import { honoMiddleware } from "@/lib/hono-middleware";

const app = new Hono()
  .get(
    "/",
    honoMiddleware,
    zValidator(
      "query",
      z.object({
        productId: z.string(),
        page: z.string().optional(),
        limit: z.string().optional(),
      }),
    ),
    async (c) => {
      const { productId, page, limit } = c.req.valid("query");

      if (!productId) {
        return c.json({ error: "Missing required fields." }, 400);
      }

      const data = await db.query.reviews.findMany({
        where: (reviews, { eq }) => eq(reviews.productId, productId!),
        offset: parseInt(page!) * parseInt(limit!),
        limit: parseInt(limit!),
        orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
      });

      if (!data) {
        return c.json({ error: "No reviews found" }, 404);
      }

      return c.json({ data }, 200);
    },
  )
  .post(
    "/",
    honoMiddleware,
    zValidator("json", insertReviewSchema),
    async (c) => {
      const values = c.req.valid("json");

      const [data] = await db
        .insert(reviews)
        .values({
          ...values,
          createdAt: new Date(),
        })
        .returning();

      return c.json({ data }, 200);
    },
  );

export default app;
