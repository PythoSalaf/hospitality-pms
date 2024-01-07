import { Resend } from "resend";
import ENV from "~~/config/enviroment";
import { appRoutes } from "~~/routes";

const domain = ENV.NEXT_PUBLIC_APP_URL;
const MAIL_FROM_EMAIL = ENV.MAIL_FROM_EMAIL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(ENV.RESEND_API_KEY);
  const confirmLink = `${domain}/${appRoutes.verify}?token=${token}`;

  await resend.emails.send({
    from: MAIL_FROM_EMAIL,
    to: email,
    subject: "Confirm your email!",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resend = new Resend(ENV.RESEND_API_KEY);
  const confirmLink = `${domain}/${appRoutes.resetPassword}?token=${token}`;

  await resend.emails.send({
    from: MAIL_FROM_EMAIL,
    to: email,
    subject: "Reset your password!",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const resend = new Resend(ENV.RESEND_API_KEY);
  await resend.emails.send({
    from: MAIL_FROM_EMAIL,
    to: email,
    subject: "2 Factor Authentication Code!",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
