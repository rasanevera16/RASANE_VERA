"use server";

import { eq } from "drizzle-orm";

import { db } from "../drizzle";
import { products } from "../drizzle/schema";

export const getProducts = async () => {
  const products = await db.query.products.findMany({
    with: {
      productImages: true,
    },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });

  return products;
};

export const getProduct = async (id: string) => {
  try {
    const product = await db.query.products.findFirst({
      with: { productImages: true },
      where: eq(products.id, id),
    });

    if (!product) throw new Error("Product not found");

    return product;
  } catch {
    return null;
  }
};
