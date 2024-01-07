import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { TokenRepository } from "~~/repositories/TokenRepository";

const {
  getTwoFactorTokenByEmail,
  deleteTwoFactorToken,
  createTwoFactorToken,
  getPasswordResetTokenByEmail,
  deletePasswordResetToken,
  createPasswordResetToken,
  getVerificationTokenByEmail,
  deleteVerificationToken,
  createVerificationToken,
} = new TokenRepository();

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await deleteTwoFactorToken(existingToken.id);
  }

  const twoFactorToken = await createTwoFactorToken({
    email,
    token,
    expires,
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetToken(existingToken.id);
  }

  const passwordResetToken = await createPasswordResetToken({
    email,
    token,
    expires,
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteVerificationToken(existingToken.id);
  }

  const verficationToken = await createVerificationToken({
    email,
    token,
    expires,
  });

  return verficationToken;
};
