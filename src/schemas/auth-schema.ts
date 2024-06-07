import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof LoginSchema>;
