import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { appRoutes } from "~~/routes";
import ENV from "~~/config/enviroment";
import { authConfig } from "./config";
import { db } from "../database";
import { UserRepository } from "~~/repositories/UserRepository";

const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  secret: ENV.NEXTAUTH_SECRET,
  pages: {
    signIn: appRoutes.login,
    error: appRoutes.error,
    newUser: appRoutes.register,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const repo = new UserRepository();
      const existingUser = await repo.getUserById({ id: user.id });

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await repo.getUserTwoFactorConfirmation({
          userId: existingUser.id,
        });

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const repo = new UserRepository();

      const existingUser = await repo.getUserById({ id: token.sub });

      if (!existingUser) return token;

      const existingAccount = await repo.getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

export { GET, POST, auth, signIn, signOut, update };
