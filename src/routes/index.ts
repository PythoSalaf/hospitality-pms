import { apiV1ProtectedRoutes } from "./api";
import { authRoutes, errorRoutes, settingRoutes } from "./pages";

// main routes
export const publicRoutes = {
  home: "/",
  notFound: "*",
  ...authRoutes,
};
export const authProtectedRoutes = {
  newPassword: "/new-password",
  dashboard: "/dashboard",
  ...apiV1ProtectedRoutes,
  ...settingRoutes,
};
export const appRoutes = {
  ...publicRoutes,
  ...authProtectedRoutes,
  ...errorRoutes,
};
