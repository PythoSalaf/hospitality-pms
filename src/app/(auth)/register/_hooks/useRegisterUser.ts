"use client";

import * as z from "zod";
import { RegisterSchema } from "../_schemas";

import { useTransition } from "react";
import { register } from "../_actions/register";
import { toast } from "sonner";

export const useRegisterUser = () => {
  const [isLoading, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      console.log(values);
      register(values)
        .then((data) => {
          !data.isError &&
            toast.success(data.success, {
              description: "Please check your email to verify your account",
              cancel: {
                label: "Dismiss",
              },
            });
          data.isError &&
            toast.error(data.error, {
              description: "OOPS! Something went wrong",
              cancel: {
                label: "Dismiss",
              },
            });
        })
        .catch((error: unknown) => {
          toast.error("Error", {
            description: "OOPS! Something went wrong",
            cancel: {
              label: "Dismiss",
            },
            className: "bg-slate-400",
          });
        });
    });
  };
  return { onSubmit, isLoading };
};
