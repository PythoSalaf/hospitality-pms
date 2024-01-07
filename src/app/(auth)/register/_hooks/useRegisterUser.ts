"use client";

import * as z from "zod";
import { RegisterSchema } from "../_schemas";

import { useTransition } from "react";
import { register } from "../_actions/register";

export const useRegisterUser = () => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      console.log(values);
      register(values).then((data) => {
        console.log(data, "on register");
      });
    });
  };
  return { onSubmit, isPending };
};
