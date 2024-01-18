"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../_schemas";
import { UserRepository } from "~~/repositories/UserRepository";
import { sendVerificationEmail } from "~~/lib/mail";
import { generateVerificationToken } from "~~/lib/token";

// TODO: Refactor to allow for dependency injection, so as to conduct tests properly
export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<{ isError: boolean; error?: string; success?: string }> => {
  const validatedFields = RegisterSchema.safeParse(values);
  const { getUserByEmail, createUser } = new UserRepository();

  if (!validatedFields.success) {
    return { isError: true, error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10); //TODO: MAke the value 10 a resusable K, and not this magic number

  const existingUser = await getUserByEmail({ email });

  if (existingUser) {
    return { error: "Email already in use!", isError: true };
  }

  await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);
  // const emailToSendTo = verificationToken.email;
  const emailToSendTo = "thisbroisfresh@gmail.com"; //hardcoded for now
  await sendVerificationEmail(emailToSendTo, verificationToken.token);

  return { success: "Confirmation email sent!", isError: false };
};
