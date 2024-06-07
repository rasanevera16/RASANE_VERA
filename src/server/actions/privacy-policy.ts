"use server";

import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { currentUser } from "@/lib/auth";
import { db } from "../drizzle";
import { insertPrivacyPolicySchema, privacyPolicy } from "../drizzle/schema";

const action = createSafeActionClient();

export const editPrivacyPolicy = action(
  insertPrivacyPolicySchema.and(z.object({ id: z.string() })),
  async ({ id, description }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const [privacy] = await db
      .select()
      .from(privacyPolicy)
      .where(eq(privacyPolicy.id, id));

    if (!privacyPolicy) return { error: "Privacy policy not found!" };

    await db
      .update(privacyPolicy)
      .set({ description })
      .where(eq(privacyPolicy.id, privacy.id))
      .returning();

    revalidatePath("manage-privacy-policy");

    return { success: "Privacy policy Updated" };
  },
);
