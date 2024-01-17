import { db } from "~~/lib/database";

/**
 * Repository for managing tokens related to user authentication and security.
 */
export class TokenRepository {
  /**
   * Deletes a two-factor authentication token.
   *
   * @param id - The ID of the two-factor token to delete.
   * @returns A Promise that resolves to the deleted token or null if not found.
   */
  deleteTwoFactorToken = async (id: string) => {
    return await db.twoFactorToken.delete({
      where: {
        id,
      },
    });
  };

  /**
   * Deletes a password reset token.
   *
   * @param id - The ID of the password reset token to delete.
   * @returns A Promise that resolves to the deleted token or null if not found.
   */
  deletePasswordResetToken = async (id: string) => {
    return await db.passwordResetToken.delete({
      where: {
        id,
      },
    });
  };

  /**
   * Deletes a verification token.
   *
   * @param id - The ID of the verification token to delete.
   * @returns A Promise that resolves to the deleted token or null if not found.
   */
  deleteVerificationToken = async (id: string) => {
    return await db.verificationToken.delete({
      where: {
        id,
      },
    });
  };

  /**
   * Creates a new verification token.
   *
   * @param data - Object containing email, token, and expiration date.
   * @returns A Promise that resolves to the created verification token.
   */
  createVerificationToken = async ({
    email,
    token,
    expires,
  }: {
    email: string;
    token: string;
    expires: Date;
  }) => {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verificationToken;
  };

  /**
   * Creates a new password reset token.
   *
   * @param data - Object containing email, token, and expiration date.
   * @returns A Promise that resolves to the created password reset token.
   */
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

  /**
   * Creates a new two-factor authentication token.
   *
   * @param data - Object containing email, token, and expiration date.
   * @returns A Promise that resolves to the created two-factor token.
   */
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

  /**
   * Retrieves a verification token by email.
   *
   * @param email - The email associated with the verification token.
   * @returns A Promise that resolves to the verification token or null if not found.
   */
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

  /**
   * Retrieves a verification token by token value.
   *
   * @param token - The token value of the verification token.
   * @returns A Promise that resolves to the verification token or null if not found.
   */
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

  /**
   * Retrieves a two-factor authentication token by email.
   *
   * @param email - The email associated with the two-factor token.
   * @returns A Promise that resolves to the two-factor token or null if not found.
   */
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

  /**
   * Retrieves a two-factor authentication token by token value.
   *
   * @param token - The token value of the two-factor token.
   * @returns A Promise that resolves to the two-factor token or null if not found.
   */
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

  /**
   * Retrieves a password reset token by email.
   *
   * @param email - The email associated with the password reset token.
   * @returns A Promise that resolves to the password reset token or null if not found.
   */
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

  /**
   * Retrieves a password reset token by token value.
   *
   * @param token - The token value of the password reset token.
   * @returns A Promise that resolves to the password reset token or null if not found.
   */

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
