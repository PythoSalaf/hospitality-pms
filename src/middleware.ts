import NextAuth from "next-auth";
import { authConfig } from "~~/lib/authentication/config";
import {
  apiAuthRoutePrefix,
  authProtectedRoutes,
  DEFAULT_LOGIN_REDIRECT_ROUTE,
  appRoutes,
  authRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isUserAuthenticated = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutePrefix);
  const isAuthRoute = Object.values(authRoutes).includes(nextUrl.pathname);
  const isAuthProtectedRoute = Object.values(authProtectedRoutes).includes(
    nextUrl.pathname
  );
  /**
   * This is used to determine wether an already authenticated user is accessing an auth route i.e routes like login, register, forgot password used for authentication
   */
  const isAuthenticatedUserAccessingAnAuthRoute =
    isUserAuthenticated && isAuthRoute;
  /**
   * This is used to determine wether an unauthenticated user is accessing an auth protected route i.e routes like dashboard, customers, ...
   */
  const isUnauthenticatedUserAccessingAnAuthProtectedRoute =
    !isUserAuthenticated && isAuthProtectedRoute;
  if (isApiAuthRoute) {
    //This ensures that if the route is an api auth route, the middleware will do nothing but simply move on
    return null;
  }
  if (isAuthenticatedUserAccessingAnAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ROUTE, nextUrl));
  }
  if (isUnauthenticatedUserAccessingAnAuthProtectedRoute) {
    return Response.redirect(new URL(appRoutes.login, nextUrl));
  }
  return null;
});

// The matcher in the config ensures that the middleware is invoked for all route paths that match the pattern
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
