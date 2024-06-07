import * as z from "zod";

export const PrivacyPolicySchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "Description is required").trim(),
});

export type PrivacyPolicyValues = z.infer<typeof PrivacyPolicySchema>;
