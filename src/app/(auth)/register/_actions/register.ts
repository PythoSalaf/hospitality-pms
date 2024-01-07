"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../_schemas";
import { UserRepository } from "~~/repositories/UserRepository";
import { sendVerificationEmail } from "~~/lib/mail";
import { generateVerificationToken } from "~~/lib/token";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  const { getUserByEmail, createUser } = new UserRepository();

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10); //TODO: MAke the value 10 a resusable K, and not this magic number

  const existingUser = await getUserByEmail({ email });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
