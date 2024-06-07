"use server";

import { eq } from "drizzle-orm";

import { db } from "../drizzle";
import { accounts } from "../drizzle/schema";

export const getAccountByUserId = async (userId: string) => {
  try {
    const user = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId));

    return user;
  } catch {
    return null;
  }
};
