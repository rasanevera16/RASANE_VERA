import { eq } from "drizzle-orm";

import { db } from "../drizzle";
import { orders } from "../drizzle/schema";

export const getOrders = async (limit?: number) => {
  try {
    const order = await db.query.orders.findMany({
      with: {
        orderItems: {
          with: {
            product: true,
          },
        },
      },
      limit: limit,
      orderBy: (order, { desc }) => [desc(order.date)],
    });

    return order;
  } catch {
    return null;
  }
};

export const getOrder = async (id: string) => {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, id),
    });

    if (!order) throw new Error("Order data not found");

    return order;
  } catch {
    return null;
  }
};
