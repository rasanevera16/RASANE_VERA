import * as z from "zod";

export const TermOfServiceSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required").trim(),
});

export type TermOfServiceValues = z.infer<typeof TermOfServiceSchema>;
