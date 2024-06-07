"use server";

import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { currentUser } from "@/lib/auth";
import { db } from "../drizzle";
import { insertTermsOfServiceSchema, termsOfService } from "../drizzle/schema";

const action = createSafeActionClient();

export const editTermsOfService = action(
  insertTermsOfServiceSchema.and(z.object({ id: z.string() })),
  async ({ id, description }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const [terms] = await db
      .select()
      .from(termsOfService)
      .where(eq(termsOfService.id, id));

    if (!termsOfService) return { error: "Terms of service not found!" };

    await db
      .update(termsOfService)
      .set({ description })
      .where(eq(termsOfService.id, terms.id))
      .returning();

    revalidatePath("manage-terms-of-service");

    return { success: "Terms of service Updated" };
  },
);
