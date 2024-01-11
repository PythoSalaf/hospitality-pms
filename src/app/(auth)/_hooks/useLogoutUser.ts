"use client";

import * as z from "zod";

import { useTransition } from "react";
import { toast } from "sonner";
import { logout } from "../_actions/logout";

// TODO: Create A Base ApiResponse type
export const useLogoutUser = () => {
  const [isLoading, startTransition] = useTransition();

  const onLogout = () => {
    startTransition(() => {
      logout()
        .then((data) => {
          toast.success("Successful Logout!", {
            description: "Logout successful, we await your next visit!",
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
  return { onLogout, isLoading };
};
