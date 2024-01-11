"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "../_schemas";
import { UserRepository } from "~~/repositories/UserRepository";
import { generateVerificationToken } from "~~/lib/token";
import { sendVerificationEmail } from "~~/lib/mail";
import { signIn } from "~~/lib/authentication/auth";
import { DEFAULT_LOGIN_REDIRECT_ROUTE } from "~~/routes";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
): Promise<{ isError: boolean; error?: string; success?: string } | void> => {
  try {
    const validatedFields = LoginSchema.safeParse(values);
    const { getUserByEmail } = new UserRepository();
    if (!validatedFields.success) {
      return { error: "Invalid fields!", isError: true };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail({ email });

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!", isError: true };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return { success: "Confirmation email sent!", isError: false };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT_ROUTE,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!", isError: true };
        default:
          return {
            error:
              "Server Error: Something went wrong with Authentication Provider !",
            isError: true,
          };
      }
    }
    throw error;
  }
};
