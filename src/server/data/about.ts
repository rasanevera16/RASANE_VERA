"use server";

import { db } from "../drizzle";

export const getAbout = async () => {
  const about = await db.query.about.findMany({
    with: {
      aboutAchievements: true,
    },
  });

  return about;
};
