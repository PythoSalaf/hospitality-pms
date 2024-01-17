import { Resend } from "resend";
import ENV from "~~/config/enviroment";
import { appRoutes } from "~~/routes";

const domain = ENV.NEXT_PUBLIC_APP_URL;

const MAIL_FROM_EMAIL = ENV.MAIL_FROM_EMAIL;

/**
 * Sends a verification email with a confirmation link.
 *
 * @param email - The recipient's email address.
 * @param token - The verification token.
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(ENV.RESEND_API_KEY);
  const confirmLink = `${domain}/${appRoutes.verify}?token=${token}&email=${email}`;

  await resend.emails.send({
    from: MAIL_FROM_EMAIL,
    to: email,
    subject: "Confirm your email!",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

/**
 * Sends an email with a reset password link.
 *
 * @param email - The recipient's email address.
 * @param token - The reset password token.
 */
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resend = new Resend(ENV.RESEND_API_KEY);
  const confirmLink = `${domain}/${appRoutes.resetPassword}?token=${token}`;

  await resend.emails.send({
    from: MAIL_FROM_EMAIL,
    to: email,
    subject: "Reset your password!",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  });
};

/**
 * Sends an email with a two-factor authentication code.
 *
 * @param email - The recipient's email address.
 * @param token - The two-factor authentication token.
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const resend = new Resend(ENV.RESEND_API_KEY);
  await resend.emails.send({
    from: MAIL_FROM_EMAIL,
    to: email,
    subject: "2 Factor Authentication Code!",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
