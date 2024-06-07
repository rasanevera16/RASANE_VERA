"use server";

import { count, eq } from "drizzle-orm";

import { db } from "../drizzle";
import { orders, products } from "../drizzle/schema";

export interface GraphData {
  name: string;
  total: number;
}

export const getSummary = async () => {
  const succeededOrders = await db.query.orders.findMany({
    where: eq(orders.status, "succeeded"),
    with: {
      orderItems: {
        with: {
          product: true,
        },
      },
    },
  });

  const [productStock] = await db
    .select({ value: count() })
    .from(products)
    .where(eq(products.isArchived, false));

  const productSold = succeededOrders.reduce((acc, order) => {
    return acc + order.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }, 0);

  const totalRevenue = succeededOrders.reduce((acc, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price * item.quantity;
    }, 0);
    return acc + orderTotal;
  }, 0);

  const [totalOrders] = await db.select({ value: count() }).from(orders);

  const monthlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const order of succeededOrders) {
    const month = order.date.getMonth(); // 0 for Jan, 1 for Feb, ...
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price * item.quantity;
    }

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return {
    totalOrders,
    totalRevenue,
    productStock,
    productSold,
    graphData,
  };
};
