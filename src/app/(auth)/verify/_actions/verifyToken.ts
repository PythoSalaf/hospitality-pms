"use server";

import { db } from "~~/lib/database";
import { TokenRepository } from "~~/repositories/TokenRepository";
import { UserRepository } from "~~/repositories/UserRepository";

export const verifyToken = async (
  token: string,
  email: string
): Promise<{ isError: boolean; error?: string; success?: string }> => {
  const { getVerificationTokenByToken, deleteVerificationToken } =
    new TokenRepository();
  const { getUserByEmail } = new UserRepository();
  const existingUser = await getUserByEmail({ email });

  if (!existingUser) {
    return { error: "Email does not exist!", isError: true };
  }

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken && existingUser.emailVerified !== null) {
    return {
      success: "User is verified!",
      isError: false,
    };
  }
  if (existingToken) {
    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!", isError: true };
    }

    // TODO: Refactor this to use the repository pattern for consistency, not just here but in the next auth config as well, allowing for different database implementations, via dependency injection
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await deleteVerificationToken(existingToken.id);
  }

  return { success: "Email verified!", isError: false };
};
