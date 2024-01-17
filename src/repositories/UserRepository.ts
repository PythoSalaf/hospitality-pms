import { User } from "@prisma/client";
import { db } from "~~/lib/database";

/**
 * Repository class for managing user-related operations in the database.
 */
export class UserRepository {
  /**
   * Creates a new user in the database.
   * @param param0 - Object containing user details (name, email, password).
   * @returns A promise that resolves with the created user.
   */
  createUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    return await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  };

  /**
   * Retrieves a user by their ID.
   * @param param0 - Object containing the user's ID.
   * @returns A promise that resolves with the retrieved user or null if not found.
   */
  async getUserById({ id }: { id: string }) {
    try {
      const user = await db.user.findUnique({ where: { id } });
      return user;
    } catch {
      return null;
    }
  }

  /**
   * Retrieves a user by their email address.
   * @param param0 - Object containing the user's email address.
   * @returns A promise that resolves with the retrieved user or null if not found.
   */
  async getUserByEmail({ email }: { email: string }) {
    try {
      const user = await db.user.findUnique({ where: { email } });
      return user;
    } catch {
      return null;
    }
  }

  /**
   * Retrieves a user's two-factor authentication confirmation.
   * @param param0 - Object containing the user's ID.
   * @returns A promise that resolves with the retrieved two-factor confirmation or null if not found.
   */
  async getUserTwoFactorConfirmation({ userId }: { userId: string }) {
    try {
      const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
        where: { userId },
      });
      return twoFactorConfirmation;
    } catch {
      return null;
    }
  }

  /**
   * Retrieves an account by user ID.
   * @param userId - ID of the user associated with the account.
   * @returns A promise that resolves with the retrieved account or null if not found.
   */
  getAccountByUserId = async (userId: string) => {
    try {
      const account = await db.account.findFirst({
        where: { userId },
      });
      return account;
    } catch {
      return null;
    }
  };
}
