"use server";

import { createSafeActionClient } from "next-safe-action";
import { and, eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { currentUser } from "@/lib/auth";
import { db } from "../drizzle";
import {
  products,
  productImages,
  users,
  insertProductSchema,
} from "../drizzle/schema";
import { slugify } from "@/lib/utils";

const action = createSafeActionClient();

export const createProduct = action(
  insertProductSchema,
  async ({
    name,
    price,
    shortDescription,
    description,
    coverImageUrl,
    coverImageName,
    productImages: newImgs,
    isArchived,
    isFeatured,
  }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const [existingProduct] = await db
      .select()
      .from(products)
      .where(eq(products.name, name));

    if (existingProduct) return { error: "Product already exists!" };

    const newProduct = await db
      .insert(products)
      .values({
        name,
        userId: user.id as string,
        slug: slugify(name),
        price: Number(price),
        shortDescription,
        description,
        coverImageUrl,
        coverImageName,
        isFeatured,
        isArchived,
        createdAt: new Date(),
      })
      .returning();

    await db.insert(productImages).values(
      newImgs.map((img) => ({
        productId: newProduct[0].id,
        url: img.url,
        name: img.name,
      })),
    );

    revalidatePath("manage-products");

    return { success: `Product ${newProduct[0].name} has been created` };
  },
);

export const editProduct = action(
  insertProductSchema.and(z.object({ id: z.string() })),
  async ({
    id,
    name,
    slug,
    price,
    shortDescription,
    description,
    coverImageUrl,
    coverImageName,
    productImages: newImgs,
    isArchived,
    isFeatured,
  }) => {
    try {
      const user = await currentUser();

      if (!user) return { error: "Unauthorized!" };

      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, id!));

      if (!product) return { error: "Product not found!" };

      if (name && name !== product.name) {
        const [existingProduct] = await db
          .select()
          .from(products)
          .where(eq(products.name, name));

        if (existingProduct && existingProduct.id !== product.id) {
          return { error: "Product already exists!" };
        }
      }

      if (slug && !slug) {
        slug = product.slug || slugify(name);
      }

      const updateProduct = await db
        .update(products)
        .set({
          name,
          slug: name ? slugify(name) : product.slug,
          price: Number(price),
          shortDescription,
          description,
          coverImageUrl,
          coverImageName,
          isFeatured,
          isArchived,
          updatedAt: new Date(),
        })
        .where(eq(products.id, product.id))
        .returning();

      await db
        .delete(productImages)
        .where(eq(productImages.productId, updateProduct[0].id));

      await db.insert(productImages).values(
        newImgs.map((img) => ({
          productId: updateProduct[0].id,
          url: img.url,
          name: img.name,
        })),
      );

      revalidatePath("manage-products");

      return { success: `Product ${updateProduct[0].name} has been updated` };
    } catch (error) {
      return { error: "Failed to create product" };
    }
  },
);

export const deleteProduct = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const data = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    revalidatePath("manage-products");

    return { success: `Product ${data[0].name} has been deleted` };
  },
);

export const bulkDeleteProducts = action(
  z.object({ ids: z.array(z.string()) }),
  async ({ ids }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const productsToDelete = db.$with("products_to_delete").as(
      db
        .select({ id: products.id })
        .from(products)
        .innerJoin(users, eq(products.userId, users.id))
        .where(and(inArray(products.id, ids), eq(users.id, user.id!))),
    );

    const data = await db
      .with(productsToDelete)
      .delete(products)
      .where(inArray(products.id, sql`(select id from ${productsToDelete})`))
      .returning({
        id: products.id,
      });

    revalidatePath("manage-products");

    return { success: `Product(s) has been deleted`, payload: data };
  },
);
