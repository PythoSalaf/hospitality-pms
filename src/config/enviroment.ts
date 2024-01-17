const DEFAULT_NODE_ENV = "development";
const DEFAULT_APP_NAME = "lendsqr";

/**
 * Object containing environment variables for the application.
 * If an environment variable is not provided, default values are used.
 */
const ENV = {
  // APP

  APP_NAME: process.env.APP_NAME ?? DEFAULT_APP_NAME,
  // env
  NODE_ENV: process.env.NODE_ENV ?? DEFAULT_NODE_ENV,
  // next
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "",
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "",

  // mail
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
  MAIL_FROM_EMAIL: process.env.MAIL_FROM_EMAIL ?? "",
};

export default ENV;
