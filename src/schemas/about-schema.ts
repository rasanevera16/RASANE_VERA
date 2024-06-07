import * as z from "zod";

export const AboutAchievementsSchema = z.array(
  z.object({
    count: z.number(),
    title: z.string(),
    description: z.string(),
  }),
);

export const AboutSchema = z.object({
  id: z.string().optional(),
  youtubeUrl: z
    .string()
    .url("Invalid youtube url")
    .min(1, "Youtube URL is required")
    .trim(),
  description: z.string().min(1, "Description is required").trim(),
  vision: z.string().min(1, "Vision is required").trim(),
  mission: z.string().min(1, "Mission is required").trim(),
});

export type AboutValues = z.infer<typeof AboutSchema>;
