import * as z from "zod";

import { statusEnum } from "@/server/drizzle/schema";

export const OrderSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(1, "Customer name is required").trim(),
  date: z.coerce.date(),
  status: z.enum(statusEnum.enumValues),
});

export type OrderValues = z.infer<typeof OrderSchema>;
