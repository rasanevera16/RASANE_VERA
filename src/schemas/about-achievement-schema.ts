import * as z from "zod";

export const AboutAchievementSchema = z.object({
  count: z.coerce.number(),
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
});

export type AboutAchievementValues = z.infer<typeof AboutAchievementSchema>;
