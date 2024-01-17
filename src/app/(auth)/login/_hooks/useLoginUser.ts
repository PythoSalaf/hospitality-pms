"use client";

import * as z from "zod";

import { useTransition } from "react";
import { toast } from "sonner";
import { LoginSchema } from "../_schemas";
import { login } from "../_actions/login";

export const useLoginUser = () => {
  const [isLoading, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          !data?.isError &&
            toast.success("Success", {
              description: data?.success ?? "Successful Login!",
              cancel: {
                label: "Dismiss",
              },
            });
          data?.isError &&
            toast.error("Error", {
              description: data.error,
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
