import NextAuth from "next-auth";
import { db } from "../drizzle";
import { eq } from "drizzle-orm";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { users } from "../drizzle/schema";
import authConfig from "./auth.config";
import { getUserById } from "../data/user";
import { getAccountByUserId } from "../data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id!));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.image as string | null | undefined;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.image = existingUser.image;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
