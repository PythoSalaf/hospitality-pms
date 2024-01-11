"use server";

import { signOut } from "~~/lib/authentication/auth";

export const logout = async () => {
  await signOut();
};
