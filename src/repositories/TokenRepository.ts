// create a user repository

import { db } from "~~/lib/database";

export class TokenRepository {
  // destroyers
  deleteTwoFactorToken = async (id: string) => {
    return await db.twoFactorToken.delete({
      where: {
        id,
      },
    });
  };
  deletePasswordResetToken = async (id: string) => {
    return await db.passwordResetToken.delete({
      where: {
        id,
      },
    });
  };
  deleteVerificationToken = async (id: string) => {
    return await db.verificationToken.delete({
      where: {
        id,
      },
    });
  };
  // setters
  createVerificationToken = async ({
    email,
    token,
    expires,
  }: {
    email: string;
    token: string;
    expires: Date;
  }) => {
    const passwordResetToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return passwordResetToken;
  };
  createPasswordResetToken = async ({
    email,
    token,
    expires,
  }: {
    email: string;
    token: string;
    expires: Date;
  }) => {
    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return passwordResetToken;
  };
  createTwoFactorToken = async ({
    email,
    token,
    expires,
  }: {
    email: string;
    token: string;
    expires: Date;
  }) => {
    const twoFactorToken = await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return twoFactorToken;
  };

  // getters
  getVerificationTokenByEmail = async (email: string) => {
    try {
      const verificationToken = await db.verificationToken.findFirst({
        where: { email },
      });

      return verificationToken;
    } catch {
      return null;
    }
  };

  getVerificationTokenByToken = async (token: string) => {
    try {
      const verificationToken = await db.verificationToken.findUnique({
        where: { token },
      });

      return verificationToken;
    } catch {
      return null;
    }
  };

  getTwoFactorTokenByEmail = async (email: string) => {
    try {
      const twoFactorToken = await db.twoFactorToken.findFirst({
        where: { email },
      });

      return twoFactorToken;
    } catch {
      return null;
    }
  };

  getTwoFactorTokenByToken = async (token: string) => {
    try {
      const twoFactorToken = await db.twoFactorToken.findUnique({
        where: { token },
      });

      return twoFactorToken;
    } catch {
      return null;
    }
  };

  getPasswordResetTokenByEmail = async (email: string) => {
    try {
      const passwordResetToken = await db.passwordResetToken.findFirst({
        where: { email },
      });

      return passwordResetToken;
    } catch {
      return null;
    }
  };

  getPasswordResetTokenByToken = async (token: string) => {
    try {
      const passwordResetToken = await db.passwordResetToken.findUnique({
        where: { token },
      });

      return passwordResetToken;
    } catch {
      return null;
    }
  };
}
