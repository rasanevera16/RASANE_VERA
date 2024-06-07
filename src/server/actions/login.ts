"use server";

import { AuthError } from "next-auth";

import { LoginSchema, LoginValues } from "@/schemas/auth-schema";
import { getUserByEmail } from "../data/user";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/auth.routes";

export const login = async (
  values: LoginValues,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Account does not exist!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Log in successfully!" };
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Password is incorrect!" };
        }
        default: {
          return { error: "An error occurred while logging in!" };
        }
      }
    }

    throw error;
  }
};
