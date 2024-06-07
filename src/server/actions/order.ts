"use server";

import { createSafeActionClient } from "next-safe-action";
import * as z from "zod";
import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth";
import { db } from "../drizzle";
import {
  orders,
  insertOrderSchema,
  users,
  orderItems,
} from "../drizzle/schema";

const action = createSafeActionClient();

export const createOrder = action(
  insertOrderSchema,
  async ({
    customerName,
    totalOrder,
    totalPrice,
    date,
    status,
    orderItems: newOdrs,
  }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const newOrder = await db
      .insert(orders)
      .values({
        customerName,
        userId: user.id as string,
        totalOrder,
        totalPrice: Number(totalPrice),
        date,
        status,
      })
      .returning();

    await db.insert(orderItems).values(
      newOdrs.map((odr) => ({
        orderId: newOrder[0].id,
        productId: odr.productId,
        quantity: odr.quantity,
      })),
    );

    revalidatePath("manage-orders");

    return { success: "Order Data Created" };
  },
);

export const editOrder = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    await db
      .update(orders)
      .set({
        status: "succeeded",
        updatedAt: new Date(),
      })
      .where(eq(orders.id, id!));

    revalidatePath("manage-orders");

    return { success: "Order Data Updated" };
  },
);

export const deleteOder = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    await db.delete(orders).where(eq(orders.id, id));

    revalidatePath("manage-orders");

    return { success: "Order Data Deleted" };
  },
);

export const bulkDeleteOrders = action(
  z.object({ ids: z.array(z.string()) }),
  async ({ ids }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const ordersToDelete = db.$with("orders_to_delete").as(
      db
        .select({ id: orders.id })
        .from(orders)
        .innerJoin(users, eq(orders.userId, users.id))
        .where(and(inArray(orders.id, ids), eq(users.id, user.id!))),
    );

    await db
      .with(ordersToDelete)
      .delete(orders)
      .where(eq(orders.id, sql`(select id from ${ordersToDelete})`))
      .returning({
        id: orders.id,
      });

    revalidatePath("manage-orders");

    return { success: "Order(s) Data Deleted" };
  },
);
