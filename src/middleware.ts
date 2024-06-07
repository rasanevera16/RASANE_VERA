import NextAuth, { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/auth.routes";
import authConfig from "./server/auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some((routePattern) => {
      const regex = new RegExp(`^${routePattern.replace(/:[^/]+/g, "[^/]+")}$`);
      return regex.test(nextUrl.pathname);
    });
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname;

      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }

    return NextResponse.next();
  },
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
