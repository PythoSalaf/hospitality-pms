import { User } from "@prisma/client";
import { z } from "zod";
import { DEFAULT_PAGE_SIZE } from "~~/constants";
import { db } from "~~/lib/database";
import { PaginationSchema, SearchShema } from "~~/schema";
import { TUserRole } from "~~/types";

/**
 * Repository class for managing user-related operations in the database.
 */
export class UserRepository {
  /**
   * Retrieves users.
   * @param param0 - Object containing the pagination, ....
   * @returns A promise that resolves with the retrieved users or null if not found.
   */
  async retrieveUsers({
    pagination = {},
    search,
    userRole,
  }: {
    pagination?: z.infer<typeof PaginationSchema>;
    search?: z.infer<typeof SearchShema>;
    userRole?: TUserRole;
  }) {
    const { currentPage: lastItemIndex, pageSize = DEFAULT_PAGE_SIZE } =
      pagination;

    try {
      const total = await db.user.count({
        where: {
          name: { contains: search },
          userRoles: { contains: userRole },
        },
      });
      const data = await db.user.findMany({
        take: pageSize,
        ...(lastItemIndex
          ? {
              skip: 1, // Skip the cursor
              cursor: {
                id: lastItemIndex,
              },
            }
          : {}),
        where: {
          name: { contains: search },
          userRoles: { contains: userRole },
        },
      });

      const lastItemInResults = data[pageSize - 1]; // Remember: zero-based index! :)
      const cursor = lastItemInResults?.id;
      return {
        data,
        metaData: {
          hasNextPage: data.length > 0,
          lastIndex: cursor,
          total,
        },
      };
    } catch {
      return null;
    }
  }
  /**
   * Creates a new user in the database.
   * @param param0 - Object containing user details (name, email, password, userRoles, currentRole).
   * @returns A promise that resolves with the created user.
   */
  createUser = async ({
    name,
    email,
    password,
    userRoles = ["CUSTOMER"],
    currentRole = "CUSTOMER",
  }: {
    name: string;
    email: string;
    password: string;
    userRoles?: TUserRole[];
    currentRole?: TUserRole;
  }): Promise<User> => {
    return await db.user.create({
      data: {
        name,
        email,
        password,
        userRoles: userRoles.join(","),
        currentRole,
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
   * Updates a user by their ID.
   * @param param0 - Object containing the user's ID, and data to be updated.
   * @returns A promise that resolves with the retrieved user or null if not found.
   */
  async updateUser({
    id,
    data,
  }: {
    id: string;
    data: { name: string; image?: string };
  }) {
    const { name, image } = data;
    try {
      const user = await db.user.update({
        where: { id },
        data: {
          name,
          image,
        },
      });
      return user;
    } catch (error) {
      throw error;
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
