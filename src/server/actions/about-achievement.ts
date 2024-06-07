"use server";

import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import {
  aboutAchievements,
  insertAboutAchievementSchema,
} from "../drizzle/schema";
import { currentUser } from "@/lib/auth";
import { db } from "../drizzle";

const action = createSafeActionClient();

export const createAboutAchievement = action(
  insertAboutAchievementSchema.and(z.object({ aboutId: z.string() })),
  async ({ aboutId, count, title, description }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    await db
      .insert(aboutAchievements)
      .values({ aboutId, count, title, description })
      .returning();

    revalidatePath("manage-about");

    return { success: "Achievement Created" };
  },
);

export const editAboutAchievement = action(
  insertAboutAchievementSchema.and(z.object({ id: z.string() })),
  async ({ id, count, title, description }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const editAchievement = await db
      .update(aboutAchievements)
      .set({
        count,
        title,
        description,
      })
      .where(eq(aboutAchievements.id, id))
      .returning();

    revalidatePath("manage-about");

    return {
      success: `Achievement ${editAchievement[0].title} has been updated`,
    };
  },
);

export const deleteAboutAchievement = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const data = await db
      .delete(aboutAchievements)
      .where(eq(aboutAchievements.id, id))
      .returning();

    revalidatePath("manage-about");

    return { success: `Achievement ${data[0].title} has been deleted` };
  },
);
