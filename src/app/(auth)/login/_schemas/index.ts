import * as z from "zod";
import { GENERAL_PASSWORD_REGEX } from "../../_constants";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please input a valid email",
  }),
  password: z
    .string()
    .refine((password) => GENERAL_PASSWORD_REGEX.test(password), {
      message:
        "Password should contain at least one digit and special character and a letter in uppercase, and at least 8 characters",
    }),
});
