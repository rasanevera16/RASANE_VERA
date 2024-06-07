import * as z from "zod";

export const ReviewSchema = z.object({
  productId: z.string(),
  name: z.string().min(1, "Name is required").trim(),
  rating: z
    .number()
    .min(1, { message: "Please add at least one star" })
    .max(5, { message: "Please add no more than 5 stars" }),
  comment: z
    .string()
    .min(10, { message: "Please add at least 10 characters for this review" }),
});

export type ReviewValues = z.infer<typeof ReviewSchema>;
