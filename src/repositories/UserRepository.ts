// create a user repository

import { User } from "@prisma/client";
import { db } from "~~/lib/database";

export class UserRepository {
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
  async getUserById({ id }: { id: string }) {
    try {
      const user = await db.user.findUnique({ where: { id } });

      return user;
    } catch {
      return null;
    }
  }
  async getUserByEmail({ email }: { email: string }) {
    try {
      const user = await db.user.findUnique({ where: { email } });

      return user;
    } catch {
      return null;
    }
  }
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
