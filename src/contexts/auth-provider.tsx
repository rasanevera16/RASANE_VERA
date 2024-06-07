import { SessionProvider, type SessionProviderProps } from "next-auth/react";

import { auth } from "@/server/auth";

export const AuthProvider = async ({ children }: SessionProviderProps) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
