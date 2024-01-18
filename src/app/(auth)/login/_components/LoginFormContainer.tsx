"use client";

import { useLoginUser } from "../_hooks/useLoginUser";
import LoginForm from "./LoginForm";

export const LoginFormContainer = () => {
  const { onSubmit, isLoading } = useLoginUser();
  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
};
