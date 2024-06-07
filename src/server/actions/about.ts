"use server";

import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

import { about, insertAboutSchema } from "../drizzle/schema";
import { currentUser } from "@/lib/auth";
import { db } from "../drizzle";

const action = createSafeActionClient();

export const createAbout = action(
  insertAboutSchema,
  async ({ youtubeUrl, description, vision, mission }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    await db
      .insert(about)
      .values({
        youtubeUrl,
        description,
        vision,
        mission,
      })
      .returning();

    revalidatePath("manage-about");

    return { success: "About Created" };
  },
);

export const editAbout = action(
  insertAboutSchema.and(z.object({ id: z.string() })),
  async ({ id, youtubeUrl, description, vision, mission }) => {
    const user = await currentUser();

    if (!user) return { error: "Unauthorized!" };

    const [abt] = await db.select().from(about).where(eq(about.id, id));

    if (!abt) return { error: "About not found!" };

    await db
      .update(about)
      .set({
        youtubeUrl,
        description,
        vision,
        mission,
      })
      .where(eq(about.id, abt.id))
      .returning();

    revalidatePath("manage-about");

    return { success: "About Updated" };
  },
);
