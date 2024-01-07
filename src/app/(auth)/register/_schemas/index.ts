import * as z from "zod";
import { GENERAL_PASSWORD_REGEX } from "../../_constants";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  name: z.string().min(4, {
    message: "Name should be at least 4 characters",
  }),
  password: z
    .string()
    .refine((password) => GENERAL_PASSWORD_REGEX.test(password), {
      message:
        "Password should contain at least one digit and special character and a letter in uppercase, and at least 8 characters",
    }),
});
