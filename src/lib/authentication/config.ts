import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "~~/app/(auth)/login/_schemas";
import { UserRepository } from "~~/repositories/UserRepository";

/**
 * This is the auth configuration object with just the providers.
 * This is done for the sake of reusablity, as auth config with database cannot be used in middleware, because prisma does not support edge
 
 */
export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const repo = new UserRepository();
          const user = await repo.getUserByEmail({ email });
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
