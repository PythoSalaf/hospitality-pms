import { apiV1ProtectedRoutes } from "./api";
import {
  authRoutes,
  customerRoutes,
  documentationRoutes,
  errorRoutes,
  settingRoutes,
} from "./pages";

export { authRoutes };

/**
 * Represents a collection of routes that do not require authentication.
 * They are accesible to everyone
 * */
export const publicRoutes = {
  home: "/",
  notFound: "*",
  ...documentationRoutes,
  ...authRoutes,
};

/**
 * Represents a collection of routes that require authentication.
 * @typedef {Object} AuthProtectedRoutes
 * @property {string} newPassword - The path for the "new password" route.
 * @property {string} dashboard - The path for the "dashboard" route.
 * @property {Object} apiV1ProtectedRoutes - The paths for other protected routes defined in the "apiV1ProtectedRoutes" object.
 * @property {Object} settingRoutes - The paths for other protected routes defined in the "settingRoutes" object.
 */

/**
 * A collection of routes that require authentication.
 * @type {AuthProtectedRoutes}
 */
export const authProtectedRoutes = {
  newPassword: "/new-password",
  dashboard: "/dashboard",
  ...customerRoutes,
  ...apiV1ProtectedRoutes,
  ...settingRoutes,
};

/**
 * Generates the application routes by combining the public routes, authenticated protected routes, and error routes.
 *
 * @returns {Object} - The application routes object.
 */
export const appRoutes = {
  ...publicRoutes,
  ...authProtectedRoutes,
  ...errorRoutes,
};

/**
 * Api auth route prefix
 * This prefix will be used for authentication purposes by next auth and as a result should always be public
 * @type {string}
 */
export const apiAuthRoutePrefix: string = "/api/auth";

/**
 * Default login redirect route
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_ROUTE: string = appRoutes.dashboard;
